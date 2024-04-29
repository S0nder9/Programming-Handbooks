// Глава 2: Основы React

// Подглава 2.1: Добавление CSS стилей

// В React есть несколько способов добавления CSS стилей к компонентам.
// Один из них - использование встроенных стилей с помощью объектов JavaScript.




// Пример 1: Встроенные стили с помощью объектов JavaScript:
import React from 'react';

// Создание компонента
const MyComponent = () => {
    // Определение стилей в виде объекта
    const styles = {
        container: {
            backgroundColor: 'lightblue',
            padding: '20px',
            borderRadius: '5px'
        },
        text: {
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold'
        }
    };

    // Возвращение JSX с применением стилей
    return (
        <div style={styles.container}>
            <p style={styles.text}>Пример компонента с CSS стилями</p>
        </div>
    );
};

// export default MyComponent;

// В этом примере создается компонент MyComponent, который содержит стили,
// определенные в объекте styles. Затем стили применяются к соответствующим элементам JSX
// с использованием атрибута style.




// Пример 2: Использование CSS-модулей:

import React from 'react';
import styles from './MyComponent.module.css';

const ComponentMain = () => {
    return (
        <div className={styles.container}>
            <p className={styles.text}>Пример компонента с CSS модулями</p>
        </div>
    );
};

// export default ComponentMain;




// Пример 3: Использование внешних библиотек стилей, таких как Bootstrap, Material-UI и тд:

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyComponentMAin = () => {
    return (
        <div className="container">
            <p className="text-primary">Пример компонента с использованием Bootstrap</p>
        </div>
    );
};

// export default MyComponentMAin;




// Пример 4: Глобальные стили через CSS файл:

// /* styles.css */

// .container {
//     background-color: lightblue;
//     padding: 20px;
//     border-radius: 5px;
// }

// .text {
//     color: white;
//     font-size: 18px;
//     font-weight: bold;
// }

// .jsx

import React from 'react';
import './styles.css';

const MyComponentMajor  = () => {
    return (
        <div className="container">
            <p className="text">Пример компонента с глобальными CSS стилями</p>
        </div>
    );
};

// export default MyComponentMajor;
