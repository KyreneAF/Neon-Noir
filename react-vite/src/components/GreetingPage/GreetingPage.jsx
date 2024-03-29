import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./GreetingPage.css";
// import { useEffect } from "react";

function GreetingPage() {
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.session.user);

  const handleNavMySongs = () => {
    navigate("/songs/current");
  };

  // if (!currSongs) return null;

  return (
    <div className="greeting-main-cont row">
      {/* <div className="greeting-nav-main-cont"> */}
      <div className="home click border" onClick={() => navigate("/")}>
        <div className="buttn-inner-div row">
          <i className="fa-solid fa-house"></i>
          <span>Home</span>
        </div>
      </div>
      {currUser ? (
        <div
          className="add-song-bttn click row border"
          onClick={() => navigate("songs/new")}
        >
          <div className="buttn-inner-div row">
            <i className="fa-solid fa-plus"></i>
            <span>Upload new track</span>
          </div>
        </div>
      ) : (
        <div
          className="add-song-bttn click row border"
          style={{ visibility: "hidden" }}
        >
          <div className="buttn-inner-div row">
            <i className="fa-solid fa-plus"></i>
            <span>PlaceHolder</span>
          </div>
        </div>
      )}
      {/* </div> */}
      {currUser ? (
        <div
          className="gp-user-song-cont row click border"
          onClick={handleNavMySongs}
        >
          <div className="buttn-inner-div row">

            <div className="gp-user-song-title-cont column">
              <span>Library</span>
              {/* <span>{currSongsArr.length} songs</span> */}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GreetingPage;
