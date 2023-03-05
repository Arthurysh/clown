import classes from "./LogIn.module.scss";
import logo from "../../assets/images/logo.png";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const {t} = useTranslation();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(t("logIn.nameEmpty"));
  const [nameDirty, setNameDirty] = useState(false);

  const [deposit, setDeposit] = useState("");
  const [depositError, setDepositError] = useState(t("logIn.depositEmpty"));
  const [depositDirty, setDepositDirty] = useState(false);

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (nameError || depositError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, depositError]);

  const depositHandler = (event) => {
    const deposit = event.target.value;
    setDeposit(deposit);
    if (deposit < 100) {
      setDepositError(t("logIn.depositError"));
      if (!deposit) {
        setNameError(t("logIn.depositEmpty"));
      }
    } else {
      setDepositError("");
    }
  };

  const nameHandler = (event) => {
    const name = event.target.value;
    setName(name);
    if (name.length < 2) {
      setNameError(t("logIn.nameError"));
      if (!name) {
        setNameError(t("logIn.nameEmpty"));
      }
    } else {
      setNameError("");
    }
  };

  const registerSubmit = (event) => {
    event.preventDefault();
    if (!formValid) {
      setNameDirty(true);
      setDepositDirty(true);
    } else {
      dispatch(addUser({ name, deposit }));
      navigate("/menu");
    }
  };

  return (
    <div className={classes.login_block}>
      <div className={classes.background_wrapper}>
        <div className={classes.login_form}>
          <LanguageSwitcher />
          <img src={logo} alt="logo" className={classes.logo} />
          <input
            type="text"
            placeholder={t("logIn.placeholderName")}
            name="name"
            value={name}
            onChange={(event) => nameHandler(event)}
            style={{ borderColor: `${nameError && nameDirty && "red"}` }}
          />
          {nameError && nameDirty && (
            <p className={classes.text_error}>{nameError}</p>
          )}
          <input
            type="number"
            placeholder={t("logIn.placeholderDeposit")}
            name="deposit"
            value={deposit}
            onChange={(event) => depositHandler(event)}
            style={{ borderColor: `${depositError && depositDirty && "red"}` }}
          />
          {depositError && depositDirty && (
            <p className={classes.text_error}>{depositError}</p>
          )}
          <button className={classes.btn} onClick={registerSubmit}>
            {t("logIn.button")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
