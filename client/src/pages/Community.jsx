import React, { useEffect, useState } from "react";
import { dummyPublishedImages } from "../assets/assets";

const Community = () => {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setImage(dummyPublishedImages);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 pt-12 xl:px-12 2xl:px-20 w-full h-full mx-auto overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Community Images
      </h2>  

      {image.length > 0 ? (
        <div className="flex flex-wrap max-sm:justify-center gap-5">
          {image.map((item, index) => (
            <a
              key={index}
              href={item.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group block rounded-lg overflow-hidden border-gray-200 dark:border-purple-700 border shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.userName}
                className="w-full h-40 md:h-50 2xl:h-62 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <p className="absolute bottom-0 right-0 text-xs bg-black/50 backdrop-blur text-white px-4 py-1 rounded-tl-xl opacity-0 group-hover:opacity-100 transition duration-300">
                Created by {item.userName}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No images Available</p>
      )}
    </div>
  );
};

export default Community;
