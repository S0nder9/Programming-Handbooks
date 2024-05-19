// Импортируем необходимые компоненты и стили
import Card from "../UI/Card";
import styles from "./CreateUser.module.css";
import Button from "../UI/Button";
import { useState } from "react";

// Определяем функциональный компонент CreateUser
const CreateUser = (props) => {
    // Используем хук useState для создания состояний для имени и возраста
    const [inputName, setInputName] = useState("");
    const [inputAge, setInputAge] = useState("");

    // Функция, вызываемая при отправке формы
    const createUserHandler = (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        // Проверяем, что оба поля не пустые
        if (inputName.trim().length === 0 || inputAge.trim().length === 0) {
            return;
        }

        // Проверяем, что возраст больше нуля
        if (+inputAge < 1) {
            return;
        }

        // Вызываем функцию onCreateUser из пропсов с введенными именем и возрастом
        props.onCreateUser(inputName, inputAge);

        // Очищаем поля ввода
        setInputName("");
        setInputAge("");
    }

    // Обработчик изменения поля ввода имени
    const nameChangehandler = (event) => {
        const nameValue = event.target.value;
        setInputName(nameValue);
    }

    // Обработчик изменения поля ввода возраста
    const ageChangehandler = (event) => {
        const ageValue = event.target.value;
        setInputAge(ageValue);
    }

    // JSX-разметка компонента
    return (
        <Card className={styles.input}>
            <form onSubmit={createUserHandler}>
                <label htmlFor="name">Имя</label>
                <input type="text" id="name" onChange={nameChangehandler} value={inputName} />

                <label htmlFor="age">Возраст</label>
                <input type="text" id="age" onChange={ageChangehandler} value={inputAge} />

                <Button type="submit">Отправить пользователя</Button>
            </form>
        </Card>
    );
}

// Экспортируем компонент CreateUser для использования в других файлах
export default CreateUser;
