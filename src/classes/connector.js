const database = require('../config/database');
const mongoose = require('mongoose');

module.exports.mongoose = mongoose.connect(`mongodb://${database.host}:${database.port}/${database.name}`, { useNewUrlParser: true });
