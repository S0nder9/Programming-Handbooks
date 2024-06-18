import classes from "./Auth.module.css";
import { useSelector, useDispatch } from "react-redux";
import { userAuthActions } from  "../store/authSlice";

const Auth = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(userAuthActions.logIn());
  };

  if (isUserLoggedIn) {
    return null;
  }

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Пароль</label>
            <input type="password" id="password" />
          </div>
          <button type="submit">Войти</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
