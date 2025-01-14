import { useState } from "react";
import { mediation } from "../utils/mediationData";

function Meditation() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="">
      <h1 className="text-center text-4xl font-bold mt-5 dark:text-white">
        Creating Mental Balance: Meditation for Health
      </h1>

      <div className="flex justify-center mb-7 flex-wrap gap-y-5 gap-x-8 mt-6">

        {mediation.map((data,index) => (
           <div
           key={index}
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
                 src={data.preview}
                 frameBorder="0"
                 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
                 className="transition-all duration-500 ease-in-out"
               ></iframe>
             ) : (
               <img
                 src={data.image}
                 alt="Meditation Video Thumbnail"
                 className="w-full h-48 object-cover"  // Fixed height here
               />
             )}
           </figure>
           <div className="card-body">
             <h2 className="card-title">{data.title}</h2>
             <p className="text-center font-medium">{data.author}</p>
             <div className="card-actions justify-center">
               <a
                 href={data.video}
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <button className="btn btn-primary">Watch Now</button>
               </a>
             </div>
           </div>
         </div>
        ))}
        

       

      </div>
    </div>
  );
}

export default Meditation;
