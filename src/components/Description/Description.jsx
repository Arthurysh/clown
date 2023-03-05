import classes from "./Description.module.scss";

function Description(props) {
  return (
    <div className={classes.desc_block}>
      <p className={props.className}>{props.text}</p>
    </div>
  );
}

export default Description;
