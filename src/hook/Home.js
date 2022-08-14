import React, { useState } from "react";
import Form from "./Form";
import UserList from "./UserList";
import styles from "./style.module.css";

function Home() {
  const [userList, setUserList] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  function createUser(user) {
    const foundUser = userList.find((item) => {
      return item.id === user.id;
    });

    if (foundUser) return alert("Mã SV đã tồn tại !");

    setUserList([...userList, user]);
  }

  function deleteUser(id) {
    const cloneUserList = [...userList];
    const index = cloneUserList.findIndex((user) => user.id === id);

    if (index === -1) return;
    cloneUserList.splice(index, 1);

    setUserList(cloneUserList);
  }

  function getUpdateUser(user) {
    setSelectedUser(user);
  }

  function updateUser(user) {
    const cloneUserList = [...userList];
    const index = cloneUserList.findIndex((item) => item.id === user.id);
    if (index === -1) return;
    cloneUserList[index] = user;

    setUserList(cloneUserList);
    setSelectedUser(null);
  }

  return (
    <div className="container">
      <Form
        updateUser={updateUser}
        selectedUser={selectedUser}
        createUser={createUser}
      />
      <UserList
        getUpdateUser={getUpdateUser}
        deleteUser={deleteUser}
        users={userList}
      />
    </div>
  );
}

export default Home;
