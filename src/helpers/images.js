// Helper de images

// Importamos el modelo de la imagen
const {Image} = require('../models');


// Exportamos
module.exports = {
    
    // 5 Imágenes más populares
    async popular() {
        const images = await Image.find()
            .limit(5)
            .sort({likes: -1});
        
        return images;
    }

};