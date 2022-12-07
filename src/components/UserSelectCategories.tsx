import React, { useState, useContext } from "react";
import { subjectHeadingsList } from "../data/subjectHeadingsList";
import UserContext from "../context/UserContext";

const UserSelectCategories = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext not found");
  }

  const { user, setUserData } = context;

  const userCategories = user.categories;
  const [selectedUserCategories, setSelectedUserCategories] =
    useState(userCategories);

  const updateUserData = async () => {
    let param = {
      categories: selectedUserCategories,
    };

    fetch(`http://localhost:3002/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Categories updated successfully.");
          return response.json();
        } else {
          throw new Error("Status Error: " + response.status);
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateUserData();
  };

  return (
    <form className="user-select-categories" onSubmit={handleSubmit}>
      <h3>Categories</h3>
      <fieldset className="user-select-categories__list">
        <legend>Select the book categories you are interested in.</legend>
        {subjectHeadingsList
          .map((category) => (
            <div className="user-select-categories__list__item" key={category}>
              <input
                type="checkbox"
                id={category}
                name={category}
                value={category}
                checked={selectedUserCategories.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedUserCategories([
                      ...selectedUserCategories,
                      e.target.value,
                    ]);
                  } else {
                    setSelectedUserCategories(
                      selectedUserCategories.filter(
                        (item) => item !== e.target.value
                      )
                    );
                  }
                }}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))
          .sort((a, b) =>
            a.props.children[1].props.children.localeCompare(
              b.props.children[1].props.children
            )
          )}
      </fieldset>
      <button
        type="submit"
        className="btn-primary"
        onClick={() => {
          console.log(selectedUserCategories);
        }}
      >
        Save Settings
      </button>
    </form>
  );
};

export default UserSelectCategories;
