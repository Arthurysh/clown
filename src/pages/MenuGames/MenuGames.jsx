import classes from "./MenuGames.module.scss";
import flipCoinImg from "../../assets/images/flip-coin.jpeg";
import guessDoorImg from "../../assets/images/guess-door.jpg";
import guessNumberImg from "../../assets/images/guess-number.png";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title/Title";
import Description from "../../components/Description/Description";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";


function MenuGames() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    
    return(
        <div className={classes.main_menu_block}>
            <Title text={t("menuGames.title")}/>
            <div className={classes.games_block}>
                <div className={classes.game_block}>
                    <h3>{t("menuGames.flipCoin")}</h3>
                    <img src={flipCoinImg} alt="flip coin image"/>
                    <Button onClick={() => navigate("/flipCoin")} text={t("menuGames.button")}/>
                </div>
                <div className={classes.game_block}>
                    <h3>{t("menuGames.guessDoor")}</h3>
                    <img src={guessDoorImg} alt="guess door image"/>
                    <Button text={t("menuGames.button")} onClick={() => navigate("/guessDoor")}/>
                </div>
                <div className={classes.game_block}>
                    <h3>{t("menuGames.guessNumber")}</h3>
                    <img src={guessNumberImg} alt="guess number image"/>
                    <Button text={t("menuGames.button")}/>
                </div>
            </div>
            <Description text={t("menuGames.description")}/>
        </div>
    )
}

export default MenuGames;