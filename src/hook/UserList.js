import { Card, Table, Button } from "antd";
import React from "react";

function UserList(props) {
  const columns = [
    {
      title: "Mã SV",
      dataIndex: "id",
    },

    {
      title: "Họ Tên",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số ĐT",
      dataIndex: "phone",
    },
    {
      title: "",
      key: "action",
      render: (_, user) => {
        return (
          <>
            <Button onClick={() => props.getUpdateUser(user)} type="primary">
              Chỉnh sửa
            </Button>
            <Button onClick={() => props.deleteUser(user.id)}>Xoá</Button>
          </>
        );
      },
    },
  ];

  return (
    <Table
      dataSource={props.users.map((user) => {
        return { ...user, key: user.id };
      })}
      columns={columns}
    ></Table>
  );
}

export default UserList;
