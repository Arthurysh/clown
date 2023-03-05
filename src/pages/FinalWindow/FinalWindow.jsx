import classes from "./FinalWindow.module.scss";
import Button from "../../components/Button/Button";
import Description from "../../components/Description/Description";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/reducers/userSlice";
import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";


function FinalWindow() {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const { balance, deposit, name } = useSelector((state) => state.user);
    const [descriptionText, setDescriptionText] = useState("");
    useEffect(() => {
        if(balance < deposit * 0.05){
            setDescriptionText(`${name}${t("finalWindow.lossOne")} ${deposit}${t("finalWindow.lossTwo")}`)
        } else if(balance > deposit * 2) {
            setDescriptionText(`${t("finalWindow.winOne")} ${name}${t("finalWindow.winTwo")} ${deposit} ${t("finalWindow.winThree")} ${balance}`)
        }
    })
    return(
        <div className={classes.final_window}>
            <div className={classes.container}>
                <img src={logo} className={classes.logo}/> 
                <Description text={descriptionText} className={classes.desc}/>
                <Button text={t("finalWindow.button")} onClick={() => dispatch(logOut())}/>
             </div>
        </div>
    )
}

export default FinalWindow;