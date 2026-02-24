import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addfeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed && feed.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addfeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center py-16">
      {feed && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-12 py-10 shadow-xl text-center">
          <h2 className="text-xl font-semibold text-white mb-3">
            No new profiles available
          </h2>
          <p className="text-gray-400">
            Please check back later. New developers join daily 🚀
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;