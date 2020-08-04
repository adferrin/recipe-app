const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    content: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
}, {timestamps: true});

//recipe needs to point to userId
const recipeSchema = new Schema ({
    name: String,
    region: String,
    ingredients: {
        type: [{type: Schema.Types.ObjectId, ref: 'Ingredients'}],
        default: []
    },
    process: String,
    gluten: {
        type: Boolean, default: true 
    },
    dairy: {
        type: Boolean, default: true
    },
    vegan: {
        type: Boolean, default: false
    },
    reviews: [reviewSchema],
}, {timestamps: true});




module.exports = mongoose.model('Recipe', recipeSchema);