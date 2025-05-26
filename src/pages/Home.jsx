import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[100vh]">
        <img
          className="w-full h-full object-cover"
          src="https://t4.ftcdn.net/jpg/07/66/68/91/360_F_766689190_V5DFvLBYkgS025qbSdjuV1jCrBro0Mzf.jpg"
          alt="Home"
        />
        {/* Text Over Image */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-left text-white">
          <p className="mt-4 text-xl max-w-md font-extralight">
            Discover our wide range of stylish and functional furniture that
            brings warmth, comfort, and elegance to your home.
            <br />
            <br />
          </p>
          <Link
            to="/Products"
            className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg font-bold text-lg transition-transform duration-300 hover:scale-105"
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Top Sellers Section */}
      <div className="text-center py-5 rounded-lg bg-stone-100">
        <h2 className="text-3xl text-gray-800 font-extrabold">Featured Products</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6 px-10">
          {/* Seller 1 */}
          <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center text-center md:text-left">
            <div className="md:w-1/2">
              
                <img
                  className="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                  src="https://i.pinimg.com/474x/5e/e7/5f/5ee75f2f99e5caba5261c34c8c94042b.jpg"
                  alt="Top Seller 1"
                />
              
            </div>
            <div className="md:w-1/2 md:pl-4 mt-4 md:mt-0">
              <h2 className="text-gray-800 font-bold">Bedroom</h2>
              <p className="text-gray-700 font-thin">
                Explore our wide range of bedroom furniture for comfort and
                style.
              </p>
              <Link to={"/Bedroom"}>
              <p className="text-center font-semibold text-blue-500 mr-3 hover:text-yellow-500 cursor-pointer mt-16">
                Shop Now
              </p>
              </Link>
            </div>
          </div>

          {/* Seller 2 */}
          <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center text-center md:text-left">
            <div className="md:w-1/2">
              <img
                className="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                src="https://i.pinimg.com/474x/14/a5/f8/14a5f828790e2f2115fa6a46c27441a4.jpg"
                alt="Top Seller 2"
              />
            </div>
            <div className="md:w-1/2 md:pl-4 mt-4 md:mt-0">
              <h2 className="text-gray-800 font-bold">Dining</h2>
              <p className="text-gray-700 font-thin">
                Elegant dining furniture to enhance your meal experience.
              </p>
              <Link to={"/Dining"}>
              <p className="text-center font-semibold text-blue-500 mr-3 hover:text-yellow-500 cursor-pointer mt-16">
                Shop Now
              </p>
              </Link>
            </div>
          </div>

          {/* Seller 3 */}
          <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center text-center md:text-left">
            <div className="md:w-1/2 overflow-hidden">
              <img
                className="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                src="https://i.pinimg.com/736x/ef/f3/f5/eff3f51f3355093f40740c23ea706fc8.jpg"
                alt="Top Seller 3"
              />
            </div>
            <div className="md:w-1/2 md:pl-4 mt-4 md:mt-0">
              <h2 className="text-gray-800 font-bold text-lg md:text-xl self-start md:self-center">
                Living
              </h2>
              <p className="text-gray-700 font-thin">
                Find the perfect pieces to create your cozy living space.
              </p>
              <Link to={"/Livingroom"}>
              <p className="text-center font-semibold text-blue-500 mr-3 hover:text-yellow-500 cursor-pointer mt-16">
                Shop Now
              </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
