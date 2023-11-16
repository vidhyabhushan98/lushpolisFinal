const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const plantSchema = new mongoose.Schema({
    name: String,
    image: String,
    similar_images: [String],
    common_names: [String],
    taxonomy: {
        class: String,
        genus: String,
        order: String,
        family: String,
        phylum: String,
        kingdom: String,
    },
    wikipedia_url: String,
    rank: String,
    description: {
        value: String,
        citation: String,
        license_name: String,
        license_url: String,
    },
    synonyms: [String],
    edible_parts: String,
});

module.exports = mongoose.model('Plant', plantSchema);