import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";
import { counterActions } from "../store/counterSlice";

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);
  const isCounterInvisible = useSelector((state) => state.counter.isCounterInvisible);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  const dispatch = useDispatch();

  const toggleCounterHandler = () => {
    dispatch(counterActions.setCounterVisibility());
  };

  return (<>
    {isUserLoggedIn &&<div className={classes.counter}>Профиль пользователя</div>}
    {isUserLoggedIn && <main className={classes.counter}>
      
      <h1>Счётчик</h1>
      {!isCounterInvisible && <div className={classes.value}>{counter}</div>}
      <div>
        <button style={{ margin: "4px" }} onClick={() => dispatch(counterActions.increment())}>Inc</button>
        <button style={{ margin: "4px" }} onClick={() => dispatch(counterActions.increase(10))}>+ 10</button>
        <button onClick={() => dispatch(counterActions.decrement())}>Dec</button>
      </div>
      <button onClick={toggleCounterHandler}>Спрятать / Показать</button>
    </main>}
    </>
  );
};

export default Counter;


// import classes from "./Counter.module.css";
// import { Component } from "react";
// import { connect } from "react-redux";

// class Counter extends Component {
//   toggleCounterHandler = () => {};

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Счётчик</h1>
//         <div className={classes.value}>{this.props.counter}</div>

//         <div>
//           <button
//             style={{ margin: "4px" }}
//             onClick={this.props.increment}
//           >
//             Inc
//           </button>
//           <button
//             onClick={this.props.decrement}
//           >
//             Dec
//           </button>
//         </div>

//         <button onClick={this.toggleCounterHandler}>Спрятать / Показать</button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: "inc" }),
//     decrement: () => dispatch({ type: "dec" }),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
