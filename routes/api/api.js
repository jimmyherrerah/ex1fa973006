var express = require('express');
var router = express.Router();
//aqui exportamos el archivo personas
var personaRoutes = require('./recetas');

router.use('/recetas', personaRoutes);

module.exports = router;