import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { startLogout } from "../../actions/authActions"
import { toggleDarkMode } from "../../reducers/darkModeReducer"
import { setCurrentSubreddit } from "../../actions/subredditActions"
import { ReactComponent as DarkModeIcon } from "../../images/dark-mode-icon.svg"
import { ReactComponent as DownArrow } from "../../images/down-arrow.svg"
import ProfilePicture from "../ProfilePicture/ProfilePicture"
// import { ReactComponent as SearchIcon } from "../../images/search.svg"
// import SubredditDropdown from "../SubredditsDropdown/SubredditDropdown"
import Search from "../Search/Search"
import "./Navbar.scss";

const Navbar = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const darkMode = useSelector(state => state.darkMode)
  // const currentSubreddit = useSelector(state => state.currentSubreddit)

  // const location = useLocation()
  // const subredditName = location.pathname.match(/r\/[^\/]+/)


  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  // const [subredditDropdownToggle, setSubredditDropdownToggle] = useState(false)



  return (
    <nav className={`nav ${darkMode ? 'dark' : ''}`}>
      <div className={`nav-container`}>
        <div className={`home-search-darkicon`} >
          <Link className={`nav-home-link`} to="/"><span className="not-span" onClick={() => {
              dispatch(setCurrentSubreddit(null))
              // dispatch(getPosts(user ? user.id : null, name));
            }} >(Not)</span> Reddit</Link>
          {/* <button className={`subreddit-dropdown-toggle-button`} onClick={() => setSubredditDropdownToggle(!subredditDropdownToggle)}>{subredditName ? subredditName : "Home "} <DownArrow className="down-arrow"/></button> */}
          {/* { user && <Link className={`new-post-link`} to="/new-post">New Post</Link> } */}
          {/* <SubredditDropdown 
            subredditDropdownToggle={subredditDropdownToggle} 
            setSubredditDropdownToggle={setSubredditDropdownToggle}
          /> */}
          <Search/>

          <button className={`dark-mode-icon-parent`}  >
            <DarkModeIcon className={`dark-mode-icon`}  onClick={() => dispatch(toggleDarkMode())}/>
          </button>
        </div>
        
        
        <div className="nav-menu">
          {
            user ? 
            <div className="logged-in-nav-view">
              <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="nav-username-button">
                <ProfilePicture size="small" source={user.profile_picture} />
                {user.username} 
                <DownArrow className="down-arrow"/></button>
              <div className={`${isUserDropdownOpen ? 'user-dropdown open' : 'user-dropdown closed' }`}>
                <Link className="dropdown-link" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} to="/new-post?type=text">New Text Post</Link>
                <Link className="dropdown-link" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} to="/new-post?type=link">New Link Post</Link>
                <Link className="dropdown-link" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} to="/subreddits/create">Create Subreddit</Link>
                <button  className="logout-button" onClick={() => {
                  dispatch(startLogout(user))
                  setIsUserDropdownOpen(!isUserDropdownOpen)
                }}>Logout</button>
              </div>
            </div>
            :
            <div className="logged-out-nav-view">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          }
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
