import { useDispatch, useSelector } from "react-redux";
import Description from "../../components/Description/Description";
import Title from "../../components/Title/Title";
import classes from "./GuessDoor.module.scss";
import { guessDoor, addBet } from "../../store/reducers/userSlice";
import { useEffect, useState } from "react";
import doorOneImg from "../../assets/images/door1_dask.svg";
import doorTwoImg from "../../assets/images/door2_dask.svg";
import doorThreeImg from "../../assets/images/door3_dask.svg";
import { useTranslation } from "react-i18next";

function GuessDoor() {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const randDoorResult = useSelector((state) => state.user.randDoorResult);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [selectDoorActive, setSelectDoorActive] = useState(1);

  function selectDoor(doorNumber) {
    if (!isActive) {
      setIsActive(true);
      setSelectedDoor(doorNumber);
      dispatch(addBet());
      setTimeout(() => {
        dispatch(guessDoor({doorNumber}));
        setSelectDoorActive(selectDoorActive + 1);
      }, 2000);
    }
  }

  useEffect(() => {
    if (randDoorResult !== null && isActive) {
      const doors = document.querySelectorAll(`.${classes.border}`);
        doors.forEach((door, index) => {
          if (index === randDoorResult) {
            door.classList.add(classes.win);
          } else {
            door.classList.add(classes.loss);
          }
        });
        setTimeout(() => {
          doors.forEach((door) => {
            door.classList.remove(classes.win, classes.loss);
          });
          setSelectedDoor(null);
          setIsActive(false);
        }, 2000);
    }
  }, [selectDoorActive]);

  return (
    <div className={classes.container}>
      <Title text={t("guessDoor.title")} />
      <div className={classes.guess_door}>
        <h3>{t("guessDoor.textDoor")}</h3>
        <div className={classes.doors_block}>
          <div
            className={`${classes.door_block}`}
            onClick={() => selectDoor(0)}
          >
            <div
              className={`${classes.border} ${
                selectedDoor === 0 ? classes.selected : ""
              }`}
            >
              <img className={classes.door} src={doorOneImg} alt="door"/>
            </div>
          </div>
          <div
            className={`${classes.door_block}`}
            onClick={() => selectDoor(1)}
          >
            <div
              className={`${classes.border} ${
                selectedDoor === 1 ? classes.selected : ""
              }`}
            >
              <img className={classes.door} src={doorTwoImg} alt="door"/>
            </div>
          </div>
          <div
            className={`${classes.door_block}`}
            onClick={() => selectDoor(2)}
          >
            <div
              className={`${classes.border} ${
                selectedDoor === 2 ? classes.selected : ""
              }`}
            >
              <img className={classes.door} src={doorThreeImg} alt="door"/>
            </div>
          </div>
        </div>
      </div>
      <Description
        className={classes.desc}
        text={t("guessDoor.description")}
      />
    </div>
  );
}

export default GuessDoor;
