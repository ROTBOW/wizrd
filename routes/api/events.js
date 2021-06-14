const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Event = require('../../models/Event');
const validateEventInput = require('../../validation/events');

// Get all events
router.get('/', (req, res) => {
  Event.find()
    .sort({ date: -1 })
    .then((events) => res.json(events))
    .catch((err) => res.status(404).json({ noEventsFound: 'No events found' }));
});

// Get a specific event
router.get('/:eventId', (req, res) => {
  Event.findById(req.params.eventId)
    .then((event) => res.json(event))
    .catch((err) => res.status(404).json({ noEventsFound: 'No events found with that ID' }));
});

// Create an event
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Need to add more input validation
    const { errors, isValid } = validateEventInput(req.title);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newEvent = new Event({
      hostId: req.user.id,
      // Need to add streamId (a UUID string)
      title: req.body.title,
      topic: req.body.topic,
      description: req.body.description,
      startTime: req.body.startTime,
      endTime: req.body.endTime
    });

    newEvent.save().then((event) => res.json(event));
  }
);

// Update an event
router.patch('/:eventId', (req, res) => {

  // TODO: UDPATE WITH PAYLOAD

  Event.findById(req.params.eventId)
    .then((event) => res.json(event))
    .catch((err) => res.status(404).json({ noEventsFound: 'No events found with that ID' }));
});

// Delete an event
router.delete('/:eventId', (req, res) => {
  Event.findById(req.params.eventId)
    .then((event) => res.json(event))
    .catch((err) => res.status(404).json({ noEventsFound: 'No events found with that ID' }));
});

module.exports = router;
