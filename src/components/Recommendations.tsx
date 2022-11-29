import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { truncate } from "../utils/truncate";
import VolumeDetails from "./VolumeDetails";

const categories = ["fiction", "history", "cooking", "science", "art"];

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<any>([]);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [listIsLoading, setListIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState({
    show: false,
    volumeData: null,
  });

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

        <nav className="volume-recommendations-nav">
          <button
            className="btn-icon previous"
            onClick={() => {
              const index = categories.indexOf(currentCategory);
              if (index > 0) {
                setCurrentCategory(categories[index - 1]);
              }
            }}
            disabled={currentCategory === categories[0]}
          >
            <FaChevronLeft />
          </button>
          <h3>{currentCategory}</h3>
          <button
            className="btn-icon next"
            onClick={() => {
              const index = categories.indexOf(currentCategory);
              if (index < categories.length - 1) {
                setCurrentCategory(categories[index + 1]);
              }
            }}
            disabled={currentCategory === categories[categories.length - 1]}
          >
            <FaChevronRight />
          </button>
        </nav>
      </div>
      <div className="volume-recommendations-container">
        {listIsLoading ? (
          <div className="spinner" role="status" aria-label="Loading results" />
        ) : (
          <ul>
            {recommendations
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
