import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");



    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-10">

      <div className="flex flex-col lg:flex-row gap-12 items-start">

        {/* ===== Edit Form ===== */}
        <div className="card w-96 bg-base-100 shadow-2xl rounded-2xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl font-bold mb-2">
              Edit Profile ✨
            </h2>

            {/* First Name */}
            <div className="form-control my-2">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                value={firstName}
                className="input input-bordered focus:input-primary"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className="form-control my-2">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                value={lastName}
                className="input input-bordered focus:input-primary"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Photo URL */}
            <div className="form-control my-2">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered focus:input-primary"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            {/* Age */}
            <div className="form-control my-2">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                value={age}
                className="input input-bordered focus:input-primary"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Gender Dropdown */}
            <div className="form-control my-2">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                value={gender}
                className="select select-bordered focus:select-primary"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option> 
                <option value="confused">Confused</option>
              </select>
            </div>

            {/* About */}
            <div className="form-control my-2">
              <label className="label">
                <span className="label-text">About</span>
              </label>
              <textarea
                value={about}
                rows="3"
                className="textarea textarea-bordered focus:textarea-primary"
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-error text-sm text-center mt-2">{error}</p>
            )}

            {/* Save Button */}
            <div className="card-actions justify-center mt-4">
              <button
                className="btn btn-primary px-10 rounded-full hover:scale-105 transition-all duration-200"
                onClick={saveProfile}
              >
                Save Profile 💾
              </button>
            </div>
          </div>
        </div>

        {/* ===== Live Preview ===== */}
        <div className="mt-5 lg:mt-0">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>

      </div>

      {/* ===== Toast ===== */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success shadow-lg">
            <span>Profile saved successfully 🎉</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default EditProfile;