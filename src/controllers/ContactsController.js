const contacts = require('../repos/contacts');

function index(request, response, next)
{
    contacts.getContacts(10).then((data) => {
    
        response.render('contacts/index', { username: 'Imran', 'products': data });
    });
    
}

function add(request, response, next)
{
    response.render('contacts/add');
}

function store(request, response, next)
{
    var contact = {
        'id': request.body.id,
        'name': request.body.name,
        'phone': request.body.phone,
        'address': request.body.address,
        'github': request.body.github
    };

    contacts.storeContacts(contact).then((data) => {
        response.redirect('/contacts');
    }); 
}

function remove(request, response)
{
    var objectId = request.params.objectId.toString();

    contacts.removeContactById(objectId).then((data) => {
        response.send(JSON.stringify(data));
    });
}

function edit(request, response, next)
{
    var objectId = request.params.objectId.toString();

    contacts.getContactById(objectId).then((data) => {
        response.render('contacts/add', { data: data });
    });
}

function update(request, response, next)
{
    var objectId = request.params.objectId.toString();
    var data = {id: request.body.id, name: request.body.name, phone: request.body.phone, address:request.body.address, github: request.body.github};
    contacts.update(objectId, data).then((result) => {
        response.send(result.result);
    });
}

function search(request, response, next)
{
    var keyword = request.params.keyword;
    contacts.search(keyword).then((resultObj) => {
        response.render('contacts/search-results', { username: 'Imran', 'products': resultObj });
    });
}

function view(request, response, next)
{
    const objectId = request.params.objectId.toString();
    contacts.getContactById(objectId).then(function(resultObj){
        // console.log(resultObj);
        // response.render('contacts/view-user', {'user': resultObj});
    });
}

module.exports = {
    index: index,
    store: store,
    remove: remove,
    add: add,
    edit: edit,
    update: update,
    search: search,
    view: view
};
