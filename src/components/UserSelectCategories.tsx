import React, { useState } from "react";
import User from "../modules/user";
import { subjectHeadingsList } from "../data/subjectHeadingsList";

const UserSelectCategories = () => {
  console.log(User.getSettings());

  const userSettings = User.getSettings();
  const [selectedUserCategories, setSelectedUserCategories] = useState(
    userSettings.categories
  );

  return (
    <div className="input-group user-select-categories">
      <h2>Choose your categories</h2>
      <p>Choose the categories you are interested in</p>
      <div className="user-select-categories__list">
        {subjectHeadingsList.map((category) => (
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
        ))}
        <button
          onClick={() => {
            console.log(selectedUserCategories);
          }}
        >
          Save categories
        </button>
      </div>
    </div>
  );
};

export default UserSelectCategories;
