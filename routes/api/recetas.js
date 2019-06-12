var express = require('express');
var router = express.Router();
//Se utiliza para generar id genericos
var uuid = require('uuid/v4');

//declaramos el arreglo que va a contener los registros del API
var personaCollection = [];
var personaStruct = {
	id:0,
	receta:'',
	precio:'',
	tipo:'',
	observacion:'',
	estado:''
}
//

//Aqui insertamos un registro sin utilizar post man
personaCollection.push(
	Object.assign(
		{},
		personaStruct,
		{
			id:uuid(),
			receta:'Papa al Horno',
			precio:'150',
			tipo:'Gourmet',
			observacion:'Ella no te ama',
			estado:'En proceso'
		})
);
//

//Aqui buscamos por medio del metodo Get este busca dependiendo del ID que se utilice
router.get('/:id', (req, res, next)=>{
	if(!req.params.id) return next();
	var id = req.params.id;
	var persona = persona.personaCollection.filter((e, i)=>{
		return (e.id === id);
	});

	if(persona.length > 0 ){
		res.status(200).json(persona[0]);
	}else{
		res.status(404).json({});
	}
});
//------------------------------------------------------------------

//metodo get se muestran todos los registros
router.get('/', (req, res, next)=>{
	res.status(200).json(personaCollection);
});
//-------------------------------------------------------------------

//metodo post para insertar un registro
router.post('/', (req, res, next)=>{
	var newPersona = Object.assign(
		{},
		personaStruct,
		{id:uuid()},
		req.body
		);
	personaCollection.push(newPersona);
	res.status(200).json(newPersona);

});
//------------------------------------------------------------------

//metodo put para actualizar un registro
router.put('/:id', (req, res, next)=>{
	var id = req.params.id;
	var modifiedPersona = {};
	var originalPersona = {};
	personaCollection = personaCollection.map((e, i)=>{
		if(e.id === id){
			originalPersona = Object.assign({}, e);
			return modifiedPersona = Object.assign({}, e, req.body);
		}
		return e; //retorna en e donde se hace una busqueda en el diccionario de datos
	});
	res.status(403).json({ o: originalPersona, m: modifiedPersona});
});
//-----------------------------------------------------------

//metodo eliminar
router.delete('/:id', (req, res, next)=>{
	var id = req.params.id;
	var deletedPersona = {};
	personaCollection = personaCollection.filter((e,i)=>{
		if(e.id === id){
			deletedPersona = Object.assign({}, e);
			return false;
		}
		return true;
	});
	res.status(400).json({d:deletedPersona, c:personaCollection});

});
//-----------------------------------------------------------------


module.exports = router;