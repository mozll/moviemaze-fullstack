// server.js

import dotenv from "dotenv";
import express from "express";
import mariadb from "mariadb";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt, { compare } from "bcrypt";
import crypto from "crypto";
import cookieParser from "cookie-parser";
import upload from "./upload.js";
import path from "path";
import multer from "multer";
import axios from "axios";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Enable CORS for all routes
//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

//app.use(bodyParser.urlencoded({ extended: true }));

const saltRounds = 10;

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  acquireTimeout: 30000,
});

async function getConnection() {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
}

function validateUsername(username) {
  // Check if the username is a string
  if (typeof username !== "string") {
    throw new Error("USERNAME_TYPE_ERROR");
  }
  username = username.trim();
  // Check length
  if (username.length < 4 || username.length > 15) {
    throw new Error("USERNAME_LENGTH_ERROR");
  }
  // Check for valid characters using a regular expression
  const validUsernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!validUsernameRegex.test(username)) {
    throw new Error("INVALID_USERNAME_FORMAT");
  }
  // If all checks pass, return true or the sanitized username
  return username;
}

function validateEmail(email) {
  // Check if the email is a string
  if (typeof email !== "string") {
    throw new Error("EMAIL_TYPE_ERROR");
  }
  email = email.trim();
  // Check length
  if (email.length < 6 || email.length > 100) {
    throw new Error("EMAIL_LENGTH_ERROR");
  }
  // Check for a valid email format using a regular expression
  const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validEmailRegex.test(email)) {
    throw new Error("INVALID_EMAIL_FORMAT");
  }
  // If all checks pass, return true or the sanitized email
  return email;
}

function validatePassword(password) {
  // Check if the password is a string and trim leading and trailing spaces
  if (!password || typeof password !== "string") {
    throw new Error("INVALID_PASSWORD_FORMAT");
  }
  password = password.trim();
  // Check length
  if (password.length < 8 || password.length > 64) {
    throw new Error("PASSWORD_LENGTH_ERROR");
  }
  // Check lowercase letters
  const hasLowercase = /[a-z]+/.test(password);
  if (!hasLowercase) {
    throw new Error("PASSWORD_MISSING_LOWERCASE");
  }
  // Check uppercase letters
  const hasUppercase = /[A-Z]+/.test(password);
  if (!hasUppercase) {
    throw new Error("PASSWORD_MISSING_UPPERCASE");
  }
  // Check numbers
  const hasNumber = /[0-9]+/.test(password);
  if (!hasNumber) {
    throw new Error("PASSWORD_MISSING_NUMBER");
  }
  // Check special characters
  const hasSpecial = /[~!@#$%^&*()_+\-=\[\]{}';:,.<>|\/\\?`]/.test(password);
  if (!hasSpecial) {
    throw new Error("PASSWORD_MISSING_SPECIAL_CHARACTER");
  }
  // If all checks pass, return the sanitized password
  return password;
}

function validateBirthday(birthday) {
  // Validate the type and format of the birthday string
  const validBirthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (
    !birthday ||
    typeof birthday !== "string" ||
    !validBirthdayRegex.test(birthday)
  ) {
    throw new Error("INVALID_BIRTHDAY_FORMAT");
  }

  // Convert the birthday string to a date object to further validate
  const birthdayDate = new Date(birthday);
  if (isNaN(birthdayDate)) {
    throw new Error("INVALID_BIRTHDAY_VALUE");
  }

  // Validate the date range (1900-2100)
  if (birthdayDate.getFullYear() < 1900 || birthdayDate.getFullYear() > 2100) {
    throw new Error("INVALID_BIRTHDAY_RANGE");
  }

  // If all checks pass, return the original birthday string
  return birthday;
}

async function encryptPassword(password) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    throw new Error("HASH_ERROR");
  }
}

async function comparePassword(password, passwordFromDB) {
  try {
    return await validateUser(password, passwordFromDB);
  } catch (err) {
    throw new Error("HASH_ERROR");
  }
}

async function validateUser(password, passwordFromDB) {
  try {
    const res = await bcrypt.compare(password, passwordFromDB);
    if (!res) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.error(err);
    throw new Error("PASSWORD_NO_MATCH");
  }
}

async function fetchPedingReviewsFromDatabase() {
  let connection;
  try {
    connection = await getConnection();
    const sqlPendingReviews =
      "SELECT reviews.review_id, reviews.review_movie_id, reviews.review_movie_type, reviews.review_title, reviews.review_text, reviews.review_created_at, reviews.review_rating, users.user_username FROM `reviews` JOIN users ON users.user_id = reviews.review_user_fk WHERE reviews.review_status = 0 ORDER BY reviews.review_created_at ASC";
    const rowsPendingReviews = await connection.query(sqlPendingReviews);
    return rowsPendingReviews;
  } catch (error) {
    throw new Error(error);
  } finally {
    if (connection) connection.release();
  }
}

async function fetchMovieDataFromTMDB(movieId) {
  const apiKey = process.env.VITE_API_KEY;
  const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  const response = await axios.get(tmdbUrl);
  return response.data;
}

// Serve uploaded files
app.use("/images", express.static(path.join(__dirname, "uploads")));

app.get("/api/reviews/pending", async (req, res) => {
  let connection;
  try {
    if (req.cookies.logged_in !== "true" || !req.cookies.user_id) {
      throw new Error("ACCESS_DENIED");
    }
    connection = await getConnection();
    const sqlUsers =
      "SELECT * FROM users WHERE user_id = ? AND user_admin >= 1";
    const rowsUsers = await connection.query(sqlUsers, [req.cookies.user_id]);
    if (rowsUsers.length == 1) {
      const pendingReviewsData = await fetchPedingReviewsFromDatabase();
      const movieIds = Array.from(
        new Set(pendingReviewsData.map((review) => review.review_movie_id))
      );

      const movieDataPromises = movieIds.map((movieId) =>
        fetchMovieDataFromTMDB(movieId)
      );

      const movieDataArray = await Promise.all(movieDataPromises);

      const movieDataMap = {};
      movieDataArray.forEach((movieData) => {
        movieDataMap[movieData.id] = movieData;
      });

      const mergedData = pendingReviewsData.map((review) => ({
        ...review,
        review: review,
        movie: movieDataMap[review.review_movie_id],
      }));

      res.json(mergedData);
    } else {
      throw new Error("ACCESS_DENIED");
    }
  } catch (err) {
    console.error("Err", err);
    let errMsg = "Error getting data from the database";
    let errCode = typeof err.code !== "undefined" ? err.code : err.message;
    switch (errCode) {
      case "ACCESS_DENIED":
        errMsg = "You don't have permission to visit this page.";
        break;
      default:
        console.error(errCode, err);
        errMsg = "Something went wrong. Try again later.";
        break;
    }
    res.status(500).send({ status: "error", message: errMsg, error: errCode });
  } finally {
    if (connection) connection.release();
  }
});

app.post("/api/reviews/decline/:id", async (req, res) => {
  let connection;
  try {
    if (req.cookies.logged_in !== "true" || !req.cookies.user_id) {
      throw new Error("ACCESS_DENIED");
    }
    connection = await getConnection();
    const sqlUsers =
      "SELECT * FROM users WHERE user_id = ? AND user_admin >= 1";
    const rowsUsers = await connection.query(sqlUsers, [req.cookies.user_id]);
    if (rowsUsers.length == 1) {
      const sql = "UPDATE reviews SET review_status = 2 WHERE review_id = ?";
      const result = await connection.query(sql, [req.params.id]);
      const totalRowsUpdated = result.affectedRows;

      if (totalRowsUpdated !== 1) {
        res.status(400).send({ status: "error", message: "Please, try again" });
      } else {
        res.send({
          status: "ok",
          message: "Review declined successfully",
        });
      }
    } else {
      throw new Error("ACCESS_DENIED");
    }
  } catch (err) {
    console.error("Err", err);
    let errMsg = "Error getting data from the database";
    let errCode = typeof err.code !== "undefined" ? err.code : err.message;
    switch (errCode) {
      case "ACCESS_DENIED":
        errMsg = "You don't have permission to visit this page.";
        break;
      default:
        console.error(errCode, err);
        errMsg = "Something went wrong. Try again later.";
        break;
    }
    res.status(500).send({ status: "error", message: errMsg, error: errCode });
  } finally {
    if (connection) connection.release();
  }
});

app.post("/api/reviews/approve/:id", async (req, res) => {
  let connection;
  try {
    if (req.cookies.logged_in !== "true" || !req.cookies.user_id) {
      throw new Error("ACCESS_DENIED");
    }
    connection = await getConnection();
    const sqlUsers =
      "SELECT * FROM users WHERE user_id = ? AND user_admin >= 1";
    const rowsUsers = await connection.query(sqlUsers, [req.cookies.user_id]);
    if (rowsUsers.length == 1) {
      const sql = "UPDATE reviews SET review_status = 1 WHERE review_id = ?";
      const result = await connection.query(sql, [req.params.id]);
      const totalRowsUpdated = result.affectedRows;

      if (totalRowsUpdated !== 1) {
        res.status(400).send({ status: "error", message: "Please, try again" });
      } else {
        res.send({
          status: "ok",
          message: "Review approved successfully",
        });
      }
    } else {
      throw new Error("ACCESS_DENIED");
    }
  } catch (err) {
    console.error("Err", err);
    let errMsg = "Error getting data from the database";
    let errCode = typeof err.code !== "undefined" ? err.code : err.message;
    switch (errCode) {
      case "ACCESS_DENIED":
        errMsg = "You don't have permission to visit this page.";
        break;
      default:
        console.error(errCode, err);
        errMsg = "Something went wrong. Try again later.";
        break;
    }
    res.status(500).send({ status: "error", message: errMsg, error: errCode });
  } finally {
    if (connection) connection.release();
  }
});

app.get("/api/reviews/movie/:id", async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    let userId = 0;
    if (req.cookies.logged_in === "true" && req.cookies.user_id) {
      userId = req.cookies.user_id;
    }
    const sql =
      "SELECT reviews.review_id, reviews.review_title, reviews.review_text, reviews.review_created_at, reviews.review_rating, reviews.review_public, reviews.review_status, users.user_username FROM reviews JOIN users ON users.user_id = reviews.review_user_fk WHERE review_movie_id = ? AND review_movie_type = ? AND ((reviews.review_status = 1 AND reviews.review_public = 1) OR reviews.review_user_fk = ?) ORDER BY review_created_at DESC;";
    const rows = await connection.query(sql, [req.params.id, "movie", userId]);
    res.json(rows);
  } catch (err) {
    let errMsg = "Error getting data from the database";
    let errCode = typeof err.code !== "undefined" ? err.code : err.message;
    switch (errCode) {
      default:
        console.error(errCode, err);
        errMsg = "Something went wrong. Try again later.";
        break;
    }
    res.status(500).send({ status: "error", message: errMsg });
  } finally {
    if (connection) connection.release();
  }
});

app.post("/api/reviews/add", async (req, res) => {
  let connection;
  try {
    if (req.cookies.logged_in !== "true") {
      throw new Error("NOT_LOGGED_IN");
    }

    connection = await getConnection();

    const userId = parseInt(req.cookies.user_id);

    const movieId = req.body.id;
    const movieIdRegex = /^[0-9]+$/;
    if (!movieIdRegex.test(req.body.id)) {
      throw new Error("Invalid movieId value");
    }

    const movieType = req.body.type;
    const movieTypeRegex = /^[a-zA-Z]+$/;
    if (!movieTypeRegex.test(req.body.type)) {
      throw new Error("Invalid movieType value");
    }

    const reviewHeadline = req.body.headline;
    const reviewHeadlineRegex = /^[a-zA-Z0-9,.!?() ]+$/;
    if (!reviewHeadlineRegex.test(req.body.headline)) {
      throw new Error("Invalid reviewHeadline value");
    }

    const reviewText = req.body.review;
    const reviewTextRegex = /^([a-zA-Z0-9,.!?() ]+)$/;
    if (!reviewTextRegex.test(req.body.review)) {
      throw new Error("Invalid reviewText value");
    }

    const rating = parseInt(req.body.rating);
    if (!rating) {
      throw new Error("Invalid rating value");
    } else if (rating < 0 || rating > 10) {
      throw new Error("Rating must be between 0 and 10");
    }

    const sql =
      "INSERT INTO reviews (review_user_fk, review_movie_id, review_movie_type, review_title, review_text, review_rating) VALUES(?, ?, ?, ?, ?, ?)";

    const result = await connection.query(sql, [
      userId,
      movieId,
      movieType,
      reviewHeadline,
      reviewText,
      rating,
    ]);
    const totalRowsInserted = result.affectedRows;

    if (totalRowsInserted !== 1) {
      res.status(400).send({ status: "error", message: "Please, try again" });
    } else {
      res.send({ status: "ok", message: "Review inserted successfully" });
    }
  } catch (err) {
    let errMsg = "Error inserting into the database";
    let errCode = typeof err.code !== "undefined" ? err.code : err.message;
    switch (errCode) {
      case "NOT_LOGGED_IN":
        errMsg = "You need to login first";
        break;
      default:
        console.error(errCode);
        errMsg = "Something went wrong. Try again later.";
        break;
    }
    res.status(500).send({ status: "error", message: errMsg });
  } finally {
    if (connection) connection.release();
  }
});

app.post("/api/users/add", async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    // Validate username - Min. 4 and max. 15 length, regex english letters, numbers 0 to 9 and underscore (remember to strip trailing spaces etc.)
    let username = validateUsername(req.body.username);
    // Validate email - Min. 6 and max. 100 length, regex email (remember to strip trailing spaces etc.)
    let email = validateEmail(req.body.email);
    // Validate password2 - Check if equal to password (remember to strip trailing spaces etc.)
    if (req.body.password.trim() !== req.body.password2.trim()) {
      throw new Error("PASSWORD_NO_MATCH");
    }
    // Validate password - Min. 6 and max. 50 length (remember to strip trailing spaces etc.)
    let password = await encryptPassword(validatePassword(req.body.password));

    let name = req.body.name;
    let profilePicture =
      "https://robohash.org/" +
      crypto.createHash("md5").update(username).digest("hex");
    // Validate birthday - Regex YYYY-MM-DD format
    let birthday = Date.parse(validateBirthday(req.body.birthday)) / 1000;

    const sql =
      "INSERT INTO users (user_username, user_email, user_password, user_full_name, user_profile_picture, user_birthday) VALUES(?, ?, ?, ?, ?, FROM_UNIXTIME(?))";
    const result = await connection.query(sql, [
      username,
      email,
      password,
      name,
      profilePicture,
      birthday,
    ]);
    const totalRowsInserted = result.affectedRows;

    if (totalRowsInserted !== 1) {
      res.status(400).send({ status: "error", message: "Please, try again" });
    } else {
      res.send({ status: "ok", message: "User inserted successfully" });
    }
  } catch (err) {
    let errMsg = "Error inserting into the database";
    let errCode = typeof err.code !== "undefined" ? err.code : err.message;
    switch (errCode) {
      case "ER_DUP_ENTRY":
        if (err.sqlMessage.includes("key 'user_username'")) {
          errMsg = "Username already in use";
        } else if (err.sqlMessage.includes("key 'user_email'")) {
          errMsg = "Email already in use";
        }
        break;
      case "INVALID_BIRTHDAY_FORMAT":
        errMsg = "Invalid birthday format. Use YYYY-MM-DD";
        break;
      case "PASSWORD_NO_MATCH":
        errMsg = "Passwords do not match";
        break;
      case "PASSWORD_LENGTH_ERROR":
        errMsg = "Password must be between 6 and 50 characters long";
        break;
      case "INVALID_PASSWORD_FORMAT":
        errMsg = "Password must be a string";
        break;
      case "INVALID_EMAIL_FORMAT":
        errMsg = "Invalid email format";
        break;
      case "EMAIL_LENGTH_ERROR":
        errMsg = "Email must be between 6 and 100 characters long";
        break;
      case "EMAIL_TYPE_ERROR":
        errMsg = "Email must be a string";
        break;
      case "INVALID_USERNAME_FORMAT":
        errMsg =
          "Username can only contain English letters, numbers from 0 to 9, and underscore";
        break;
      case "USERNAME_LENGTH_ERROR":
        errMsg = "Username must be between 4 and 15 characters long";
        break;
      case "USERNAME_TYPE_ERROR":
        errMsg = "Username must be a string";
        break;
      default:
        console.error(errCode);
        errMsg = "Something went wrong. Try again later.";
        break;
    }
    res.status(500).send({ status: "error", message: errMsg });
  } finally {
    if (connection) connection.release();
  }
});

// Custom middleware to handle multer errors
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

app.post("/api/profile-picture/reset/:id", async (req, res) => {
  try {
    // Check if :id parameter matches the user_id in cookies
    if (req.params.id !== req.cookies.user_id) {
      return res.status(403).json({ error: "Access forbidden. Invalid user." });
    }

    let picturePath =
      "https://robohash.org/" +
      crypto.createHash("md5").update(req.cookies.user_username).digest("hex");

    let connection;
    connection = await getConnection();
    const sql = "UPDATE users SET user_profile_picture = ? WHERE user_id = ?";
    const result = await connection.query(sql, [picturePath, req.params.id]);
    const totalRowsUpdated = result.affectedRows;

    if (totalRowsUpdated !== 1) {
      res.status(400).send({ status: "error", message: "Please, try again" });
    } else {
      res.send({
        status: "ok",
        message: "Profile picture reset successfully",
        resetProfilePicturePath: picturePath,
      });
    }
  } catch (error) {
    console.error("Error resetting profile picture:", error);

    if (error.status === 400) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    } else {
      // For other types of errors, return a generic error message
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
});
app.post(
  "/api/profile-picture/:id",
  upload.single("file"),
  handleMulterErrors, // Apply the custom error handling middleware
  async (req, res, next) => {
    try {
      // Check if :id parameter matches the user_id in cookies
      if (req.params.id !== req.cookies.user_id) {
        return res
          .status(403)
          .json({ error: "Access forbidden. Invalid user." });
      }

      // If file is empty
      if (req.file && req.file.size === 0) {
        return res.status(400).json({ error: "File is empty." });
      }

      // If file is exceeding the size limit
      if (req.file && req.file.truncated) {
        return res
          .status(400)
          .json({ error: "File size exceeds the allowed limit (500 KB)." });
      }

      let picturePath = "/images/" + req.file.filename;

      let connection;
      connection = await getConnection();
      const sql = "UPDATE users SET user_profile_picture = ? WHERE user_id = ?";
      const result = await connection.query(sql, [picturePath, req.params.id]);
      const totalRowsUpdated = result.affectedRows;

      if (totalRowsUpdated !== 1) {
        res.status(400).send({ status: "error", message: "Please, try again" });
      } else {
        res.send({
          status: "ok",
          message: "Profile picture updated successfully",
          updatedProfilePicturePath: picturePath,
        });
      }
    } catch (error) {
      // The error is already handled by the general error-handling middleware
      next(error);
      /*// Handle errors thrown during file upload or database update
      console.error("Error updating profile picture:", error);

      // Check if the error is due to an invalid file type or content type
      if (error.status === 400 || error instanceof multer.MulterError) {
        res.status(400).json({
          status: "error",
          message: error.message,
        });
      } else {
        // For other types of errors, return a generic error message
        res.status(500).json({
          status: "error",
          message: "Internal server error",
        });
      }*/
    }
  }
);

app.post("/api/users/login", async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const sql = "SELECT * FROM users WHERE user_username = ?";
    const rows = await connection.query(sql, [req.body.username]);

    if (rows.length <= 0) {
      res.status(401).json({ status: "error", message: "Invalid credentials" });
    }

    const isPasswordValid = await comparePassword(
      req.body.password,
      rows[0].user_password
    );

    //if (comparePassword(req.body.password, rows[0].user_password)) {

    if (isPasswordValid) {
      res.cookie("user_id", rows[0].user_id, {
        maxAge: 9000000,
        httpOnly: true,
      });
      res.cookie("user_name", rows[0].user_full_name, {
        maxAge: 9000000,
        httpOnly: true,
      });
      res.cookie("user_username", rows[0].user_username, {
        maxAge: 9000000,
        httpOnly: true,
      });
      res.cookie("logged_in", "true", { maxAge: 9000000, httpOnly: true });

      res.json({
        id: rows[0].user_id,
        name: rows[0].user_full_name,
        username: rows[0].user_username,
      });
    } else {
      res.status(401).json({ status: "error", message: "Invalid credentials" });
      //throw new Error("WRONG_PASSWORD");
    }
  } catch (err) {
    console.error("err", err);
    res
      .status(400)
      .send({ status: "error", message: "No match found. Try again" });
  } finally {
    if (connection) connection.release();
  }
});

app.get("/api/getUserCookies", (req, res) => {
  const cookies = req.cookies;
  res.json({ cookies });
});

app.get("/api/users/:id", async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const sql = "SELECT * FROM users WHERE user_id = ?";
    const rows = await connection.query(sql, [req.params.id]);
    if (
      req.cookies.logged_in === "true" &&
      req.cookies.user_id === req.params.id
    ) {
      rows[0].logged_in = true;
    } else {
      rows[0].logged_in = false;
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("err", err);
    res
      .status(500)
      .send({ status: "error", message: "Error querying the database" });
  } finally {
    if (connection) connection.release();
  }
});

app.post("/api/logout", (req, res) => {
  // Clear each cookie that you want to remove
  res.clearCookie("user_id");
  res.clearCookie("user_name");
  res.clearCookie("user_username");
  res.clearCookie("logged_in");

  // Send a response
  res.json({ success: true, message: "Logout successful" });
});

// Error-handling middleware for other errors
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  // Send a generic JSON response for all other errors
  res.status(500).json({
    status: "error",
    message: "Internal server error. Please try again later.",
    error: err.message,
  });
});

const PORT = process.env.NODE_DOCKER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
