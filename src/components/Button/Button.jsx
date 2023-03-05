import classes from "./Button.module.scss";

function Button(props) {
  return (
    <div className={classes.button_block}>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  );
}

export default Button;
