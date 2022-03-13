const mongoose = require("mongoose");

// A model is a representation of a Collection
const MessageSchema = new mongoose.Schema({
  // Fields w/o validation
  // name: String,
  // completed: Boolean

  name: {
    type: String,
    // We can also assign a "true" value only
    // Remove extra spaces from the input string
    trim: true,
    maxlength: [20, "Name cannot be larger than 20 characters"],
  },
  email: {
    type: String,
    // We can also assign a "true" value only
    // Remove extra spaces from the input string
    trim: true,
    maxlength: [50, "Name cannot be larger than 50 characters"],
  },
  msg: {
    type: String,
    // Initial state of any task MUST be false
    // Even if the value is not passed, the property will be created as false
    maxlength: [200, "Name cannot be larger than 200 characters"],
   },
});

// Set a name for our Model
// NOTE: MongoDB converts the singular model name Task to tasks
module.exports = mongoose.model("Message", MessageSchema);