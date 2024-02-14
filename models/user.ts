import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, is should contain 8-20 alphanumeric letters and be unique",
    ],
  },
  email: {
    type: String,
    unique: [true, "Email aslready exists"],
    required: true,
  },
  image: {
    type: String,
  },
});
const User = models.User || model("User", userSchema);

export default User;
