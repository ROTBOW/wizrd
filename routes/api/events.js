const express = require('express');
const router = express.Router();

const Event = require('../../models/Event');
const validateEventInput = require('../../validation/events');

router.get('/', (req, res) => {
  Event.find()
    .sort({ date: -1 })
    .then((events) => res.json(events))
    .catch((err) => res.status(404).json({ noEventsFound: 'No events found' }));
});

router.get('/:id', (req, res) => {
  Event.findById(req.params.id)
    .then((event) => res.json(event))
    .catch((err) =>
      res.status(404).json({ noEventsFound: 'No events found with that ID' })
    );
});


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
        title: req.body.title,
        topic: req.body.topic,
        description: req.body.description,
        startTime: req.body.startTime,
        endTime: req.body.endTime
      });
  
      newEvent.save().then(event => res.json(event));
    }
  );

module.exports = router;
