// // const mongoose = require("mongoose");

// // const userModel = new mongoose.Schema({
// //     name:{type:String,required:true},
// //     email:{type:String,required:true,unique:true},
// //     password:{type:String,required:true}
// // })

// // module.exports = mongoose.model('Users',userModel);

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Users", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        default: "",
    },

    googleId: {
        type: String,
        default: "",
    },

    picture: {
        type: String,
        default: "",
    },

}, { timestamps: true });

module.exports = mongoose.model("Users", userSchema);