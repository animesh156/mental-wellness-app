import { IoPlayCircleOutline } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";
import Balancer from "react-wrap-balancer";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { benefits } from '../utils/benefitsData';

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {/* Hero Section */}
      <div className="relative flex h-screen justify-center bg-purple-200 items-center"
        style={{
          backgroundImage: `url('/wave.svg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}>

        <div className="text-center absolute text-black">
          <h1 className="md:text-6xl text-3xl font-extrabold">
            Find Inner Peace with MindWell
          </h1>

          <p className="md:text-xl text-md font-bold mt-6">
            <Balancer>
              Your personal companion for mental wellness. Meditation, <br /> mindfulness, and emotional support - all in one place.
            </Balancer>
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-x-4 mt-5">
            {user ? null : <button onClick={() => navigate('/signUp')} className="btn bg-violet-600 hover:bg-violet-700 text-white text-base">
              Get Started Free
              <GoArrowRight size={26} />
            </button>}

            <button className="btn btn-accent text-white text-base" onClick={() => navigate('/features')}>
              Learn More
              <IoPlayCircleOutline size={26} />
            </button>
          </div>
        </div>

      </div>

      {/* Benefits Section (Full Screen) */}
      <div className="flex flex-col justify-center  items-center text-white p-6 h-full">

        <div className="text-center mb-8 mt-10">
          <Balancer>
            <h1 className="md:text-5xl font-extrabold text-2xl text-teal-400 md:font-bold mb-4">
              Transform Your Life with MindWell
            </h1>
          </Balancer>

          <p className="text-xs font-bold md:text-lg text-gray-300 ">
            <Balancer>
              Experience the powerful benefits of regular mental wellness practice
            </Balancer>
          </p>
        </div>

        {/* Card Components */}
        <div className="flex mb-9 justify-center gap-x-6 flex-wrap gap-y-6 mt-4">
          {benefits.map((benefit, index) => (
            <div className="card w-96 shadow-md bg-neutral-900 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 hover:shadow-cyan-300" key={index}>
              <div className="card-body">

                <div className={`${benefit.color}`}><benefit.icon size={34} /></div>

                <h2 className="card-title">{benefit.title}</h2>
                <p className="font-medium text-base text-gray-400">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </>
  );
}

export default Home;
