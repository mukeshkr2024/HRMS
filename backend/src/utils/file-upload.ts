import multer from "multer";
import path from "path";
const uploadDir = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const employeeName = req.employee?.firstName || "unknown";
    // const uploadPath = `${uploadDir}/documents/${employeeName}`;
    const uploadPath = `${uploadDir}/documents/`;
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });
