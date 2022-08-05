import app from "../../firebase/firebaseApp";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
  applyActionCode,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { async } from "@firebase/util";
import { timeStamp } from "../../utils/dateFunctions";

var generator = require("generate-password");

const db = getFirestore(app);
const auth = getAuth(app);

const signUserIn = async (email, password) => {
  var result;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Signed IN");
      // return user;
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Not signed in", errorMessage);
      return false;
    });
};

const signUp = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      sendEmailVerification(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

const confirmSignUp = async (code) => {
  applyActionCode(auth, code).then(() => {
    console.log("Your now verified");
  });
};

const signIn = async (email, password) => {
  const result = await signUserIn(email, password);
  return result;
};

const signUserOut = () => {
  signOut(auth)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Signed Out");
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Not signed out", errorMessage);
      return false;
    });
};

const resetPassword = async (email) => {
  sendPasswordResetEmail(auth, email);
};

const resetPasswordConfirmation = async (password, code) => {
  confirmPasswordReset(auth, code, password)
    .then(() => {
      console.log("Succesfully reset password");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("password reset failed");
      console.log(errorCode, errorMessage);
    });
};

const addQuery = async (query) => {
  var data = {};
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data().data;
  });
  const queries = data["queries"];
  var time = new Date();
  var formattedQuery = query;
  formattedQuery.created = timeStamp(time);
  queries.push(formattedQuery);
  await setDoc(doc(db, "data", "queries"), { data: queries });
};

const editQuery = async (query, ticket) => {
  var data = {};
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data().data;
  });
  var queries = data["queries"];
  queries = queries.map((item) => {
    if (item["Query Number"] === ticket) {
      return query;
    } else {
      return item;
    }
  });
  await setDoc(doc(db, "data", "queries"), { data: queries });
};

const addEmployee = async (employee) => {
  var data = {};
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data().data);
    data[doc.id] = doc.data().data;
  });
  var employees = data["employees"];
  employees.push(employee);
  await setDoc(doc(db, "data", "employees"), { data: employees });
};

const confirmStatus = async (email) => {
  var data = {};
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data().data;
  });
  var employees = data["employees"];
  var exists = false;
  employees.map((item) => {
    if (item["Emails"] === email) {
      exists = true;
    }
  });
  if (!exists) {
    var ticket = generator.generate({
      length: 8,
      numbers: true,
    });
    var employee = {
      "First Name": "",
      "Last Name": "",
      "Phone number": "",
      "Landline Phone": "",
      Emails: email,
      "Street Address 1": "",
      "Street Address 2": "",
      City: "",
      Zip: "",
      County: "",
      Country: "",
      Comments: "",
      Roles: "Admin Staff",
      "Employee Number": ticket,
    };
    addEmployee(employee);
  }
};

const editEmployee = async (employee, email, number) => {
  var data = {};
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data().data);
    data[doc.id] = doc.data().data;
  });
  var employees = data["employees"];
  employees = employees.map((item) => {
    if (item["Emails"] === email && item["Phone number"] === number) {
      return employee;
    } else {
      return item;
    }
  });
  await setDoc(doc(db, "data", "employees"), { data: employees });
};

const getUserData = async (email) => {
  var data = {};
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data().data;
  });
  var employees = data["employees"];
  var user = {};
  employees.map((item) => {
    if (item["Emails"] === email) {
      user = item;
    }
  });
  return user;
};

const removeEmployee = async (email, number) => {
  var data = {};
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data().data);
    data[doc.id] = doc.data().data;
  });
  var employees = data["employees"];
  const check = (item) => {
    if (item["Emails"] === email && item["Phone number"] === number) {
      return false;
    } else {
      return true;
    }
  };
  employees = employees.filter(check);
  await setDoc(doc(db, "data", "employees"), { data: employees });
};

const getData = async () => {
  var data = {};
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data().data;
  });
  return data;
};

const getRoles = async () => {
  var data = {};
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });
  var roles = data["Roles"];
  return roles.Roles;
};

const addRoles = async (roles) => {
  var data = {};
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });
  data["Roles"] = roles;
  await setDoc(doc(db, "data", "Roles"), { Roles: data["Roles"] });
  getData().then(async (fireBaseDoc) => {
    var users = fireBaseDoc.employees;
    var keys = Object.keys(data["Roles"]);
    var temp = { ...data["Roles"] };
    keys.map((group) => {
      temp[group].map((groupUser) => {
        users.map((user) => {
          if (user.Emails === groupUser.Emails) {
            user["Roles"] = group;
            return user;
          }
        });
      });
    });
    await setDoc(doc(db, "data", "employees"), { data: users });
  });
};

const getMails = async () => {
  const docRef = doc(db, "users", "data");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().emails;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

const setPermissions = async (permissions) => {
  await setDoc(doc(db, "data", "permissions"), permissions);
};

const getPermissions = async () => {
  var data = {};
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });
  var permissions = data["permissions"];
  return permissions;
};

const changeEmail = async (email, password, newEmail) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateEmail(user, newEmail).then(() => console.log("Email Changed"));
      return true;
    })
    .catch((error) => {
      return false;
    });
};

const changePassword = async (email, password, newPassword) => {
  var state = "null";
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updatePassword(user, newPassword).then(() => {
        console.log("Password Changed");
        state = "password changed";
      });
    })
    .catch((error) => {
      console.log("Failed");
      state = "fail";
    });
  return state;
};

export {
  signIn,
  signUserOut,
  auth,
  db,
  resetPassword,
  resetPasswordConfirmation,
  addQuery,
  addEmployee,
  getData,
  getMails,
  getRoles,
  editEmployee,
  editQuery,
  removeEmployee,
  addRoles,
  signUp,
  confirmSignUp,
  setPermissions,
  getPermissions,
  changeEmail,
  changePassword,
  confirmStatus,
  getUserData,
};
