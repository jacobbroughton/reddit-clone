import "./CurrentSubredditBanner.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { deleteSubreddit } from "../../actions/subredditsActions";

const CurrentSubredditBanner = ({ name, user }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentSubreddit = useSelector((state) => state.currentSubreddit);
  const darkMode = useSelector((state) => state.darkMode);

  const [deleteToggle, setDeleteToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("shit");

  const handleSubredditDelete = () => {
    dispatch(deleteSubreddit(user.id, currentSubreddit.id));
    setDeleteToggle(false);
  };

  useEffect(() => {
    setDeleteToggle(false);
  }, [currentSubreddit]);

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();

  useEffect(() => {
    console.log(query.get("q"));
    let searchQueryFromURL = query.get("q");
    setSearchQuery(searchQueryFromURL);
  }, [location]);

  return (
    <section className={`current-subreddit-banner ${darkMode ? "dark" : ""}`}>
      {name ? (
        <div className="current-subreddit-banner-stack">
          <h1>
            {currentSubreddit ? (
              <>
                <span className="rSpan">r/</span>
                {currentSubreddit.name}
              </>
            ) : (
              "Home"
            )}{" "}
          </h1>
          {searchQuery && <p className="search-value"><span>Search: </span>{searchQuery}</p>}
          {currentSubreddit?.user_id === user?.id && deleteToggle ? (
            <span className="delete-confirmation-span">
              Are you sure?
              <button onClick={() => handleSubredditDelete()}>Yes</button>
              <button onClick={() => setDeleteToggle(false)}>No</button>
            </span>
          ) : (
            <button
              className="delete-btn"
              onClick={() => setDeleteToggle(true)}
            >
              Delete Subreddit
            </button>
          )}
        </div>
      ) : (
        <div className="current-subreddit-banner-stack">
          <h1>Home</h1>
          {searchQuery && <span>Search: {searchQuery}</span>}
        </div>
      )}
    </section>
  );
};

export default CurrentSubredditBanner;