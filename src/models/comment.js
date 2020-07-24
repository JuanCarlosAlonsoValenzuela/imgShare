const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;


const commentSchema = new Schema({
    email: { type: String},
    name: { type: String},
    comment: { type: String },
    timestamp: { type: Date, default: Date.now },

    // id de la imagen sobre la que estamos comentando
    image_id: { type:ObjectId },
    gravatar: { type: String }
});

commentSchema.virtual('image')
    .set(function(image){
        this._image = image;
    })
    .get(function(){
        return this._image;
    });

module.exports = mongoose.model('comment', commentSchema);


