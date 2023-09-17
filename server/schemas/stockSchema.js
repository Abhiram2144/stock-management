const  mongoose = require( 'mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: String,
    price: Number,
    date: String,
    description: String
});

const stockSchema = mongoose.model('stockSchema', schema);

module.exports = stockSchema; 