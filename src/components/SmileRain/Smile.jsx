import React, { useEffect, useState} from "react";
import { makeStyles, withWidth } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import "./smile.scss";
import "./SmileStyles.css";



export const Smile = ({ id, phrase, duration, sound, left, width }) => {

  const useStyles = makeStyles((theme) => ({
    smileObj: {
      zIndex: 99,
      position: "absolute",
      maxHeight: "100%",
      textAlign: "center",
      fontFamily: "RobotoBold",
      textTransform: "uppercase",
      padding: '0px',
      cursor: "pointer",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-start",
      flexWrap:'nowrap',
      '& img':{
        maxWidth: width === "xs"
        ? 18
        : width === "sm"
        ? 21
        : width === "md"
        ? 22
        : 23,
      },
    },
  }));

  const classes = useStyles();
  //Audio
  const [audioFlag, setAudioFlag] = useState(true);

  //inProp CSSTransition
  const [inProp, setInProp] = useState(false);

  //Show Message
  const [showMessage, setShowMessage] = useState(true);
  //Пробег по всем смайлам и назначение им скорости анимации
  useEffect(() => {
    document
      .querySelector(`.smile${id}`)
      .style.setProperty("--duration", duration + "s");
  }, []);

  // За 0.01 секунду до окончания анимации все
  //флаги приходят в норму, чтобы снова адекватн опоказать фразу
  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage(true);
      setAudioFlag(true);
      setInProp(false);
    }, duration * 1000 - 1);
    return () => clearInterval(interval);
  }, []);

  //При клике на фразу происходит исчезновение и звук щелчка
  const smileHandler = () => {
    setInProp(true);
    if (audioFlag) {
      sound.play();
      setAudioFlag(false);
    }
  };

  return (
    <CSSTransition
      timeout={300}
      appear={true}
      classNames="alert"
      in={inProp}
      onEntered={() => setShowMessage(false)}
    >
      <div
        onClick={smileHandler}
        duration={duration}
        className={`${classes.smileObj} smile webkit smile${id} objAf`}
        style={{
          left: `${left}%`,
          width: "min-content",

          color: '#f9b942',
          fontSize:
            width === "xs"
              ? 18
              : width === "sm"
              ? 21
              : width === "md"
              ? 22
              : 23,
        }}
      >
        {showMessage ? phrase : ""}
      </div>
    </CSSTransition>
  );
};

export default withWidth()(Smile);
