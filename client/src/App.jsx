import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
// import image_copy_link from "./image/copy-link-svgrepo-com.png"

function App() {
  const [trip, setTrip] = useState([]);
  const [findTrip, setFindtrip] = useState("");

  const getTrips = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${findTrip}`
    );
    console.log(result.data.data);
    setTrip(result.data.data);
  };

  useEffect(() => {
    getTrips();
  },[findTrip]);

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
          <img className="main-image" src={data.photos[0]} />
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
              {data.tags.map((tag, tagIndex) => (
                <button className="tag-button" key={tagIndex} onClick={() => handleTagClick(tag)}>
                  {tag}
                </button>
              ))}
            </p>
            <img className="secondary-image" src={data.photos[1]} />
            <img className="secondary-image" src={data.photos[2]} />
            <img className="secondary-image" src={data.photos[3]} />
            <button
              className="copy-button"
              onClick={() => handleCopyUrl(data.url)}
            >
              🔗<span>copy link</span>
            </button>
            {/* <button className="copy-button"><img src={image_copy_link} alt="Copy link"></img></button> */}
          </div>
        </div>
      ));
    } else {
      return trip.map((data, index) => (
        <div className="detail-card" key={index}>
          <img className="main-image" src={data.photos[0]} />
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
              {data.tags.map((tag, tagIndex) => (
                <button className="tag-button" key={tagIndex} onClick={() => handleTagClick(tag)}>
                  {tag}
                </button>
              ))}
            </p>
            <img className="secondary-image" src={data.photos[1]} />
            <img className="secondary-image" src={data.photos[2]} />
            <img className="secondary-image" src={data.photos[3]} />
            <button
              className="copy-button"
              onClick={() => handleCopyUrl(data.url)}
            >
              🔗 <span>copy link</span>
            </button>
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
        <p className="find-trips">ค้นหาที่เที่ยว</p>
        <section className="wrapper-detail">
          <div className="find-tourist-attraction">
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
