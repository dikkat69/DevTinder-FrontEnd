import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, gender, age, photoUrl, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userid) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userid,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userid));
    } catch (err) {
      console.error("Error sending connection request:", err);
    }
  };

  return (
    <div className="w-[360px] h-[520px] flex flex-col backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition duration-300 hover:scale-[1.02]">

      {/* Image Container - Fixed Aspect Ratio */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">

        <img
          src={photoUrl || "https://via.placeholder.com/400"}
          alt="Profile"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Name + Age Overlay */}
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-xl font-semibold">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm text-gray-300">
              {age} • {gender}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Content */}
      <div className="flex flex-col justify-between flex-1 p-4">

        {/* Bio */}
        <p className="text-sm text-gray-300 line-clamp-3 min-h-[60px]">
          {about || "No bio provided yet."}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="flex-1 py-2 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition"
          >
            Ignore
          </button>

          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-[1.03] transition shadow-md"
          >
            Interested
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserCard;