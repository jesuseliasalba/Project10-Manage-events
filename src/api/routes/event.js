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
const { isAuth } = require("../../middlewares/auth");

const eventRoutes = express.Router();

eventRoutes.post(
  "/create",
  [isAuth],
  upload.fields([{ name: "img" }]),
  registerEvent
);
eventRoutes.get("/near", getNearEvents);
eventRoutes.get("/:id", getEventsById);
eventRoutes.get("/", getEvents);
eventRoutes.put(
  "/:id",
  [isAuth],
  upload.fields([{ name: "img" }]),
  updateEvent
);
eventRoutes.put("/join/:id", [isAuth], eventJoinLeave);
eventRoutes.delete("/:id", [isAuth], deleteEvent);

module.exports = eventRoutes;
