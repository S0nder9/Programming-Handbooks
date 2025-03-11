"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var url = "https://jsonplaceholder.typicode.com/todos/2";
axios_1.default.get(url).then(function (res) {
    var todo = res.data;
    var id = todo.id;
    var title = todo.title;
    var completed = todo.completed;
    logTodo(id, completed, title);
});
var logTodo = function (id, title, completed) {
    console.log("The todo with ID: ".concat(id, " has a title of: ").concat(title, " and is completed: ").concat(completed));
};
