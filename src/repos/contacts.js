const Contact = require('../models/contact');
const assert = require('assert');
const https = require('https');
ObjectID = require('mongodb').ObjectID;

function getContacts(limit){

    return new Promise((resolve, reject) => {
        Contact.find()
            .limit(limit)
            .exec((err, result) => {
            if (err) {
				reject(err);
			} else {
				resolve(result);
			}
        });
	});  
}

function storeContacts(contact){

    return new Promise((resolve, reject) => {
        Contact.create(contact, (err, result) => {
            if (err) {
				reject(err);
			} else {
				resolve(result);
			}
        });
    });

    
}

function removeContactById(objectId)
{
    return new Promise((resolve, reject) => {
        var objtId = new ObjectID(objectId);
        var query = {'_id': objtId};
        Contact.findOneAndDelete(query, (err, obj) => {
            if (err) {
				reject(err);
			} else {
                resolve(obj);
			}
          });
    });
}

function getContactById(objectId)
{
    return new Promise((resolve, reject) => {
        var objtId = new ObjectID(objectId);
        var query = {'_id': objtId};

        Contact.findById(objtId, (err, obj) => { 
            if (err) {
				reject(err);
			} else {
                resolve(obj);
			}

         });
    }).then(function(userObj){
        console.log(userObj);
        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'api.github.com',
                port: 443,
                path: '/users/'+userObj.name,
                method: 'GET',
                headers: {'user-agent': 'node.js'}
              };
              
              const req = https.request(options, (res) => {
                console.log('statusCode:', res.statusCode);
                console.log('headers:', res.headers);
              
                res.on('data', (d) => {
                //   process.stdout.write(d);
                    console.log(d);
                  resolve(d);
                });
              });
              
              req.on('error', (e) => {
                // console.error(e);
                reject(e);
              });
              req.end();
        }).then((gitObj) => {
            console.log(gitObj);
        });   
    });
}

function update(objectId, data)
{
    return new Promise((resolve, reject) => {
        var objtId = new ObjectID(objectId);
        var query = {'_id': objtId};
        var values = { $set: data };

        Contact.findOneAndUpdate(query, values, {upsert:true}, (err, obj) => {
            if (err) {
				reject(err);
			} else {
                resolve(obj);
			}
        });
    });
}

function search(keyword)
{
    return new Promise((resolve, reject) => {
        Contact.find({'name': new RegExp(keyword, 'i')}, (err, result) => {
            if (err) {
				reject(err);
			} else {
				resolve(result);
			}
        });
	}); 
}

module.exports = {
    getContacts: getContacts,
    storeContacts: storeContacts,
    removeContactById: removeContactById,
    getContactById: getContactById,
    update: update,
    search: search
};