const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    date: { type: Date, required: true, trim: true },
    ubication: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    assistants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "users", required: false },
    ],
    creator: { type: String },
  },
  {
    timestamps: true,
    collection: "events",
  }
);

const Event = mongoose.model("events", eventSchema, "events");

module.exports = Event;
