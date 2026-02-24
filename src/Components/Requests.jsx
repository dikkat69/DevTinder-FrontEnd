import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';


const Requests = () => {

  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status , _id) => {
    try{
      await axios.post(BASE_URL + "/request/review/" + status + "/" + _id , {},
        { withCredentials: true } );

    dispatch(removeRequest(_id));
    } catch(err){
      console.error("Error reviewing request:", err);
    }
  }


    const fetchRequests = async () => {

    try{
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data || []));
    } catch(err){
    console.error("Error fetching requests:", err);
  }
}
  useEffect(() => {
      fetchRequests();
    },[]);

  if (!requests) return <div>Loading connection Requests...</div>;
  if (requests.length === 0) return <div className="text-center my-10">No Requests Found</div>;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Your Connection Requests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromID;
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
              <div>
                <button 
                className="btn btn-primary mx-3 my-5" 
                onClick={() => { reviewRequest("rejected",request._id)
                }}>Reject</button>
                
                <button 
                className="btn btn-secondary mx-3" 
                onClick={() => { reviewRequest("accepted",request._id)
                }} >Accept</button>
             </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Requests