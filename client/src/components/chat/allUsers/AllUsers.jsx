import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import axios from "../../../axios";

const AllUsers = () => {
  const { roomId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [openButton, setOpenButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // All user instead of members in room
  useEffect(() => {
    setLoading(true);

    const getAllUsers = async () =>
      await axios.post(
        "/users/allusers",
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

    setLoading(false);
  }, []);

  // Add user in room
  const addUser = async (userId) => {
    await axios
      .post(
        "/users/addUser",
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
      {loading ? (
        <h2 value="">Loading....</h2>
      ) : (
        users.map((user) => (
          <>
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
          </>
        ))
      )}
    </div>
  );
};

export default AllUsers;
