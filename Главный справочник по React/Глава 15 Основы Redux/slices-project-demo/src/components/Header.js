import classes from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { userAuthActions } from "../store/authSlice";

const Header = () => {

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  const dispatch = useDispatch();

  const signHandler = () => {
    dispatch(userAuthActions.signOut());
  };

  return (
    <header className={classes.header}>
      <h1>Redux</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Главная</a>
          </li>
          <li>
            <a href="/">О нас</a>
          </li>
          <li>
            <a href="/">Контакты</a>
          </li>

          <li>
            {isUserLoggedIn && <a href="/">Мои продажи</a>}
          </li>
          <li>

            {isUserLoggedIn && <button onClick={signHandler}>Выйти</button>}

          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
