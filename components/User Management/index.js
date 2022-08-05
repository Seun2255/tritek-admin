import Image from "next/image";
import styles from "../../styles/components/User Management/userManagement.module.css";
import logo from "../../assets/logo.png";
import email from "../../assets/icons/email.svg";
import { useState } from "react";
import UserProfileForm from "./user-profile-form";
import Users from "./users";
import UserGroups from "./userGroups";
import ChangeEmail from "./changeEmail";
import Permissions from "./permissions";
import ChangePassword from "./changePassword";

export default function UserManagement(props) {
  const { form, data, employees } = props;
  return (
    <div className={styles.container}>
      {form === "profile" && <UserProfileForm />}
      {form === "edit" && <Users data={data} />}
      {form === "user groups" && <UserGroups data={employees} />}
      {form === "change email" && <ChangeEmail />}
      {form === "change password" && <ChangePassword />}
      {form === "permissions" && <Permissions />}
    </div>
  );
}
