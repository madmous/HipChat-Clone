'use strict';

const express = require ('express');
const router  = express.Router();

const loginController = require ('./loginController');

router.route('/')
  .post(loginController.authenticate)

module.exports = router;