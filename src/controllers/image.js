// Controlador relacionado con imágenes
const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');


// De esta forma solo tenemos que importar una
// No hace falta añadir index a la ruta porque es el valor por defecto
const { Image, Comment } = require('../models');
const sidebar =  require('../helpers/sidebar');
// const { json } = require('express');
// const { request } = require('http');



// Creamos el objeto
const ctrl = {};

// Mostrar detalles de la imagen
ctrl.index = async (req, res) => {
    let viewModel = { image: {}, comments:{}};

    const image = await Image.findOne({filename: req.params.image_id});

    if(image){
        // Actualizar número de visitas y guardamos en la base de datos
        image.views = image.views + 1;
        viewModel.image = image.toJSON();
        await image.save();

        // Cargar todos los comentarios de la imagen
        const comments = await Comment.find({image_id: image._id});
        viewModel.comments = comments.map(comment => comment.toJSON());

        viewModel = await sidebar(viewModel);

        res.render('image', viewModel);
    }else{
        res.redirect('/');
    }
};

ctrl.create = async (req, res) => {
    
    // Generamos un nombre aleatorio para el archivo
    const imgUrl = randomNumber();

    // Multer hace que el archivo esté disponible a través de req.file
    // Dicho archivo se guardará dentro de la carpeta temp, como se ha indicado en config.js
    // En lugar de almacenar la imagen en la base de datos, la guardaremos en el sistema para que sea mas rápido
    
    // Obtenemos la extensión (debemos importar path)
    const ext = path.extname(req.file.originalname).toLowerCase();

    // Obtenemos la dirección de la imagen
    const imageTempPath = req.file.path;

    // Obtenemos la ruta en la que queremos almacenar la imagen 
    // Necesitamos la extensión y un nombre aleatorio
    // Para el nombre aleatorio creamos el archivo libs.js dentro de la carpeta helpers
    // Recordar el import de randomNumber de arriba
    const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
    // Validación de la extensión
    // Debemos importar fs-extra
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
        await fs.rename(imageTempPath, targetPath);

        // Creamos el objeto nuevo
        const newImg = new Image({
            title: req.body.title,
            filename: imgUrl + ext,
            description: req.body.description
        })

        // Guardamos de forma asíncrona
        const imageSaved = await newImg.save();

        res.redirect('/images/' + imageSaved.filename);
        
    }else{
        // Si no se cumple el formato, eliminamos la imagen de la carpeta temp
        await fs.unlink(imageTempPath);
        res.status(500).json({error: 'Only Images are allowed'});

    }

    
};

ctrl.like = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}})

    if (image){
        image.likes = image.likes + 1;
        image.save();
        res.json({likes: image.likes})
    }else{
        res.status(500).json({error: 'Internal Error'});
    }
};


// POST de comentario
ctrl.comment = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id }})
    
    if (image){
        const newComment = new Comment(req.body);
        // Hasheamos el correo y lo añadimos al objeto
        // Es necesario importar md5
        newComment.gravatar = md5(newComment.email);
        newComment.image_id =  image._id;
        
        // Lo guardamos en la base de datos
        await newComment.save();
        
        res.redirect('/images/' + image.filename);
    }else{
        res.redirect('/');
    }
    
};

ctrl.remove = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});

    if (image){
        // Eliminamos la imagen de la carpeta upload
        await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
        
        // Eliminamos los comentarios
        await Comment.deleteOne({image_id: image._id});

        // Y por último eliminamos la imagen
        await image.remove();
        res.json(true);
    }
};

// Exportamos
module.exports = ctrl;