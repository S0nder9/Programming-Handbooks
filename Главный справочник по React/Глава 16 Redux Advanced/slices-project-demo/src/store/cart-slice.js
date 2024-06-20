import { createSlice } from "@reduxjs/toolkit";
import { mainActions } from "./main-slice";

const initialState = {
  items: [],
  itemsQuantity: 0,
  isCartContentChanged: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.itemsQuantity++;
      state.isCartContentChanged = true;


      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.itemsQuantity--;
      state.isCartContentChanged = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    updateCart(state, action) {
      state.items = action.payload.items;
      state.itemsQuantity = action.payload.itemsQuantity;
    },
  },
});

export const cartActions = cartSlice.actions;

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      mainActions.showStatusMessage({
        status: "pending",
        title: "Отправка данных",
        message: "Данные корзины отправляются на сервер...",
      })
    );

    const sendDataHttpRequest = async () => {
      const response = await fetch(
        "https://react-cours-http-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({items: cartData.items, itemsQuantity: cartData.itemsQuantity}),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при отправке данных в корзину");
      }
    };

    try {
      await sendDataHttpRequest();

      dispatch(
        mainActions.showStatusMessage({
          status: "success",
          title: "Отправка данных успешна",
          message: "Данные корзины успешно отправлены на сервер!",
        })
      );
    } catch (error) {
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



export const getCartData = () => {
    return async (dispatch) => {
        const getDataHttpRequest = async () => {
            const response = await fetch("https://react-cours-http-default-rtdb.firebaseio.com/cart.json");

            if (!response.ok) {
                throw new Error("Невозможно извлечь данные");
            }

            const responseData = await response.json();

            return responseData;
        }

        try {
            const cartData = await getDataHttpRequest();
            dispatch(cartActions.updateCart({
                items: cartData.items || [],
                itemsQuantity: cartData.itemsQuantity
            }))
        } catch (error) {
      dispatch(
        mainActions.showStatusMessage({
          status: "error",
          title: "Ошибка запроса",
          message: "Ошибка при отправке данных на сервер!",
        })
      );
    }
}
}



export default cartSlice;
