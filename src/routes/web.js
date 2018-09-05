var express = require('express');
var router = express.Router();

const ContactsController = require('../controllers/ContactsController');

router.get('/contacts', ContactsController.index);
router.get('/contacts/add', ContactsController.add);
router.get('/contacts/edit/:objectId', ContactsController.edit);
router.get('/contacts/view/:objectId', ContactsController.view);

module.exports = router;