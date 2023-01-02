import React, { useState, useContext, useLayoutEffect } from "react";
import { subjectHeadingsList } from "../../data/subjectHeadingsList";
import UserContext from "../../context/UserContext";
import AlertContext from "../../context/AlertContext";

const UserSelectCategories = () => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  if (!userContext || !alertContext) {
    throw new Error("context not found");
  }

  const { user, setUserData } = userContext;
  const { showAlert } = alertContext;
  const { categories } = user;

  const [selectedUserCategories, setSelectedUserCategories] = useState([""]);

  useLayoutEffect(() => {
    setSelectedUserCategories(categories);
  }, [categories]);

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
          return response.json();
        } else {
          throw new Error("Status Error: " + response.status);
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUserData(data);
        showAlert("success", "Settings saved successfully!");
      })
      .catch((error) => {
        showAlert("error", error.message || "Something went wrong.");
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
      <button type="submit" className="btn-primary">
        Save Settings
      </button>
    </form>
  );
};

export default UserSelectCategories;
