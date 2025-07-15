const sharp = require("sharp");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

module.exports = (req, res, next) => {
  console.log("Sharp middleware exécuté");
  console.log("req.file:", req.file);

  if (req.file) {
    console.log("Fichier trouvé, optimisation...");
    if (!MIME_TYPES[req.file.mimetype]) {
      return res.status(400).json({ error: "Type de fichier non autorisé" });
    }

    const name = req.file.originalname.split(" ").join("_");
    const nameWithoutExtension = name.split(".")[0];
    const filename = nameWithoutExtension + Date.now() + ".jpg";

    req.file.filename = filename;

    sharp(req.file.buffer)
      .resize(null, 460)
      .jpeg({ quality: 80 })
      .toFile(`images/${filename}`);

    next();
  } else {
    console.log("Pas de fichier");
    next();
  }
};
