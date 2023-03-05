import classes from "./Title.module.scss";

function Title(props) {
  return (
    <div className={classes.title_block}>
      <h2>{props.text}</h2>
    </div>
  );
}

export default Title;
