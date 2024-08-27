import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

// We only want image files, so we define a file type filter
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [".jpg", ".jpeg", ".png", ".gif"];
  const allowedContentTypes = ["image/jpeg", "image/png", "image/gif"];

  const fileExtension = path.extname(file.originalname).toLowerCase();
  const contentType = file.mimetype;

  // Check if the file extension and content type is in the allowed list
  if (
    allowedFileTypes.includes(fileExtension) &&
    allowedContentTypes.includes(contentType)
  ) {
    cb(null, true);
  } else {
    // Create a custom error object
    const error = new Error(
      "Invalid file type or content type. Only jpg, jpeg, png, and gif files are allowed."
    );
    error.status = 400; // Set the HTTP status code for the error

    // Pass the error to the callback
    cb(error, false);
  }
};

// To prevent the submission of excessively large files that could consume server resources we define a file size limit (in bytes)
const fileSizeLimit = 500 * 1024; // 500 KB

// Create the multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: fileSizeLimit },
});

export default upload;
