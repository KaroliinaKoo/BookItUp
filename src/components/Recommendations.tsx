import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { truncate } from "../utils/truncate";
import VolumeDetails from "./VolumeDetails";

const Recommendations = () => {
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>(
    categoriesList[0]
  );
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [listIsLoading, setListIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState({
    show: false,
    volumeData: null,
  });

  useEffect(() => {
    try {
      const getUserData = localStorage.getItem("user");
      if (getUserData) {
        let userCategories = JSON.parse(getUserData);
        userCategories = userCategories.settings.categories;
        setCategoriesList(userCategories);
        setCurrentCategory(userCategories[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchVolume = async (searchCategory: string) => {
      setListIsLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchCategory}+subject:${searchCategory}&filter=ebooks&orderBy=newest&startIndex=0&langRestrict=en&maxResults=8&printType=BOOKS`
      );

      try {
        const data = await response.json();
        setRecommendations(
          data.items.map((volume: any) => {
            return {
              volumeData: volume.volumeInfo,
              category: searchCategory,
              volumeInfo: {
                id: volume.id,
                title: volume.volumeInfo.title || "Unknown title",
                author: volume.volumeInfo.authors || "Unknown author",
                cover: volume.volumeInfo.imageLinks
                  ? volume.volumeInfo.imageLinks.thumbnail
                  : "https://via.placeholder.com/150",
                category: volume.volumeInfo.categories || "",
              },
            };
          })
        );
        setListIsLoading(false);
      } catch (error) {
        console.log(error);
        setListIsLoading(false);
      }
    };
    fetchVolume(currentCategory);
  }, [currentCategory]);

  return (
    <div className="volume-recommendations">
      {showDetails.show && (
        <VolumeDetails
          volumeData={showDetails.volumeData}
          onClose={() => setShowDetails({ show: false, volumeData: null })}
        />
      )}
      <div className="volume-recommendations-header">
        <h2>Find your new favorite book</h2>

        {categoriesList.length > 1 && (
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
          <div className="spinner" role="status" aria-label="Loading results" />
        ) : (
          <ul>
            {categoriesList.length > 1 &&
              recommendations
                .filter((item: any) => item.category === currentCategory)
                .map((item: any) => (
                  <li className="recommendation-card" key={item.volumeInfo.id}>
                    <button
                      onClick={() => {
                        setShowDetails({
                          show: true,
                          volumeData: item.volumeData,
                        });
                      }}
                    >
                      <img
                        src={item.volumeInfo.cover}
                        alt={item.volumeInfo.title}
                      />
                    </button>
                    <p className="recommendation-card-title">
                      {truncate(item.volumeInfo.title, 30)}
                    </p>
                    <p className="recommendation-card-author">
                      {item.volumeInfo.author[0]}
                    </p>
                  </li>
                ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
