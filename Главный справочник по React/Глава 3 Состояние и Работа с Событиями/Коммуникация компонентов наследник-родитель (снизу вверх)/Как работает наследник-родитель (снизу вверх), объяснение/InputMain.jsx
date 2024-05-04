import React, { useState } from "react";

const InputMain = (props) => {
    const [inputMain, setInputMain] = useState(0);

    const buttonPlus = () => {
        setInputMain(inputMain + 1);
    }

    const array = [
        "apple",
        "orange"
    ]; // Создаем массив, который будем передавать в Card.jsx

    function sentArray() {
        props.sentDataToParent(array); // Пропс используется для передачи sentDataToParent дальше по иерархии, внутрь sentDataToParent передаем массив, который будем передавать в Card.jsx
    } // Создаем функцию, которую будем использовать для передачи массива

    return (
        <div>
            <input type="button" value="Нажми на меня!" onClick={buttonPlus} />
            <p>Привет, {props.name}, тебе {inputMain} лет</p>
            <button onClick={sentArray}>Send Array to Parent</button> 
            {/* Вызываем  sentArray при клик на кнопку, внутрь передаем функцию sentArray*/}
        </div>
    );
}

export default InputMain;