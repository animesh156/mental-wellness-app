import Balancer from "react-wrap-balancer";
import { testimonials } from "../utils/testimonialsData";

function Testimonials() {
  return (
    <div className="md:h-screen h-full flex flex-col items-center    justify-center">
      <div className="text-center mb-8 ">
        <Balancer>
          <h1 className="md:text-5xl text-3xl font-extrabold mb-4 text-cyan-300">
            Success Stories from Our Users
          </h1>
        </Balancer>

        <p className="text-base md:text-lg text-gray-300  font-medium">
          <Balancer>
            Discover how MindWell has transformed lives and improved mental
            wellness
          </Balancer>
        </p>
      </div>

      {/* card components */}
      <div className="flex justify-center gap-x-8 gap-y-7 flex-wrap mt-6 mb-6">
        {testimonials.map((testimonial, index) => (
          <div
            className="card bg-neutral-900   border transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 hover:shadow-red-400 shadow-md backdrop-blur-sm w-96 "
            key={index}
          >
            <div className="card-body">
              <div className="flex gap-x-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-lg  bg-gradient-to-r from-violet-500 to-blue-500 font-bold w-14 rounded-full">
                    <span>{testimonial.shorthand}</span>
                  </div>
                </div>

                <div >
                  <h2 className="card-title text-pink-500 ">{testimonial.name}</h2>
                  <h5 className="font-mono text-red-400 ">{testimonial.job}</h5>
                </div>
              </div>

              <p className="mt-2 font-serif mb-2 text-gray-300">
                <Balancer>{testimonial.review}</Balancer>
              </p>

              <div className="rating rating-sm ">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-400"
                />

                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-400"
                  defaultChecked
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
