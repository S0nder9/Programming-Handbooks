// Бесконечный цикл while
while (true) {
    console.log("Этот цикл выполняется бесконечно");
}

// Бесконечный цикл for
for (let i = 0; i >= 0; i++) {
    console.log("Этот цикл выполняется бесконечно");
}

// Бесконечный цикл do-while
do {
    console.log("Этот цикл выполняется бесконечно");
} while (1 === 1);

// Бесконечный цикл с использованием continue
for (let i = 0; i < 5; i++) {
    console.log(i);
    continue; // Этот оператор не изменяет значение i, поэтому цикл никогда не завершится
}
