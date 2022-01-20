const express = require('express');
const ThingController = require('../controllers/thing.controller');

const router = express.Router();

router
  .route('/thing')
  .post(ThingController.createThing)
  .get(ThingController.getAllThings);

router
  .route('/thing/:id')
  .get(ThingController.getThing)
  .delete(ThingController.deleteThing);
// .patch(ThingController.updateThing)

module.exports = router;
