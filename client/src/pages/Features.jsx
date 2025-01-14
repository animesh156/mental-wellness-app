import { features } from "../utils/featureData";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Features() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-neutral-950 px-4">
      <Outlet />
      {/* Header */}
      <div className="text-center mt-5 mb-10">
        <h1 className="text-4xl text-sky-600 font-bold">
          Features That Transform Your Mental Wellness Journey
        </h1>
        <p className="text-lg font-medium mt-4 text-gray-300">
          Discover tools and features designed to support your mental health and{" "}
          emotional well-being
        </p>
      </div>

      {/* Feature Cards */}
      <div className="flex justify-center gap-x-6 flex-wrap gap-y-6 mt-7 mb-6">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => navigate(feature.url)}
            className="card transition-transform transform ease-in-out cursor-pointer w-96 shadow-lg bg-neutral-900 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-400"
            aria-label={`Navigate to ${feature.title}`}
          >
            <div className="card-body">
              <div className={`${feature.color} mb-4`}>
                <feature.icon size={30}  />
              </div>
              <h2 className="card-title text-teal-600 ">{feature.title}</h2>
              <p className="font-medium text-base text-gray-300">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
