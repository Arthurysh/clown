import { useEffect, useState } from "react";
import classes from "./FlipCoin.module.scss";
import Title from "../../components/Title/Title";
import { useDispatch, useSelector } from "react-redux";
import { flipCoin } from "../../store/reducers/userSlice";
import headsCoinImg from "../../assets/images/front-coin.svg";
import tailsCoinImg from "../../assets/images/back-coin.svg";
import Description from "../../components/Description/Description";
import { useTranslation } from "react-i18next";

function FlipCoin() {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [isFlipping, setIsFlipping] = useState(false);
  const [resultClass, setResultClass] = useState("");
  const [flipCoinActive, setFlipCoinActive] = useState(0);
  const [chosenSide, setChosenSide] = useState("");
  const [isActive, setIsActive] = useState(false);
  const result = useSelector((state) => state.user.flipCoinResult);

  function  handleClick(options) {
    if (!isFlipping && !isActive) {
       setIsActive(true);
       setChosenSide(options);
       setResultClass("");
       setIsFlipping(true);
       setTimeout(() => { 
          setIsFlipping(false);
          setTimeout(() => {
          dispatch(flipCoin({ options }));
          setFlipCoinActive(flipCoinActive + 1);
          }, 1350)
      }, 2000);
    }
  }
  useEffect(() => {
    if(flipCoinActive > 0 && isActive){
      result === chosenSide ? setResultClass(classes.win) : setResultClass(classes.lose);
      setIsActive(false);
    }
  }, [flipCoinActive])
 
  const coinClass = isFlipping ? `${classes.coin} ${classes.flipping}` : classes.coin;
  
  return (
    <div className={classes.container}>
      <Title text={t("flipCoin.title")} />
      <div className={classes.coin_block}>
        <div className={`${coinClass} ${resultClass}`}>
          <div
            className={`${classes.side} ${classes.front}`}
            style={{
              transform:
                result === "tails" ? "rotateX(0deg)" : " rotateX(180deg)",
            }}
          >
            <img src={tailsCoinImg} alt="front coin" />
          </div>
          <div
            className={`${classes.side} ${classes.back}`}
            style={{
              transform:
                result === "tails" ? "rotateX(180deg)" : " rotateX(0deg)",
            }}
          >
            <img src={headsCoinImg} alt="back coin" />
          </div>
        </div>
        <div className={classes.option_block}>
          <h3 className={classes.title}>{t("flipCoin.textCoin")}</h3>
          <div
            className={classes.option_tails}
            onClick={() => handleClick("tails")}
          >
            <img src={tailsCoinImg} alt="front coin" />
          </div>
          <div
            className={classes.option_heads}
            onClick={() => handleClick("heads")}
          >
            <img src={headsCoinImg} alt="back coin" />
          </div>
        </div>
      </div>
      <Description
        className={classes.desc}
        text={t("flipCoin.description")}
      />
    </div>
  );
}

export default FlipCoin;
