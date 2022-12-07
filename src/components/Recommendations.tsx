import React, { useEffect, useState, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { truncate } from "../utils/truncate";
import VolumeDetails from "./VolumeDetails";
import { formatVolumeDataList } from "../queries/utils/formatVolumeData";
import { subjectHeadingsList } from "../data/subjectHeadingsList";
import UserContext from "../context/UserContext";

const Recommendations = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext not found");
  }
  const { user } = context;

  const randomizeCategories = () => {
    const randomizedCategories = [];
    const defaultCategories = subjectHeadingsList;

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * defaultCategories.length);
      randomizedCategories.push(defaultCategories[randomIndex]);
      defaultCategories.splice(randomIndex, 1);
    }
    setCategoriesList(randomizedCategories);
  };

  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [recommendations, setRecommendations] = useState<any>();
  const [listIsLoading, setListIsLoading] = useState(true);
  const [isCurrentVolume, setIsCurrentVolume] = useState(false);

  useEffect(() => {
    if (user.categories) {
      setCategoriesList(user.categories);
      setCurrentCategory(categoriesList[0]);
      return;
    }
    randomizeCategories();
    setCurrentCategory(categoriesList[0]);
  }, []);

  useEffect(() => {
    if (currentCategory === "") {
      return;
    }
    (async (searchCategory: string) => {
      setListIsLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchCategory}+subject:${searchCategory}&filter=ebooks&orderBy=newest&startIndex=0&langRestrict=en&maxResults=8&printType=BOOKS`
        );
        const data = await response.json();
        const recommendationItem = {
          [searchCategory]: formatVolumeDataList(data.items),
        };
        setRecommendations((prev: any) => ({
          ...prev,
          ...recommendationItem,
        }));
      } catch (error: any) {
        console.log(error.message);
      }
      setListIsLoading(false);
    })(currentCategory);
  }, [currentCategory]);

  return (
    <>
      {isCurrentVolume && (
        <VolumeDetails
          volumeData={recommendations[currentCategory].find(
            (item: any) => item.id === isCurrentVolume
          )}
          handleClose={() => setIsCurrentVolume(false)}
        />
      )}

      <div className="volume-recommendations">
        <div className="volume-recommendations-header">
          <h2>Find your new favorite book</h2>
          {recommendations && (
            <nav className="volume-recommendations-nav">
              <button
                className="btn-icon previous"
                onClick={() => {
                  const index = categoriesList.indexOf(currentCategory);
                  if (index > 0) {
                    setCurrentCategory(categoriesList[index - 1]);
                  }
                }}
                disabled={currentCategory === categoriesList[0]}
              >
                <FaChevronLeft />
              </button>
              <h3>{currentCategory}</h3>
              <button
                className="btn-icon next"
                onClick={() => {
                  const index = categoriesList.indexOf(currentCategory);
                  if (index < categoriesList.length - 1) {
                    setCurrentCategory(categoriesList[index + 1]);
                  }
                }}
                disabled={
                  currentCategory === categoriesList[categoriesList.length - 1]
                }
              >
                <FaChevronRight />
              </button>
            </nav>
          )}
        </div>
        <div className="volume-recommendations-container">
          {listIsLoading ? (
            <div
              className="spinner"
              role="status"
              aria-label="Loading results"
            />
          ) : (
            <ul>
              {recommendations &&
                recommendations[currentCategory].map((volume: any) => (
                  <li className="recommendation-card" key={volume.id}>
                    <button
                      name={`volume-cover ${volume.id}`}
                      onClick={() => setIsCurrentVolume(volume.id)}
                    >
                      <img
                        src={volume.imageLinks.thumbnail}
                        alt={volume.title}
                      />
                    </button>
                    <p className="recommendation-card-title">
                      {truncate(volume.title, 30)}
                    </p>
                    <p className="recommendation-card-author">
                      {volume.authors[0]}
                    </p>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Recommendations;
