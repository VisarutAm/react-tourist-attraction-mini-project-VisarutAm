import { useContext } from "react";
import ModalImage from "react-modal-image";
import { TripsContext } from "../../context/TripsContext";

function Display() {
  const { trips, setSearchTerm } = useContext(TripsContext);

  const handleTagClick = (tag) => {
    setSearchTerm((prev) => {
      if (prev && prev.includes(tag)) {
        return prev;
      }
      return prev ? `${prev} ${tag}` : tag;
    });
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert(`Copy Link !! : ${url}`);
  };

  return (
    <section className="wrapper-detail">
      {trips.map((trip, index) => (
        <div className="detail-card" key={index}>
          <ModalImage
            small={trip.photos[0]}
            large={trip.photos[0]}
            alt="Main-image"
            className="main-image"
          />
          <div className="description-tourist-attraction">
            <h3>{trip.title}</h3>
            <p>
              {trip.description.length <= 100
                ? trip.description
                : `${trip.description.substring(0, 100)}...`}
            </p>
            <a href={trip.url}>อ่านต่อ</a>
            <p className="tag-wrapper">
              หมวด:{" "}
              {trip.tags.map((tag, tagIndex) => {
                if (tagIndex === trip.tags.length - 1) {
                  return (
                    <span key={tagIndex}>
                      {"และ"}
                      <button
                        className="tag-button"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </button>
                    </span>
                  );
                } else {
                  return (
                    <span key={tagIndex}>
                      <button
                        className="tag-button"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </button>{" "}
                    </span>
                  );
                }
              })}
            </p>
            <div className="container-secondary-image">
              <div className="wrapper-secondary-image">
                {trip.photos.slice(1, 4).map((photo, index) => (
                  <ModalImage
                    key={index}
                    small={photo}
                    large={photo}
                    alt={`Secondary ${index + 1}`}
                    className="secondary-image"
                  />
                ))}
              </div>
              <button
                className="copy-button"
                onClick={() => handleCopyUrl(trip.url)}
              >
                🔗 <span>copy link</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Display;
