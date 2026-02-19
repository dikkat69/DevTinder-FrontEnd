import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('Harsh@kulbe.com');
  const [password, setPassword] = useState('H_kulbe123');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async() => {
    try {
      const res = await axios.post(BASE_URL+'/login', {
        emailId: email,
        password
      }, {withCredentials: true}
     );
     dispatch(addUser(res.data));
      navigate('/feed');
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-base-200">

      <div className="card w-96 bg-base-100 shadow-xl 
                      transition-all duration-500 
                      hover:shadow-2xl hover:scale-105">

        <div className="card-body">

          <h2 className="text-3xl font-bold text-center mb-6">
            DevTinder Login 🔥
          </h2>

          <input 
            type="email" 
            className="input input-bordered w-full"
            placeholder="Email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password with Eye Icon */}
          <div className="relative mt-4">
            <input 
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full pr-12"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button 
            className="btn btn-primary w-full mt-6 transition-all duration-300 hover:scale-105"
            onClick={handleLogin}
          >
            Login
          </button>

        </div>
      </div>

    </div>
  )
}

export default Login;
