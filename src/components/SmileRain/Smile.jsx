import React, { useEffect, useState } from "react";
import { makeStyles, withWidth } from "@material-ui/core";
import "./smile.css";

export const Smile = ({ id, phrase, duration, sound, left, width }) => {

  const useStyles = makeStyles((theme) => ({
    smileObj: {
      willChange: 'transform, opacity, top',
      zIndex: 99,
      position: "absolute",
      fontFamily: "RobotoBold",
      textTransform: "uppercase",
      cursor: "pointer",
      display: "flex",
      alignItems: "flex-end",
      '& img': {
        width: width === "xs"
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
  //Пробег по всем смайлам и назначение им скорости анимации
  useEffect(() => {
    // document
    //   .querySelector(`.smile${id}`)
    //   .style.setProperty("--duration", duration + "s");

    const smileCont = document.querySelector(`.smile${id}`);
    console.log(smileCont.style.top)


    setInterval(() => {
      let top = smileCont.style.top.split('%')[0];
      smileCont.style.top = `${top - duration * 0.01}%`;
      if (top < -25) {
        setAudioFlag(true);
        smileCont.style.opacity = '1';
        smileCont.style.transform = 'scale(1)';
        smileCont.style.top = '115%';
      }
    }, 5)
  }, [duration,id]);

  //При клике на фразу происходит исчезновение и звук щелчка
  const smileHandler = (e) => {
    if (audioFlag) {
      e.target.style.opacity = '0'
      e.target.style.transform = 'scale(1.3)'
      sound.play();
      setAudioFlag(false);
    }
  };

  return (
    <div
      onClick={smileHandler}
      className={`${classes.smileObj} smile smile${id}`}
      style={{
        left: `${left}%`,
        top: `110%`,
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
      {phrase}
    </div>
  );
};

export default withWidth()(Smile);
