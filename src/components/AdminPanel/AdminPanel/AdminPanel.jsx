import style from "./styles.module.css";
import SeedDatabase from "../SeedDatabase/SeedDatabase";
import ExportDatabase from "../ExportDatabase/ExportDatabase";
import HousePrice from "../HousePrice/HousePrice";
import InterestRate from "../InterestRate/InterestRate";
import { useState } from "react";

const components = [
  <SeedDatabase />,
  <ExportDatabase />,
  <HousePrice />,
  <InterestRate />,
];

export default function AdminPanel() {
  const [componentIndex, setComponentIndex] = useState(0);
  console.log(components[0]);

  return (
    <div className={style["two-panels-wrap"]}>
      <div className={style["left-panel"]}>
        <ul>
          <li>
            <button
              className={style["admin-action-button"]}
              onClick={() => setComponentIndex(0)}
            >
              Seed Database
            </button>
          </li>
          <li>
            <button
              className={style["admin-action-button"]}
              onClick={() => setComponentIndex(1)}
            >
              Export Database
            </button>
          </li>
          <li>
            <button
              className={style["admin-action-button"]}
              onClick={() => setComponentIndex(2)}
            >
              House Price
            </button>
          </li>
          <li>
            <button
              className={style["admin-action-button"]}
              onClick={() => setComponentIndex(3)}
            >
              Interest Rate
            </button>
          </li>
        </ul>
      </div>
      <div className={style["right-panel"]}>{components[componentIndex]}</div>
    </div>
  );
}
