import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.Connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data || []));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <div>Loading connections...</div>;
  if (connections.length === 0) return <div className="text-center my-10">No Connections Found</div>;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Your Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((user) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
          return (
            <div
              key={_id}
              className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 transition transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                alt={`${firstName} ${lastName}`}
                className="w-24 h-24 rounded-full border-2 border-indigo-500 object-cover"
              />
              <h2 className="mt-4 font-semibold text-lg text-gray-900 dark:text-white">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-gray-500 dark:text-gray-300">
                  {age}, {gender}
                </p>
              )}
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-center">
                {about || "This user has no bio yet."}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;