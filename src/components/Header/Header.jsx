import classes from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/reducers/userSlice";
import logo from "../../assets/images/logo.png";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
function Header() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);

  return (
    <header>
      <div className={classes.logo_block}>
        <img src={logo} alt="logo" />
      </div>
      <div className={classes.info_block}>
        <div className={classes.user_info}>
          <p>
            {t("headers.yourName")} <span>{user.name}</span>
          </p>
          <p>
            {t("headers.yourDeposit")} <span>{user.deposit}</span>
          </p>
          <p>
            {t("headers.yourBalance")} <span>{user.balance}</span>
          </p>
        </div>
        <div className={classes.right_side}>
          <LanguageSwitcher className={classes.switcher}/>
          <Button
            onClick={() => dispatch(logOut())}
            text={t("headers.button")}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
