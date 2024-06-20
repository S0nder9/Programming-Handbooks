// Глава 16: Redux Advanced
// Использование Action Creator с использованием @reduxjs/toolkit
// В данном примере будет описан процесс создания Action Creator и использования хранилища Redux.

// Импортируем необходимые функции и объекты из @reduxjs/toolkit и других файлов
import { createSlice } from "@reduxjs/toolkit";
import { mainActions } from "./main-slice";

// Action Creator sendCartData
// Этот Action Creator используется для отправки данных корзины на сервер
export const sendCartData = (cartData) => {
  // Возвращаем асинхронную функцию, которая принимает dispatch в качестве аргумента
  return async (dispatch) => {
    // Отправляем действие showStatusMessage с состоянием "pending"
    dispatch(
      mainActions.showStatusMessage({
        status: "pending",
        title: "Отправка данных",
        message: "Данные корзины отправляются на сервер...",
      })
    );

    // Асинхронная функция для выполнения HTTP-запроса
    const sendHttpRequest = async () => {
      const response = await fetch(
        "https://react-cours-http-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartData),
        }
      );

      // Если ответ сервера не OK, выбрасываем ошибку
      if (!response.ok) {
        throw new Error("Ошибка при отправке данных в корзину");
      }
    };

    // Используем try/catch для обработки ошибок при выполнении запроса
    try {
      await sendHttpRequest();

      // Если запрос выполнен успешно, отправляем действие showStatusMessage с состоянием "success"
      dispatch(
        mainActions.showStatusMessage({
          status: "success",
          title: "Отправка данных успешна",
          message: "Данные корзины успешно отправлены на сервер!",
        })
      );
    } catch (error) {
      // Если произошла ошибка, отправляем действие showStatusMessage с состоянием "error"
      dispatch(
        mainActions.showStatusMessage({
          status: "error",
          title: "Ошибка запроса",
          message: "Ошибка при отправке данных на сервер!",
        })
      );
    }
  };
};

// Пример использования createSlice для создания среза состояния (slice)
const cartSlice = createSlice({
  name: 'cart', // Имя среза
  initialState: { items: [], totalQuantity: 0 }, // Начальное состояние
  reducers: {
    // Пример редуктора для добавления элемента в корзину
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalQuantity++;
    },
    // Пример редуктора для удаления элемента из корзины
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalQuantity--;
    }
  }
});

// Экспортируем действия, созданные с помощью createSlice
export const cartActions = cartSlice.actions;

// Экспортируем срез состояния по умолчанию
export default cartSlice.reducer;

/*
Описание кода:

1. Импортируем функции createSlice и mainActions.
2. Создаем асинхронный Action Creator sendCartData, который принимает cartData как аргумент.
3. Внутри Action Creator возвращаем асинхронную функцию с dispatch.
4. Отправляем начальное действие showStatusMessage со статусом "pending".
5. Определяем функцию sendHttpRequest для выполнения HTTP-запроса с методом PUT и отправкой данных в формате JSON.
6. Используем try/catch для обработки ошибок.
7. В блоке try выполняем запрос с помощью sendHttpRequest и отправляем действие со статусом "success" при успешной отправке данных.
8. В блоке catch отправляем действие со статусом "error" при ошибке.
9. Создаем срез состояния (slice) cartSlice с начальным состоянием и редукторами для добавления и удаления элементов в корзину.
10. Экспортируем действия, созданные с помощью createSlice, и редуктор среза состояния.
*/
