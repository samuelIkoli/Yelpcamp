const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200,h_200');
});

const PesovaSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePictures: [ImageSchema],
    city: String,
    country: String,
    bio: String,
    coverPhoto: [ImageSchema]
});
module.exports = mongoose.model('Pesova', PesovaSchema);
