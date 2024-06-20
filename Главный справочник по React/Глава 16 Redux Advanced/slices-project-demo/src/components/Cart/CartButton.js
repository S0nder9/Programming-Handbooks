import styles from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { mainActions } from "../../store/main-slice";


const CartButton = (props) => {
  const dispatch = useDispatch();
  const itemsQuantity = useSelector(state => state.cart.itemsQuantity)

  const cartVisibilityHandler = () => {
      dispatch(mainActions.toggleCartVisibility())
  }

  return (
    <button className={styles.button} onClick={cartVisibilityHandler}>
      <span>Корзина</span>
      <span className={styles.badge}>{itemsQuantity}</span>
    </button>
  );
};

export default CartButton;
