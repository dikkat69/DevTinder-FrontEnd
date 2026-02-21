import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useSelector, useDispatch } from 'react-redux';
import { addfeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed && feed.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true
      });

      dispatch(addfeed(res?.data?.data));

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

 return (
  <div className="min-h-screen flex justify-center items-center bg-base-200">
    
    {feed && feed.length > 0 ? (
      <UserCard user={feed[0]} />
    ) : (
      <p className="text-lg font-semibold">No More Users 😎</p>
    )}

  </div>
)

}

export default Feed;
