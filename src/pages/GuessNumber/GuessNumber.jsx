import classes from "./GuessNumber.module.scss";
import Title from "../../components/Title/Title";
import Description from "../../components/Description/Description"
import { useDispatch, useSelector } from "react-redux";
import { guessNumber, addBet } from "../../store/reducers/userSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function GuessNumber() {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const randNumberResult = useSelector((state) => state.user.randNumberResult);
    const [changeNumber, setChangeNumber] = useState(0);
    const [resultClass, setResultClass] = useState("");
    const [chosenNumber, setChosenNumber] = useState("");
    const [isActive, setIsActive] = useState(false);

    function selectNumber(selectedNum) {
        if(!isActive){
            setIsActive(true);
            setResultClass("");
            setChosenNumber(selectedNum);
            dispatch(addBet());
            setTimeout(() => {
                dispatch(guessNumber({selectedNum}));
                setChangeNumber(changeNumber + 1);
            }, 2000)
        }
    }
    useEffect(() => {
        if(changeNumber > 0){
            randNumberResult === chosenNumber ? setResultClass(classes.win) : setResultClass(classes.lose);
            setChosenNumber("");
            setIsActive(false);
        }
    }, [changeNumber])   
    return(
        <div className={classes.container}>
            <Title text={t("guessNumber.title")}/>
            <div className={classes.guess_number}>
                <div className={classes.block_result}>
                    <span className={`${classes.number} ${resultClass}`}>{randNumberResult}</span>
                </div>
                <div className={classes.block_selection}>
                    <h3>{t("guessNumber.textNumber")}</h3>
                    <div className={classes.numbers}>
                    <div className={`${classes.number_item} ${chosenNumber === 1 ? classes.active : ""}`} onClick={() => selectNumber(1)}>1</div>
                    <div className={`${classes.number_item} ${chosenNumber === 2 ? classes.active : ""}`} onClick={() => selectNumber(2)}>2</div>
                    <div className={`${classes.number_item} ${chosenNumber === 3 ? classes.active : ""}`} onClick={() => selectNumber(3)}>3</div>
                    <div className={`${classes.number_item} ${chosenNumber === 4 ? classes.active : ""}`} onClick={() => selectNumber(4)}>4</div>
                    <div className={`${classes.number_item} ${chosenNumber === 5 ? classes.active : ""}`} onClick={() => selectNumber(5)}>5</div>
                    <div className={`${classes.number_item} ${chosenNumber === 6 ? classes.active : ""}`} onClick={() => selectNumber(6)}>6</div>
                    <div className={`${classes.number_item} ${chosenNumber === 7 ? classes.active : ""}`} onClick={() => selectNumber(7)}>7</div>
                    <div className={`${classes.number_item} ${chosenNumber === 8 ? classes.active : ""}`} onClick={() => selectNumber(8)}>8</div>
                    <div className={`${classes.number_item} ${chosenNumber === 9 ? classes.active : ""}`} onClick={() => selectNumber(9)}>9</div>
                    <div className={`${classes.number_item} ${chosenNumber === 10 ? classes.active : ""}`} onClick={() => selectNumber(10)}>10</div>
                    </div>
                </div>
            </div>
            <Description className={classes.desc} text={t("guessNumber.description")}/>
        </div>
    )
}

export default GuessNumber;