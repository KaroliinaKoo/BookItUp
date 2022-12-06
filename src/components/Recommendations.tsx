import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { truncate } from "../utils/truncate";
import VolumeDetails from "./VolumeDetails";
import User from "../modules/user";
import { formatVolumeDataList } from "../queries/utils/formatVolumeData";
import { subjectHeadingsList } from "../data/subjectHeadingsList";

const Recommendations = () => {
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [recommendations, setRecommendations] = useState<any>({});
  const [listIsLoading, setListIsLoading] = useState(true);
  const [isCurrentVolume, setIsCurrentVolume] = useState(false);

  const getRandomizedCategories = () => {
    const categories = subjectHeadingsList;
    const randomizedCategories = [];

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * categories.length);
      randomizedCategories.push(categories[randomIndex]);
      categories.splice(randomIndex, 1);
    }

    return randomizedCategories;
  };

  useEffect(() => {
    if (categoriesList.length > 0) {
      setCurrentCategory(categoriesList[0]);
    }
    if (User.getCategories()) {
      setCategoriesList(User.getCategories());
    }
    if (!User.getCategories()) {
      const randomizedCategories = getRandomizedCategories();
      setCategoriesList(randomizedCategories);
    }
  }, [categoriesList]);

  useEffect(() => {
    if (currentCategory) {
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
    }
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
                recommendations[currentCategory] &&
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

/*

  useEffect(() => {
    if (currentCategory) {
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
    }
  }, [currentCategory]);

*/
