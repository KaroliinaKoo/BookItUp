import React, { useEffect, useState, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import VolumeDetails from "./VolumeDetailsModal";
import { formatVolumeDataList } from "../../queries/utils/formatVolumeData";
import UserContext from "../../context/UserContext";
import { subjectHeadingsList } from "../../data/subjectHeadingsList";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext not found");
  }
  const { user } = context;

  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [recommendations, setRecommendations] = useState<any>({});
  const [listIsLoading, setListIsLoading] = useState(true);
  const [isCurrentVolume, setIsCurrentVolume] = useState(false);

  const getRandomizedCategoriesList = () => {
    const random: string[] = [];
    const categories = subjectHeadingsList;

    while (random.length < 3) {
      const index = Math.floor(Math.random() * categories.length);
      if (!random.includes(categories[index])) {
        random.push(categories[index]);
      }
      console.log(random);
    }
    return random;
  };

  useEffect(() => {
    if (categoriesList.length > 0) {
      setCurrentCategory(categoriesList[0]);
      return;
    }
    user.categories.length
      ? setCategoriesList(user.categories)
      : setCategoriesList(getRandomizedCategoriesList());
  }, [categoriesList]);

  useEffect(() => {
    setListIsLoading(true);
    if (currentCategory) {
      (async (searchCategory: string) => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchCategory}+subject:${searchCategory}&filter=ebooks&orderBy=newest&startIndex=0&langRestrict=en&maxResults=8&printType=BOOKS&fields=items(id,volumeInfo(title,authors,publisher,categories,pageCount,publishedDate,description,imageLinks/*,language))`
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
              {!listIsLoading &&
                recommendations &&
                recommendations[currentCategory] &&
                recommendations[currentCategory].map((volume: any) => (
                  <li className="recommendation-card" key={volume.id}>
                    <button
                      name={`volume-cover ${volume.id}`}
                      onClick={() => setIsCurrentVolume(volume.id)}
                    >
                      <img
                        src={volume.imageLinks.smallThumbnail}
                        alt={volume.title}
                      />
                    </button>
                    <p className="recommendation-card-title">{volume.title}</p>
                    <p className="recommendation-card-author">
                      {volume.authors[0]}
                    </p>
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="volume-recommendations-footer">
          Nothing here piques your interest?
          <button
            className="btn-primary small"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          >
            Let's fix that!
          </button>
        </div>
      </div>
    </>
  );
};

export default Recommendations;
