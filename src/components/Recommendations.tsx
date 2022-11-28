import React, { useEffect, useState } from "react";

const categories = ["fiction", "history", "cooking"];

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<any>([]);

  useEffect(() => {
    const fetchVolume = async (category: string) => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${category}+subject${category}&orderBy=relevance&startIndex=0&maxResults=5&printType=BOOKS`
      );
      const data = await response.json();

      if (data.totalItems) {
        const volumeData = data.items.map((volume: any) => {
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
        });

        setRecommendations((prev: any) => [...prev, ...volumeData]);
        console.log(recommendations);
      }
    };

    categories.forEach((category) => {
      fetchVolume(category);
    });
  }, []);

  return (
    <div className="recommendations">
      <h2>Find your next favorite book</h2>
      <div className="recommendations-container">
        {categories.forEach((category) => {
          return (
            <ul>
              <p>{category}</p>
              <li>
                {recommendations
                  .filter((item: any) => item.category === "fiction")
                  .map((item: any) => (
                    <div
                      className="recommendation-card"
                      key={item.volumeInfo.id}
                    >
                      <img
                        src={item.volumeInfo.cover}
                        alt={item.volumeInfo.title}
                      />
                      <div className="recommendation-card-info">
                        <h3>{item.volumeInfo.title}</h3>
                        <p>{item.volumeInfo.author}</p>
                      </div>
                    </div>
                  ))}
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;
