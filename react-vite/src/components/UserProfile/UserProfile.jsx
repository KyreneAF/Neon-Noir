import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./UserProfile.css";
import { useParams } from "react-router-dom";
import TabsComponent from "../ManageSongs/Tabs/TabsComponent";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateProfileImage from "./CreateProfileImage/CreateProfileImage";

function UserProfile() {
  const user = useSelector((state) => state.session.user); // this is to find current logged in user info
  const { id } = useParams(); // getting user id from param to view other user's profile
  const [userPic, setUserPic] = useState(null);
  // const [colorClass, setColorClass] = useState("blue"); // dynamically change class color for background gradient

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const res = await fetch(`/api/profile/${id}`);
        if (res.ok) {
          const userImg = await res.json();
          setUserPic(userImg.user_image); // Update the state with the fetched image data
        } else {
          throw new Error("Failed to fetch user image");
        }
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };

    fetchUserImage();
  }, [id]);

  // console.log("user pic", userPic)

  // if(!userPic)return null
  return (
    <div id="user-profile-main-cont">
      <div id="user-border-main-cont">
        <div id="user-pic-cont">
          {userPic && userPic.image_file ? (
            <img className="profile-img" src={userPic.image_file} />
          ) : (
            <img
              className="profile-img"
              src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
            />
          )}
        </div>
        <div id="user-name-cont">
          <div id="user-page-name">
            <span>{user.username}</span>
          </div>
          <div id="user-bttn-cont">
            <OpenModalButton
              // modalComponent={<CreateProfileImage />}
              buttonText={
                <button onClick={() => window.alert("Feature Coming Soon...")}>
                  <i className="fa-solid fa-camera-retro"></i>
                  <span style={{ marginLeft: "5px" }}>
                    Upload profile image
                  </span>
                </button>
              }
            />
          </div>
        </div>
      </div>
      <div className="personal-songs-cont">
        <TabsComponent />
      </div>
    </div>
  );
}

export default UserProfile;
