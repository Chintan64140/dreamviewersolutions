import React from "react";
import styles from "./SkillsCircles.module.css";

const skills = [
  { name: "HTML", value: 85 },
  { name: "CSS", value: 57 },
  { name: "JS", value: 30 },
];

export default function SkillsCircles() {
  return (
    <div className={styles.container}>
      {skills.map((item, i) => (
        <div className={styles.box} key={i}>
          <div className={styles.shadow}></div>

          <div className={styles.content}>
            <div
              className={styles.percent}
              data-text={item.name}
              style={{ "--num": item.value }}
            >
              <div className={styles.dot}></div>

              <svg>
                <circle cx="70" cy="70" r="70"></circle>
                <circle cx="70" cy="70" r="70"></circle>
              </svg>
            </div>

            <div className={styles.number}>
              <h2>
                {item.value}
                <span>%</span>
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
