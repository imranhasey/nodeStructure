var express = require('express');
var router = express.Router();

const ContactsController = require('../controllers/ContactsController');

router.post('/contacts/store', ContactsController.store);
router.delete('/contacts/delete/:objectId', ContactsController.remove);
router.put('/contacts/edit/:objectId', ContactsController.update);
router.get('/contacts/search/:keyword', ContactsController.search);

module.exports = router;