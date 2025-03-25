import React, { useEffect, useState } from 'react';
import ImageContainer from '../components/ImageContainer';

function DevImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageParam, setPageParam] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://backendforunsplashclone-production.up.railway.app/api/v1/images/?page=${pageParam}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();

        console.log("Fetched data:", data);
        if (!Array.isArray(data) || data.length === 0) {
          setHasMore(false);
          return;
        }

        setImages((prevImages) => {
          const newImages = data.filter(
            (img) => !prevImages.some((prev) => prev.id === img.id)
          );
          return pageParam === 1 ? newImages : [...prevImages, ...newImages];
        });

      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchImages();
  }, [pageParam]);

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="pt-18 px-2">
      {loading && <span className="loading loading-dots loading-xl"></span>}
      {images.length > 0 && <ImageContainer images={images} />}
      <div className="my-10">
        {hasMore && images.length > 0 && (
          <button
            onClick={() => setPageParam((prevPage) => prevPage + 1)}
            className="btn btn-secondary btn-block"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
}

export default DevImages;
