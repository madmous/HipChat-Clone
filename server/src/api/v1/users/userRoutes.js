'use strict';

const validate = require ('express-validation');
const express  = require ('express');
const router   = express.Router();

const userValidation = require ('./userValidation');
const userController = require ('./userController');

router.route('/')
  .get(userController.getUser)
  .put(validate(userValidation.updateUser), userController.updateUser)
  .delete(userController.removeUser)

module.exports = router;