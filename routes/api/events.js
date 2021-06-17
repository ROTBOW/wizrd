const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Event = require('../../models/Event');
const validateEventInput = require('../../validation/events');
const { v4: uuidv4 } = require('uuid');

// Get all events
router.put('/:time', (req, res) => {
  if (req.params.time === 'live') {
    Event.find({startTime: {$lte: new Date()}}, {isOver: false})
      .then((events) => res.json(events))
      .catch((err) => res.status(404).json({ noEventsFound: 'No events found' }));
  } else if (req.params.time === 'future') {
     Event.find({startTime: {$gte: new Date()}})
      .then((events) => res.json(events))
      .catch((err) => res.status(404).json({ noEventsFound: 'No events found' }));
  } else {
    res.json({});
  }
  // else if (req.params.time === 'notOver') {
  //   Event.find({isOver: false})
  //     .then((events) => res.json(events))
  //     .catch((err) => res.status(404).json({ noEventsFound: 'No events found' }));
  // } else {
  //   Event.find()
  //     .sort({ date: -1 })
  //     .then((events) => res.json(events))
  //     .catch((err) => res.status(404).json({ noEventsFound: 'No events found' }));
  // }

});

// Get a specific event
router.get('/:eventId', (req, res) => {
  Event.findById(req.params.eventId)
    .then((event) => res.json(event))
    .catch((err) => res.status(404).json({ noEventsFound: 'No events found with that ID' }));
});

//Search for events
router.put('/', (req, res) => {
  
  if (req.body.topic) {
    const match = new RegExp(req.body.topic, 'i');
    Event.find({topic: match})
      .then((events) => {
        if (events.length === 0) {
          return json({ noEventsFound: 'No events found with that topic' });
        } else {
          return res.json(events);
        }
      })
      .catch((err) => res.status(404).json({ noEventsFound: 'No events found' }));
  } else if (req.body.title) {
    const match = new RegExp(req.body.title, 'i');
    Event.find({title: match})
      .then((events) => {
        if (events.length === 0) {
          return json({ noEventsFound: 'No events found' });
        } else {
          return res.json(events);
        }
      })
      .catch((err) => res.status(404).json({ noEventsFound: 'No events found' }));
  } else if (req.body.description) {
    const match = new RegExp(req.body.description, 'i');
    Event.find({description: match})
      .then((events) => {
        if (events.length === 0) {
          return json({ noEventsFound: 'No events found' });
        } else {
          return res.json(events);
        }
      })
      .catch((err) => res.status(404).json({ noEventsFound: 'No events found' }));
  } else if (req.body.host) {
    const match = new RegExp(req.body.host, 'i');
    Event.find({hostUsername: match})
      .then((events) => {
        if (events.length === 0) {
          return json({ noEventsFound: 'No events found' });
        } else {
          return res.json(events);
        }
      })
      .catch((err) => res.status(404).json({ noEventsFound: 'No events found' }));
  } else if (req.body.all) {
    const match = new RegExp(req.body.all, 'i');
    Event.find({$or: [{hostUsername: match}, {topic: match}, {title: match}, {description: match}]})
      .then((events) => {
        if (events.length === 0) {
          return json({ noEventsFound: 'No events found' });
        } else {
          return res.json(events);
        }
      })
      .catch((err) => res.status(404).json({ noEventsFound: 'No events found' }));
  }
})

// Create an event
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newEvent = new Event({
      hostId: req.user.id,
      hostUsername: req.user.username,
      title: req.body.title,
      topic: req.body.topic,
      description: req.body.description,
      startTime: req.body.startTime,
      isOver: false
    });

    newEvent.save().then((event) => res.json(event));
  }
);

// Update an event
router.patch('/:eventId', (req, res) => {
  const { errors, isValid } = validateEventInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Event.findById(req.params.eventId)
    .then((event) => {
      const { body: { title, topic, description } } = req;
      if (title) event.title = title;
      if (topic) event.topic = topic;
      if (description) event.description = description;
      if (req.body.startTime) event.startTime = req.body.startTime;
      if (req.body.isOver) event.isOver = req.body.isOver;
      event.save().then((event) => res.json(event));
    })
    .catch((err) => res.status(404).json({ noEventsFound: 'No events found with that ID' }));
});

// Delete an event
router.delete('/:eventId', (req, res) => {
  Event.findById(req.params.eventId)
    .then(() => res.stats(204).send())
    .catch((err) => res.status(404).json({ noEventsFound: 'No events found with that ID' }));
});

module.exports = router;
