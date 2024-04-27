// Подглава 4.3: Применение рекурсии

// Рекурсия в алгоритмах
/*
Рекурсия часто используется в алгоритмах для решения задач, которые могут быть разбиты на более мелкие подзадачи того же типа. 
Это позволяет писать более простой и понятный код, который может быть эффективно применен к различным ситуациям.
*/

// Пример: Вычисление суммы элементов массива
function sumArrayRecursive(arr) {
    if (arr.length === 0) {
        return 0;
    }
    return arr[0] + sumArrayRecursive(arr.slice(1));
}

console.log(sumArrayRecursive([1, 2, 3, 4, 5])); // Выведет: 15

/*
Этот пример демонстрирует использование рекурсии для вычисления суммы элементов массива. 
Функция sumArrayRecursive вызывает саму себя для обработки оставшейся части массива, пока массив не станет пустым.
*/

// Рекурсивные структуры данных
/*
Рекурсия также широко применяется при работе с рекурсивными структурами данных, такими как деревья, списки и графы. 
Она позволяет эффективно обрабатывать и манипулировать такими структурами данных, а также реализовывать различные алгоритмы, основанные на них.
*/

// Пример: Дерево
class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(value) {
        const childNode = new TreeNode(value);
        this.children.push(childNode);
    }
}

/*
Этот пример демонстрирует рекурсивную структуру данных дерево. 
Каждый узел TreeNode содержит значение и список дочерних узлов, которые также являются объектами TreeNode. 
Это позволяет организовать и хранить данные иерархическим образом.
*/
