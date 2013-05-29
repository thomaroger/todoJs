var tasks = [];

function add(req){
    console.log('add task : ' +  req.body.task);
    if(req.session.tasks) {
        tasks = req.session.tasks;
    }
    tasks.push(req.body.task);
    req.session.tasks = tasks;
}

function remove(req){
    console.log('remove task : ' + req.params.id);
    if(req.session.tasks) {
        tasks = req.session.tasks;
    }
    tasks.splice(req.params.id, 1);
    req.session.tasks = tasks;
}

function clean(req){
    console.log('clean all tasks');
    if(req.session.tasks) {
        req.session.tasks = [];
    }
}

module.exports = {
    add : add,
    remove : remove,
    clean : clean
}