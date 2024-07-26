const express = require("express");
const {
  getNearEvents,
  registerEvent,
  getEvents,
  getEventsById,
  updateEvent,
  deleteEvent,
  eventJoinLeave,
} = require("../controllers/event");
const { upload } = require("../../middlewares/files");
const { isAdmin, isAuth } = require("../../middlewares/auth");

const eventRoutes = express.Router();

eventRoutes.post("/create", [isAuth], upload.single("img"), registerEvent);
eventRoutes.get("/near", getNearEvents);
eventRoutes.get("/:id", [isAuth], getEventsById);
eventRoutes.get("/", getEvents);
eventRoutes.put("/:id", [isAuth], upload.single("img"), updateEvent);
eventRoutes.put("/join/:id", [isAuth], eventJoinLeave);
eventRoutes.delete("/:id", [isAuth], deleteEvent);

module.exports = eventRoutes;
