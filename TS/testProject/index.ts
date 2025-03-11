import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/todos/2";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then((res) => {
  const todo = res.data as Todo;

  const id = todo.id;
  const title = todo.title;
  const completed = todo.completed;

  logTodo(id, title, completed);
});

const logTodo = (id: number, title: string, completed: boolean) => {
  console.log(
    `The todo with ID: ${id} has a title of: ${title} and is completed: ${completed}`
  );
};
