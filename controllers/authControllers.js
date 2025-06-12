const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { resSend } = require("../utils/resSend");
const { query } = require("../db/db.js");

const generateToken = (id, userId) => {
  console.log("hey i am id and userId...", id, userId);
  return jwt.sign({ id, userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Login User
// exports.loginHandler = async (req, res) => {
//   const { username, password } = req.body;
//   console.log("hey i am username and password..", username, password);

//   try {
//     let sql = `SELECT id,username, password_hash FROM auth WHERE username= ? and is_active = '1'`;

//     const result = await query({
//       query: sql,
//       values: [username],
//     });
//     if (result && result.length > 0) {
//       const pwIsCorrect = await bcrypt.compare(
//         password,
//         result[0]?.password_hash
//       );
//       if (pwIsCorrect) {
//         const token = generateToken(username, result[0]?.id);
//         req.loginUser = result[0]?.id;
//         resSend(res, true, 200, "Login Successful", result, token);
//       } else {
//         resSend(res, false, 200, "Password is invalid!", result, null);
//       }
//     } else {
//       resSend(res, false, 200, "USER ID is invalid!", result, null);
//     }
//   } catch (error) {
//     console.log(error);
//     resSend(res, false, 400, "Error", error, null);
//   }
// };

// exports.signupHandler = async (req, res) => {
//   const { username, email, password } = req.body;

//   console.log("hey i am usename and password...", username, password);
//   if (!username || !email || !password) {
//     return resSend(
//       res,
//       false,
//       400,
//       "please enter username,email and password..",
//       null,
//       null
//     );
//   }
//   try {
//     // Check if user already exists
//     let checkSql = `SELECT username FROM auth WHERE username = ?`;

//     const userExist = await query({
//       query: checkSql,
//       values: [username],
//     });
//     // console.log("hey i am checkSql...", userExist[0].username);
//     if (userExist.length > 0) {
//       return resSend(res, false, 400, "Username already exists!", null, null);
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     console.log("hey i am hashedPassword...", hashedPassword);

//     // Insert new user
//     let insertSql = `INSERT INTO auth (username,email, password_hash, is_active) VALUES (?, ?,?, '1')`;
//     const result = await query({
//       query: insertSql,
//       values: [username, email, hashedPassword],
//     });

//     console.log("i am result..", result);

//     if (result.affectedRows > 0) {
//       const fetchSql = `SELECT id FROM auth WHERE username = ?`;
//       const fetchResult = await query({
//         query: fetchSql,
//         values: [username],
//       });

//       const userId = fetchResult[0]?.id;
//       // Generate token after signup
//       const token = generateToken(username, userId);
//       resSend(
//         res,
//         true,
//         201,
//         "Signup Successful",
//         { id: userId, username, email },
//         token
//       );
//     } else {
//       resSend(res, false, 400, "Signup Failed", null, null);
//     }
//   } catch (error) {
//     console.log(error);
//     resSend(res, false, 500, "Server Error", error, null);
//   }
// };

exports.contactHandler = async (req, res) => {
  const { first_name, last_name, email,  message } = req.body;
  console.log("Received login request with:",  first_name, last_name, email, message);
  if (!first_name || !last_name || !email || !message) {
    return resSend(
      res,
      false,
      400,
      "please provide all required fields: first_name,last_name,email and message..",
      null,
      null
    );
  }
  try {
    let insertsql = `INSERT INTO contact_form (first_name, last_name,email, message) VALUES(?, ?, ?, ?)`;

    const result = await query({
      query: insertsql,
      values: [first_name, last_name, email, message],
    });
    console.log("contact request stored..", result);
    if (result.affectedRows > 0) {
      resSend(
        res,
        true,
        201,
        "Your message has been received. We will get back to you soon!",
        null,
        null
      );
    } else {
      resSend(
        res,
        false,
        400,
        "Failed to store message. Please try again.",
        null,
        null
      );
    }
  } catch (error) {
    console.error("Error handling contact request", error);
    resSend(
      res,
      false,
      500,
      "Server Error. Please try again later.",
      error,
      null
    );
  }
}


    
 

exports.signupHandler = async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log("recieved password and role...", password, role);
  if (!username || !email || !password || !role) {
    return resSend(
      res,
      false,
      400,
      "please enter username,email and password..",
      null,
      null
    );
  }
  try {
    let checkSql = `SELECT username FROM auth WHERE username = ?`;
    const userExist = await query({
      query: checkSql,
      values: [username],
    });
    if (userExist.length > 0) {
      return resSend(res, false, 400, "Username already exists!", null, null);
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password...", hashedPassword);
    //Insert new user
    let insertSql = `INSERT INTO contact_form (username, email, password_hash, role, is_active) VALUES(?,?,?,?,'1')`;
    const result = await query({
      query: insertSql,
      values: [username, email, hashedPassword, role],
    });
    console.log("result of insert...", result);
    if (result.affectedRows > 0) {
      const fetchSql = `SELECT id FROM auth WHERE username = ?`;
      const fetchResult = await query({
        query: fetchSql,
        values: [username],
      });
      const userId = fetchResult[0]?.id;
      // Generate token after signup
      const token = generateToken(username, userId);
      resSend(
        res,
        true,
        201,
        "Signup Successful",
        { id: userId, username, email },
        token
      );
    } else {
      resSend(res, false, 400, "Signup Failed", null, null);
    }
  } catch (error) {
    console.log("Error in signup", error);
    resSend(res, false, 500, "Server Error", error, null);
  }
};

exports.getAllContent = async (req, res) => {
  try {
    const sql = "SELECT * FROM content";
    const result = await query({ query: sql });
    resSend(res, true, 200, "Content fetched successfully", result, null);
  } catch {
    console.error("Error fetching content", error);
    resSend(res, false, 500, "Failed to fetch content", error, null);
  }
};

exports.getAllCat = async (req, res) => {
  try {
    const sql = "SELECT * FROM category";
    const result = await query({ query: sql });
    resSend(res, true, 200, "category fetched successfully", result, null);
  } catch {
    console.error("Error fetching category", error);
    resSend(res, false, 500, "Failed to fetch category", error, null);
  }
};

