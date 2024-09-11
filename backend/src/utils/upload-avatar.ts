
import multer from "multer";
import path from "path";

const uploadDir = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = `${uploadDir}/avatars/`;
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

export const uploadAvatar = multer({ storage: storage });
