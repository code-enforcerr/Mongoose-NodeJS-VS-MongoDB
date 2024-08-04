// routes/personRoutes.js

const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController.js');

// Define routes and associate them with controller methods
router.post('/', personController.createPerson);
router.post('/many', personController.createPeople);
router.get('/name/:name', personController.findPeopleByName);
router.get('/favorite/:food', personController.findOneByFavoriteFood);
router.get('/:personId', personController.findPersonById);
router.put('/:personId/food', personController.addFavoriteFoodById);
router.put('/name/:personName/age', personController.updateAgeByName);
router.delete('/:personId', personController.deletePersonById);
router.delete('/delete/mary', personController.deleteAllMarys);
router.get('/burritos', personController.findPeopleWhoLikeBurritos);

module.exports = router;
