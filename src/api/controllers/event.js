const Event = require("../models/event");
const { deleteFile } = require("../../utils/deleteFile");

const registerEvent = async (req, res, next) => {
  try {
    const eventUnique = await Event.findOne({ title: req.body.title });
    if (eventUnique !== null) {
      return res.status(400).json("This event title already exists");
    }

    const newEvent = new Event({
      title: req.body.title,
      img: req.body.img,
      date: req.body.date,
      ubication: req.body.ubication,
      description: req.body.description,
      assistants: req.body.assistants,
    });
    console.log(req.files);

    if (req.files.img) {
      newEvent.img = req.files.img[0].path;
    }
    console.log("hola");

    const eventCreated = await newEvent.save();
    res.status(201).json(eventCreated);
  } catch (error) {
    next(error);
  }
};

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate({
      path: "assistants",
      select: "username name surname img",
    });
    return res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

const getEventsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const events = await Event.findById(id).populate({
      path: "assistants",
      select: "username name surname img",
    });
    return res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

const getNearEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 }).populate({
      path: "assistants",
      select: "username name surname img",
    });
    return res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const eventUnique = await Event.findOne({ title: req.body.title });
    if (eventUnique !== null) {
      return res.status(400).json("Este nombre de evento ya existe.");
    }

    const eventModify = new Event(req.body);
    const event = await Event.findById(id);

    if (req.files.img) {
      deleteFile(event.img);
      eventModify.img = req.files.img[0].path;
    }

    eventModify._id = id;
    eventModify.assistants = event.assistants;

    const eventUpdated = await Event.findByIdAndUpdate(id, eventModify, {
      new: true,
    });

    return res.status(200).json(eventUpdated);
  } catch (error) {
    next(error);
  }
};

const eventJoinLeave = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    const userId = req.user._id;

    if (!event.assistants.includes(userId)) {
      event.assistants.push(userId);
      const eventModified = await Event.findByIdAndUpdate(id, event, {
        new: true,
      });
      res.status(201).json(eventModified);
    } else {
      event.assistants = event.assistants.filter(
        (id) => id.toString() !== userId.toString()
      );

      const eventModified = await Event.findByIdAndUpdate(id, event, {
        new: true,
      });
      res.status(201).json(eventModified);
    }
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const eventDeleted = await Event.findByIdAndDelete(id);
    deleteFile(eventDeleted.img);
    return res.status(200).json(eventDeleted);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerEvent,
  getEvents,
  getEventsById,
  getNearEvents,
  eventJoinLeave,
  updateEvent,
  deleteEvent,
};
