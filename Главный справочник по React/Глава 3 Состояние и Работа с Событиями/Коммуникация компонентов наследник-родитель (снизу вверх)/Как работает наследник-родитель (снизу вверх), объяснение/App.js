import React from 'react';
import './App.css';
import Card from './Components/Card';

function App() {

    function mainFnc(mainMain) {
        console.log(mainMain); // Выводим массив в консоль
    } // Создаем функцию mainFnc, в которую передаем mainMain. Это и есть законкатенированный массив из файла Card.jsx

    return (
        <div>
            <Card fnc={mainFnc} />
            {/* Обязательно создаем параметр fnc, который является функцией в Card.jsx, в который передаем  функцию mainFnc*/}
        </div>
    );
}

export default App;