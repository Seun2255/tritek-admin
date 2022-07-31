import Image from "next/image";
import styles from "../../styles/components/User Options/addImage.module.css";
import { useState } from "react";
import profile from "../../assets/icons/profile.svg";
import { editEmployee, getUserData } from "../../pages/api/API";
import { Web3Storage } from "web3.storage";
import { updateProfile } from "firebase/auth";

import linkCreator from "../../utils/linkCreator";

export default function AddImage(props) {
  const { user } = props;
  const [view, setView] = useState("home");

  const token = process.env.NEXT_PUBLIC_STORAGE_TOKEN;
  const client = new Web3Storage({ token });

  const handleFileUpload = async (event) => {
    let file = event.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        setView("error");
        setTimeout(() => {
          setView("home");
        }, 2000);
      } else {
        setView("uploading");
        const cid = await client.put(event.target.files);
        const url = linkCreator(cid, file.name);
        updateProfile(user, { photoURL: url }).then(() => {
          getUserData(user.email).then((employeeData) => {
            console.log(employeeData);
            var employee = employeeData;
            employee["photoURL"] = url;
            editEmployee(
              employee,
              employeeData["Emails"],
              employeeData["Phone number"]
            ).then(() => {
              setView("succes");
              setTimeout(() => {
                setView("home");
              }, 2000);
            });
          });
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      {view === "error" && (
        <h2 className={styles.succes__text} style={{ color: "red" }}>
          File can&#39;t be larger than 1mb!
        </h2>
      )}
      {view === "succes" && (
        <h2 className={styles.succes__text}>Profile Pic Changed</h2>
      )}
      {view === "uploading" && (
        <h2 className={styles.succes__text}>Uploading...</h2>
      )}
      {view === "home" && (
        <div className={styles.pic__box}>
          <div className={styles.profile__pic}>
            <img
              alt="profile pic"
              src={user.photoURL || profile}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <label htmlFor="upload" className={styles.button}>
            Change
          </label>
          <input
            type="file"
            id="upload"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <div className={styles.warning}>
            Note: image size should be less than 1mb
          </div>
        </div>
      )}
    </div>
  );
}
