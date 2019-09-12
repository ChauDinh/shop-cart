const mongoose = require("mongoose");

const SessionSchema = mongoose.Schema({
  sessionId: String
});

const Session = mongoose.model("Session", SessionSchema, "sessions");

module.exports = Session;