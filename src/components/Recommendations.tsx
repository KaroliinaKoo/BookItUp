import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = ["fiction", "history", "cooking"];

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<any>([]);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  useEffect(() => {
    const fetchVolume = async (category: string) => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${category}+subject${category}&orderBy=relevance&startIndex=0&maxResults=5&printType=BOOKS`
      );
      const data = await response.json();

      if (data.totalItems) {
        setRecommendations(
          data.items.map((volume: any) => {
            return {
              category: category,
              volumeInfo: {
                id: volume.id,
                title: volume.volumeInfo.title || "Unknown title",
                author: volume.volumeInfo.authors || "Unknown author",
                cover:
                  volume.volumeInfo.imageLinks.thumbnail ||
                  "https://via.placeholder.com/150",
                category: volume.volumeInfo.categories || "",
              },
            };
          })
        );
      }
    };

    fetchVolume(currentCategory);
  }, [currentCategory]);

  return (
    <div className="volume-recommendations">
      <h2>Find your next favorite book</h2>
      <div className="volume-recommendations-container">
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
        <ul>
          {recommendations
            .filter((item: any) => item.category === currentCategory)
            .map((item: any) => (
              <li className="recommendation-card" key={item.volumeInfo.id}>
                <img src={item.volumeInfo.cover} alt={item.volumeInfo.title} />
                <p className="recommendation-card-title">
                  {item.volumeInfo.title}
                </p>
                <p className="recommendation-card-author">
                  {item.volumeInfo.author}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Recommendations;
