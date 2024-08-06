import "./CSS/App.css";
import "./CSS/Responsive.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalImage from "react-modal-image";

// import image_copy_link from "./image/copy-link-svgrepo-com.png"

function App() {
  const [trip, setTrip] = useState([]);
  const [findTrip, setFindtrip] = useState("");

  const getTrips = async () => {
    console.log(import.meta.env.VITE_API_URL);
    const result = await axios.get(
      `https://react-tourist-attraction-mini-project-visarut-am-tbzp.vercel.app//trips?keywords=${findTrip}`
    );

    console.log(result.data.data);
    setTrip(result.data.data);
  };

  // const getTrips = async () => {
  //   if (!findTrip) return; // Prevent empty keyword requests
  //   try {
  //     const apiUrl = import.meta.env.VITE_API_URL; // Make sure this is set correctly
  //     const fullUrl = `${apiUrl}/trips?keywords=${encodeURIComponent(
  //       findTrip
  //     )}`;

  //     // Log the API URL to see if it's correct
  //     console.log("API URL:", fullUrl);

  //     const result = await axios.get(fullUrl);
  //     console.log(result.data.data);
  //     setTrip(result.data.data);
  //   } catch (error) {
  //     console.error("Error fetching trips:", error);
  //   }
  // };

  useEffect(() => {
    getTrips();
  }, [findTrip]);

  const handleTagClick = (tag) => {
    const newFindTrip = findTrip ? `${findTrip} ${tag}` : tag;
    setFindtrip(newFindTrip);
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert(`Copy Link !! : ${url}`);
  };

  const Ttips = () => {
    if (findTrip) {
      return trip.map((data, index) => (
        <div className="detail-card" key={index}>
          <ModalImage
            small={data.photos[0]}
            large={data.photos[0]}
            alt="Secondary 1"
            className="main-image"
          />
          {/* <img className="main-image" src={data.photos[0]} /> */}
          <div className="description-tourist-attraction">
            <h3>{data.title}</h3>
            <p>
              {data.description.length <= 100
                ? data.description
                : `${data.description.substring(0, 100)}...`}
            </p>
            <a href={data.url}>อ่านต่อ</a>
            {/* <p className="tag-wrapper">
              หมวด :{" "}
              {data.tags.map((tag, tagIndex) => (
                <button className="tag-button" key={tagIndex} onClick={() => handleTagClick(tag)}>
                  {tag}
                </button>
              ))}
            </p> */}
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

            {/*<img className="secondary-image" src={data.photos[1]} />
            <img className="secondary-image" src={data.photos[2]} />
            <img className="secondary-image" src={data.photos[3]} />*/}
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
                🔗<span>copy link</span>
              </button>
            </div>
            {/* <button className="copy-button"><img src={image_copy_link} alt="Copy link"></img></button> */}
          </div>
        </div>
      ));
    } else {
      return trip.map((data, index) => (
        <div className="detail-card" key={index}>
          <ModalImage
            small={data.photos[0]}
            large={data.photos[0]}
            alt="Secondary 1"
            className="main-image"
          />
          {/* <img className="main-image" src={data.photos[0]} /> */}
          <div className="description-tourist-attraction">
            <h3>{data.title}</h3>
            <p>
              {data.description.length <= 100
                ? data.description
                : `${data.description.substring(0, 100)}...`}
            </p>
            <a href={data.url}>อ่านต่อ</a>
            {/* <p className="tag-wrapper">
              หมวด :{" "}
              {data.tags.map((tag, tagIndex) => (
                <button className="tag-button" key={tagIndex} onClick={() => handleTagClick(tag)}>
                  {tag}
                </button>
              ))}
            </p> */}
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

            {/*<img className="secondary-image" src={data.photos[1]} />
            <img className="secondary-image" src={data.photos[2]} />
            <img className="secondary-image" src={data.photos[3]} />*/}
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
            {/* <button className="copy-button"><img src={image_copy_link} alt="Copy link"></img></button> */}
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="App">
      <h1>เที่ยวไหนดี</h1>
      <div>
        {/* <p className="find-trips">ค้นหาที่เที่ยว</p>     */}
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
          <div>{Ttips()}</div>
        </section>
      </div>
    </div>
  );
}

export default App;

// const getTrips = async () => {
//   try {
//     if (findTrip !== "") {
//       const result = await axios.get(
//         `http://localhost:4001/trips?keywords=${findTrip}`
//       );
//       console.log(result.data.data);
//       setTrip(result.data.data);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
