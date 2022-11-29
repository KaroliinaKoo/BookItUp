import React, { useState } from "react";
import User from "../modules/user";
import { subjectHeadingsList } from "../data/subjectHeadingsList";

const UserSelectCategories = () => {
  User.setUserSettings({ categories: ["cooking", "nature", "business"] });

  console.log(User.getUserCategories());
  const [selectedUserCategories, setSelectedUserCategories] = useState(
    User.getUserCategories()
  );

  return (
    <div className="user-select-categories">
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
            User.setUserSettings({ categories: selectedUserCategories });
          }}
        >
          Save categories
        </button>
      </div>
    </div>
  );
};

export default UserSelectCategories;
