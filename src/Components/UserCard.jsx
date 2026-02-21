import React from 'react'

const UserCard = ({ user }) => {

  const { firstName, lastName, gender, age, photoUrl, about } = user;

  return (
    <div className="card w-96 bg-base-100 shadow-2xl rounded-3xl 
                    overflow-hidden transition-all duration-500 
                    hover:scale-105 hover:shadow-pink-100">

      {/* Image */}
      <figure className="h-80">
        <img
          src={photoUrl}
          alt="Photo"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Content */}
      <div className="card-body">

        <h2 className="card-title text-2xl font-bold">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-sm text-gray-500">
            {age} • {gender}
          </p>
        )}

        <p className="mt-2 text-sm leading-relaxed">
          {about}
        </p>

        {/* Buttons */}
        <div className="card-actions justify-between mt-6">
          
          <button className="btn btn-outline btn-error rounded-full px-6 
                             transition-all duration-300 hover:scale-110">
            ❌ Ignore
          </button>

          <button className="btn btn-primary rounded-full px-6 
                             transition-all duration-300 hover:scale-110">
            ❤️ Interested
          </button>

        </div>

      </div>
    </div>
  )
}

export default UserCard;
