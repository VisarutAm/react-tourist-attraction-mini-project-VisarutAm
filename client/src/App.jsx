//  import "./CSS/App.css";
// import "./CSS/Responsive.css";
// import { TripsProvider } from "./context/TripsContext";
// import Display from "./components/Display/Display";
// import SearchBar from "./components/SearchBar/SearchBar";

// function App() {
//   return (
//     <TripsProvider>
//       <div className="App">
//         <h1>เที่ยวไหนดี</h1>
//         <SearchBar />
//         <Display />
//       </div>
//     </TripsProvider>
//   );
// }

// export default App;

import "./CSS/App.css";
import "./CSS/Responsive.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalImage from "react-modal-image";

function App() {
  const [trip, setTrip] = useState([]);
  const [findTrip, setFindtrip] = useState("");

  const getTrips = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/trips?keywords=${findTrip}`
      );
      setTrip(result.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getTrips();
  }, [findTrip]);

  const handleTagClick = (tag) => {
    const newFindTrip = (findTrip) => {
      if (findTrip && findTrip.includes(tag)) {
        return findTrip;
      }
      return findTrip ? `${findTrip} ${tag}` : tag;
    };
    setFindtrip(newFindTrip);
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert(`Copy Link !! : ${url}`);
  };

  const Trips = () => {
    return trip.map((data, index) => (
      <div className="detail-card" key={index}>
        <ModalImage
          small={data.photos[0]}
          large={data.photos[0]}
          alt="Main-image"
          className="main-image"
        />

        <div className="description-tourist-attraction">
          <h3>{data.title}</h3>
          <p>
            {data.description.length <= 100
              ? data.description
              : `${data.description.substring(0, 100)}...`}
          </p>
          <a href={data.url}>อ่านต่อ</a>

          <p className="tag-wrapper">
            หมวด :{" "}
            {data.tags.map((tag, tagIndex) => {
              if (tagIndex === data.tags.length - 1) {
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
              <ModalImage
                small={data.photos[1]}
                large={data.photos[1]}
                alt="Secondary 1"
                className="secondary-image"
              />
              <ModalImage
                small={data.photos[2]}
                large={data.photos[2]}
                alt="Secondary 2"
                className="secondary-image"
              />
              <ModalImage
                small={data.photos[3]}
                large={data.photos[3]}
                alt="Secondary 3"
                className="secondary-image"
              />
            </div>
            <button
              className="copy-button"
              onClick={() => handleCopyUrl(data.url)}
            >
              🔗 <span>copy link</span>
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>เที่ยวไหนดี</h1>
      <div>
        <section className="wrapper-detail">
          <div className="find-tourist-attraction">
            <p className="find-trips">ค้นหาที่เที่ยว</p>
            <input
              type="text"
              placeholder="หาที่เที่ยวแล้วไปกัน ..."
              value={findTrip}
              onChange={(event) => {
                setFindtrip(event.target.value);
              }}
            ></input>

            <hr />
          </div>
          <div>{Trips()}</div>
        </section>
      </div>
    </div>
  );
}

export default App;
