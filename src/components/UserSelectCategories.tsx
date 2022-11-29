import React, { useState } from "react";
import User from "../modules/user";
import { subjectHeadingsList } from "../data/subjectHeadingsList";

const UserSelectCategories = () => {
  console.log(User.getUserSettings());

  //const [userCategories, setUserCategories] = useState(userCats());

  return (
    <div className="user-select-categories">
      <h2>Choose your categories</h2>
      <p>Choose the categories you are interested in</p>
    </div>
  );
};

export default UserSelectCategories;

/*
 <div className="user-select-categories-list">
        {subjectHeadingsList.map((category) => {
          return (
            <div className="user-select-categories-item">
              <input
                type="checkbox"
                id={category}
                name={category}
                value={category}
                checked={userCategories.includes(category)}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          );
        })}
      </div>
      */
