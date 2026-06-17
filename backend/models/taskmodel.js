// const mongoose = require('mongoose')

// const taskSchema = new mongoose.Schema({
//     Id:{type:String,require:true},
//     Name:{type:String,require:true},
//     Date:{type:Date,default:Date.now},
//      priority: {
//       type: String,
//       enum: ["High", "Medium", "Low"],
//       default: "Medium",
//     },
//    },
//   {
//     timestamps: true,
//     });

// module.exports = mongoose.model('taskModel',taskSchema);


const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Task name is required"],
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);