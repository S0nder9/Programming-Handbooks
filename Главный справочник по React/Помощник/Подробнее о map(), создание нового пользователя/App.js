import CreateUser from "./Components/Users/CreateUser";
import UserList from "./Components/Users/UserList";
import { useState } from "react";

// Определяем функциональный компонент App
function App() {
    // Используем хук useState для создания состояния userList
    // userList будет хранить массив объектов пользователей
    const [userList, setUserList] = useState([]);

    // Функция для добавления нового пользователя в список
    const createUserHandler = (name, age) => {
        // setUserList обновляет состояние userList
        setUserList((prevUserList) => {
            // Возвращаем новый массив, который содержит все предыдущие элементы userList
            // и новый объект пользователя с полями name, age и id
            return [
                ...prevUserList, 
                { 
                    name, // имя нового пользователя
                    age, // возраст нового пользователя
                    id: Math.random().toString() // уникальный идентификатор для нового пользователя
                }
            ];
        });
    }

    // JSX-разметка компонента
    return (
        <div>
            {/* Передаем функцию createUserHandler как пропс onCreateUser в компонент CreateUser */}
            <CreateUser onCreateUser={createUserHandler} />
            {/* Передаем текущий список пользователей как пропс users в компонент UserList */}
            <UserList users={userList} />
        </div>
    );
}

// Экспортируем компонент App для использования в других файлах
export default App;

// Функция createUserHandler:

// Принимает два аргумента: name и age, которые являются значениями полей ввода нового пользователя.

// setUserList обновляет состояние userList.

// prevUserList - текущее состояние списка пользователей.

// return [...prevUserList, { name, age, id: Math.random().toString() }];: возвращает новый массив, который включает в себя все предыдущие элементы 
// prevUserList и новый объект пользователя.

// { name, age, id: Math.random().toString() }: новый объект пользователя с полями name, age и уникальным идентификатором id.