import style from "./styles.module.css";
import JsonSeedInput from "../../FileInput/JsonSeedInput";
import XmlSeedInput from "../../FileInput/XmlSeedInput";

export default function SeedDatabase() {
  return (
    <div className={style["seed-database-wrap"]}>
      <JsonSeedInput />
      <XmlSeedInput />
    </div>
  );
}
