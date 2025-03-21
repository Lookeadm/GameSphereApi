const mongoose = require("mongoose");
const schema = mongoose.Schema;
const oid = schema.ObjectId;

const gameSchema = new schema({
    id: { type: oid },
    name: { type: String, required: true },
    description: { type: String },
    developer: { type: String },
    size: { type: String },
    rating: { type: Number, min: 0, max: 10 },
    downloadLinks: { type: String }, // Changed to an array for multiple links
    images: { type: [String] }, // Better to enforce an array of strings (URLs)
    categories: { type: [oid], ref: "categories" }, // Defining categories as an array of strings
    newReleases: { type: Boolean },
    upComing: { type: Boolean },
    urlDownload: { type: String },
});

module.exports = mongoose.models.game || mongoose.model("game", gameSchema);
