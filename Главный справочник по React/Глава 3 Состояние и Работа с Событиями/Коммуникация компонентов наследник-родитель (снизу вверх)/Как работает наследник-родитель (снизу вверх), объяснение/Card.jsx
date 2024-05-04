import React from "react";
import InputMain from "./InputMain";

const Card = (props) => {
    let name = "prompt()";
    const arraySecond = ["more"]; // Создаем новый массив, который будем конкатенировать с пред. массивом
        
    function nextSentDataToParent(array) {
        const mainMain = arraySecond.concat(array) // Конкатенируем массивы
        props.fnc(mainMain); // Пропс используется для передачи fnc дальше по иерархии, внутрь fnc передаем массив, который будем передавать в App.jsx
    } // Создаем функцию, которую будем использовать для передачи массива, внутрь передаем array. Этот array и есть массив из файла InputMain

    return (
        <div className="div-card">
            <InputMain name={name} sentDataToParent={nextSentDataToParent} />
            {/* Создаем параметр sentDataToParent, который является функцией в InputMain.jsx, в который передаем функцию nextSentDataToParent*/}
        </div>
    );
}

export default Card;