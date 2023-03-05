import { useSelector } from "react-redux";
import classes from "./SideBar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";


function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslation();
  const selectedGame = location.pathname.slice(1);
  const gameHistory = useSelector((state) => state.user.gameHistory);

  function filterGameHistory() {
    if (selectedGame === "menu") {
      return gameHistory;
    } else if(selectedGame === "flipCoin"){
      return gameHistory.filter((item) => item.game === "Flip Coin");
    } else if(selectedGame === "guessDoor"){
      return gameHistory.filter((item) => item.game === "Guess Door");
    }
  }

  const filteredGameHistory = filterGameHistory();

  return (
    <div className={classes.sidebar_block}>
      <div className={classes.list_block}>
        <h3>{t("sidebar.title")}</h3>
        {filteredGameHistory.length <= 0 ? <p className={classes.empty}>{t("sidebar.empty")}</p> : "" }
        <ul>
          {filteredGameHistory.map((item, index) => (
            <li key={index}>
              <span
                className={
                  item.game === "Flip Coin"
                    ? classes.flip_coin
                    : classes.guess_door
                }
              >
                {selectedGame === "menu" ? item.game + ": " : ""}
              </span>
              <span
                className={item.result[0] === "+" ? classes.win : classes.loss}
              >
                {item.result}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {selectedGame  !== "menu" ?
      <Button onClick={() => navigate("/menu")} text={t("sidebar.button")}/>
      : ""}
    </div>
  );
}

export default SideBar;
