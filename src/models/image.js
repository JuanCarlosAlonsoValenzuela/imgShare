const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

// Constructor
const ImageSchema = new Schema({
    title: { type: String },
    description: { type:String },
    filename: { type: String },
    views: { type: Number, default: 0},
    likes: { type: Number, default: 0},
    timestamp: { type: Date, default: Date.now }
});

// Ejemplo de Variable virtual (no se almacena en la db)
// Se genera cada vez que es llamado (similar a una propiedad derivada)
ImageSchema.virtual('uniqueId')
    .get(function(){
        return this.filename.replace(path.extname(this.filename), '');
    });


// Exportamos el modelo
module.exports = mongoose.model('Image', ImageSchema);

