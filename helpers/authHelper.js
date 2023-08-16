import bcrypt from "bcrypt";

// Password Encryption Method
export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    return hashedPassword;
  } catch (error) {
    console.log("Error in Hashing Password > " + error);
  }
};

// Password Compare (Decryption) Method
export const comparePassword = async (password, hashedPassword) => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log("Error in Compare Password > " + error);
  }
};
