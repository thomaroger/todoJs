var task = require('../model/task');


function setup(app){
    app.get('/', function(req, res) {
        // Liste des todos
        res.render('list.ejs', {tasks : req.session.tasks});
    });

    app.post('/add', function(req, res) {
        // Ajout d'une todo
        task.add(req);
        res.redirect('/');
    });

    app.get('/delete/:id', function(req, res) {
        // Remove une todo
        task.remove(req);
        res.redirect('/');
    });

    app.get('/clean', function(req, res) {
        // Supprimer toutes les todos
        task.clean(req);
        res.redirect('/');
    });

    app.use(function(req, res, next){
        console.log('%s %s', req.method, req.url);
        res.setHeader('Content-Type', 'text/plain');
        res.send(404, 'Page introuvable !');
    });
}

module.exports = {
    setup : setup
}