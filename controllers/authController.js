import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../model/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validation
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "E-mail is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone Number is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }

    // Check User
    const existingUser = await userModel.findOne({ email });

    // Existing User
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register Please Login",
      });
    }

    // Hashing Password
    const hashedPassword = await hashPassword(password);

    // Saving User Detail in DB
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log("Error in Registeration > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};
