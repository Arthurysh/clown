import classes from "./LanguageSwitcher.module.scss";
import { useTranslation } from "react-i18next";

function LanguageSwitcher(props) {
  const { i18n } = useTranslation();

  return (
    <select
      className={`${classes.lang_select} ${props.className}`}
      name="language"
      onChange={(e) => i18n.changeLanguage(e.target.value.toLowerCase())}
      value={localStorage.getItem("i18nextLng").toUpperCase()}>
      <option value="UA">UA</option>
      <option value="EN">EN</option>
    </select>
  );
}

export default LanguageSwitcher;
