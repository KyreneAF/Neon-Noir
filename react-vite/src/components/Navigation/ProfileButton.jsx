import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  return (
    <div className="pb-main-cont">
      <div className="toggle-cont" onClick={toggleMenu}>
        <i className="fa-solid fa-user click" id="user-icon"></i>
      </div>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div className="dropdown-text">
              <div
                className="pb-border"
                style={{
                  borderBottom: "1px solid hsl(0,0%,79%)",
                  padding: "5px",
                }}
              >
                {user.username}
              </div>
              <div
                className="profile-link pb-border click border"
                style={{
                  borderBottom: "1px solid hsl(0,0%,79%)",
                  padding: "5px",
                }}
                onClick={() => {
                  navigate(`user/${user.id}`), closeMenu();
                }}
              >
                <i className="fa-regular fa-user"></i>
                <span>Profile</span>
              </div>
              <div
                className="pb-border"
                style={{
                  borderBottom: "1px solid hsl(0,0%,79%)",
                  padding: "5px",
                }}
              >
                {user.email}
              </div>
              <div>
                <button className="click border pb-bttn" onClick={logout}>
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </div>
      )}
      {/* </div> */}
    </div>
  );
}

export default ProfileButton;
