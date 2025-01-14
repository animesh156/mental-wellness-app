import { useState } from "react";

function Meditation() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="h-screen">
      <h1 className="text-center text-4xl font-bold mt-5 dark:text-white">
        Creating Mental Balance: Meditation for Health
      </h1>

      <div className="flex justify-center gap-x-8 mt-6">

        {/* Card 1 */}
        <div
          className="card card-compact bg-base-100 w-96 shadow-xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <figure>
            {/* YouTube Video Embed */}
            {isHovered ? (
              <iframe
                title="Meditation Video"
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/HRXrfIvRzNY?autoplay=1&mute=1"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="transition-all duration-500 ease-in-out"
              ></iframe>
            ) : (
              <img
                src="https://img.youtube.com/vi/HRXrfIvRzNY/maxresdefault.jpg"
                alt="Meditation Video Thumbnail"
                className="w-full h-48 object-cover"  // Fixed height here
              />
            )}
          </figure>
          <div className="card-body">
            <h2 className="card-title">Creating Mental Health & Wellbeing</h2>
            <p className="text-center font-medium">Sadhguru</p>
            <div className="card-actions justify-center">
              <a
                href="https://youtu.be/HRXrfIvRzNY?si=LgPf1y0SXiGoFIHj"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary">Watch Now</button>
              </a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="card card-compact bg-base-100 w-96 shadow-xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <figure>
            {/* YouTube Video Embed */}
            {isHovered ? (
              <iframe
                title="Meditation Video"
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/wOGqlVqyvCM?autoplay=1&mute=1"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="transition-all duration-500 ease-in-out"
              ></iframe>
            ) : (
              <img
                src="https://img.youtube.com/vi/wOGqlVqyvCM/maxresdefault.jpg"
                alt="Meditation Video Thumbnail"
                className="w-full h-48 object-cover"  // Fixed height here
              />
            )}
          </figure>
          <div className="card-body">
            <h2 className="card-title">Creating Mental Health & Wellbeing</h2>
            <p className="text-center font-medium">Sadhguru</p>
            <div className="card-actions justify-center">
              <a
                href="https://youtu.be/wOGqlVqyvCM?si=kXWDuf9Zspy8e2Wl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary">Watch Now</button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Meditation;
