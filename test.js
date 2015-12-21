var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test3');

var TodoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    note: String,
    updated_at: { type: Date, default: Date.now },
});
var Todo = mongoose.model('Todo', TodoSchema);
var todo = new Todo({name: 'Master NodeJS', completed: false, note: 'Getting there...'});
todo.save(function(err){
    if(err)
        console.log(err);
    else
        console.log(todo);
});