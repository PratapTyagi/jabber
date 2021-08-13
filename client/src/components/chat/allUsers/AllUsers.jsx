import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import axios from "axios";

import "./AllUsers.css";
const AllUsers = () => {
  const { roomId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [openButton, setOpenButton] = useState(false);
  const [users, setUsers] = useState([]);

  // All user instead of members in room
  useEffect(() => {
    const getAllUsers = async () =>
      await axios.post(
        "/api/v1/users/allusers",
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
    getAllUsers()
      .then(({ data }) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  // Add user in room
  const addUser = async (userId) => {
    await axios
      .post(
        "/api/v1/users/addUser",
        {
          roomId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      )
      .then((res) => setOpenButton(true))
      .catch((err) => console.log(err));
  };

  return (
    <div className="chat">
      <h2>All Users</h2>
      <div className="chat__mid">
        {users.map((user) => (
          <>
            <div className="chat__mid__inner">
              <div className="addUsers__item__left">
                <Avatar
                  src={user.pic}
                  alt="Dp"
                  className="addUsers__item__avatar"
                />
                <div className="center">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
              {!openButton ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addUser(user._id);
                  }}
                >
                  Add
                </button>
              ) : null}
            </div>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
