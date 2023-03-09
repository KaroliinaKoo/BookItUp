import React, { useState, useContext, useRef } from "react";
import { subjectHeadingsList } from "../../data/subjectHeadingsList";
import UserContext from "../../context/UserContext";
import AlertContext from "../../context/AlertContext";
import { FaTimes, FaTrash } from "react-icons/fa";

const UserSelectCategories = () => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  if (!userContext || !alertContext) {
    throw new Error("context not found");
  }

  const { user, setUserData, getUserData } = userContext;
  const { showAlert } = alertContext;

  const [selectedUserCategories, setSelectedUserCategories] = useState(
    getUserData().categories || [""]
  );

  const uneditedUserCategories = useRef(selectedUserCategories);

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
    uneditedUserCategories.current = selectedUserCategories;
  };

  const handleSelect = (selectedCategory: string) => {
    console.log(selectedUserCategories);
    setSelectedUserCategories([...selectedUserCategories, selectedCategory]);
  };

  const handleRemove = (categoryToRemove: string) => {
    setSelectedUserCategories(
      selectedUserCategories.filter((category) => category !== categoryToRemove)
    );
  };

  return (
    <form className="user-select-categories" onSubmit={handleSubmit}>
      <h3>Categories</h3>
      <fieldset className="user-select-categories__container">
        <legend>Select the book categories you are interested in.</legend>
        <ul className="user-select-categories__list__options">
          {subjectHeadingsList
            .map((category) => (
              <li key={category}>
                <button
                  value={category}
                  className={
                    selectedUserCategories.includes(category)
                      ? "current"
                      : "options"
                  }
                  type="button"
                  onClick={() => {
                    selectedUserCategories.includes(category)
                      ? handleRemove(category)
                      : handleSelect(category);
                  }}
                >
                  {category.slice(0, 1).toUpperCase() + category.slice(1)}
                  {selectedUserCategories.includes(category) && (
                    <FaTimes
                      aria-label={`Remove ${category}`}
                      className="user-select-categories__list__options__remove"
                    />
                  )}
                </button>
              </li>
            ))
            .sort()}
        </ul>
        <button
          className="btn-neutral outlined x-small"
          type="button"
          onClick={() => setSelectedUserCategories([])}
        >
          <FaTrash /> Clear all
        </button>
      </fieldset>
      <div className="btn-container">
        <button
          type="button"
          className="btn-secondary small outlined"
          onClick={() =>
            setSelectedUserCategories(uneditedUserCategories.current)
          }
          disabled={
            JSON.stringify(selectedUserCategories) ===
            JSON.stringify(uneditedUserCategories.current)
          }
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary small"
          disabled={
            JSON.stringify(selectedUserCategories) ===
            JSON.stringify(uneditedUserCategories.current)
          }
        >
          Save Settings
        </button>
      </div>
    </form>
  );
};

export default UserSelectCategories;
