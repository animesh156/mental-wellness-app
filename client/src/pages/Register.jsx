import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { register, reset } from '../features/authSlice';


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
   
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/features');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
      </div>
    )
  }

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center log"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <section className="mx-auto border border-gray-300  backdrop-blur-sm shadow-md  md:w-96 px-4 py-4 text-center  rounded-3xl">
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className="py-2.5 px-3 border-2 border-gray-400  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-xl md:w-80   caret-yellow-500 text-rose-500 mb-8"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="email"
              className="py-2.5 px-3 border-2 border-gray-300  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-xl md:w-80   caret-yellow-500 text-rose-500 mb-8"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="py-2.5 px-3 border-2 border-gray-400  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-xl md:w-80   caret-yellow-500 text-rose-500 mb-8"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

         
       

          <div>
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600  md:w-40 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Sign Up
            </button>
          </div>

          <div>
            <p className="font-medium text-1xl  mt-3">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-red-500 hover:text-red-600 font-extrabold"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;