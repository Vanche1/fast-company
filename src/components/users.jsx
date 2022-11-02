import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  console.log(api.users.fetchAll());

  const getBadgeClasses = (quality) => {
    let classes = "badge m-1 bg-";
    classes += quality.color;
    return classes;
  };

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user !== id));
  };

  const renderPhrase = (number) => {
    if (
      (number.toString().includes("2") && !number.toString().includes("12")) ||
      (number.toString().includes("3") && !number.toString().includes("13")) ||
      (number.toString().includes("4") && !number.toString().includes("14"))
    ) {
      return number + " человека тусанут с тобой сегодня";
    } else return number + " человек тусанет с тобой сегодня";
  };

  const renderUsers = () => {
    return (
      users.length !== 0 &&
      users.map((user) => {
        return (
          <tr>
            <td>{user.name}</td>
            <td>
              {user.qualities.map((quality) => {
                return (
                  <span className={getBadgeClasses(quality)}>
                    {quality.name}
                  </span>
                );
              })}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate + "/5"}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(user)}
              >
                delete
              </button>
            </td>
          </tr>
        );
      })
    );
  };

  if (users.length !== 0) {
    return (
      <>
        <h2>
          <span className="badge bg-primary m-2">
            {renderPhrase(users.length)}
          </span>
        </h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      </>
    );
  }

  return (
    <h2>
      <span className="badge bg-danger m-2">Никто с тобой не тусанет</span>
    </h2>
  );
};

export default Users;
