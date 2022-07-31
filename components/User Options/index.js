import Image from "next/image";
import styles from "../../styles/components/User Options/index.module.css";
import { useState, useContext } from "react";
import MySettings from "./mySettings";
import AddImage from "./addImage";
import { Context } from "../../context";

export default function UserOptions(props) {
  const { state, dispatch } = useContext(Context);

  const { option } = props;
  return (
    <div className={styles.container}>
      {option === "My Settings" && <MySettings />}
      {option === "Add Image" && <AddImage user={state.user} />}
    </div>
  );
}
