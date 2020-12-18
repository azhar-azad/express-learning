const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// get all
router.get('/', async (req, res) => {
  try {
    console.log('GET /subscribers/');
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one by id
router.get('/:id', getSubscriber, (req, res) => {
  console.log('GET /subscribers/id/');
  res.send(res.subscriber);
});

// create one
router.post('/', async (req, res) => {
  console.log('POST /subscribers/');
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  });
  
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update one by id
router.patch('/:id', getSubscriber, async (req, res) => {
  console.log('PATCH /subscribers/id');
  
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// delete one by id
router.delete('/:id', getSubscriber, async (req, res) => {
  console.log('DELETE /subscribers/id');
  
  try {
    await res.subscriber.remove();
    res.json({ message: 'Deleted Subscriber' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber === null) {
      return res.status(404).json({ message: 'Cannot find subscriber' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
  res.subscriber = subscriber;
  next();
}

module.exports = router;