import React from "react";
import { Link } from "react-router-dom";
import Advertise from "../components/Advertise";
import Category from "../components/Category";

const Home = () => {
  return (
    <div className="container">
      <header className="bg-white dark:bg-gray-900 h-screen flex items-center">
        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800  lg:text-4xl">
                  Best Place To choose your Clothes
                </h1>

                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Porro beatae error laborum ab amet sunt recusandae? Reiciendis
                  natus perspiciatis optio.
                </p>

                <button className="w-full text-white px-5 py-2 mt-6 text-sm tracking-wide uppercase transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  Shop Now
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-full h-full lg:max-w-3xl"
                src="https://merakiui.com/images/components/Catalogue-pana.svg"
                alt="Catalogue-pana.svg"
              />
            </div>
          </div>
        </div>
      </header>
      <Category></Category>
      <Advertise></Advertise>

      <section className="p-6 dark:text-gray-100">
        <h2 className="text-black text-center text-4xl my-5">Our Statics</h2>
        <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
          <div className="flex flex-col justify-start m-2 lg:m-6">
            <p className="text-4xl font-bold leading-none lg:text-6xl text-black">
              50+
            </p>
            <p className="text-sm sm:text-base text-black">Clients</p>
          </div>
          <div className="flex flex-col justify-start m-2 lg:m-6">
            <p className="text-4xl font-bold leading-none lg:text-6xl text-black">
              89K
            </p>
            <p className="text-sm sm:text-base text-black">
              Followers on social media
            </p>
          </div>
          <div className="flex flex-col justify-start m-2 lg:m-6">
            <p className="text-4xl font-bold leading-none lg:text-6xl text-black">
              3
            </p>
            <p className="text-sm sm:text-base text-black">Published books</p>
          </div>
          <div className="flex flex-col justify-start m-2 lg:m-6">
            <p className="text-4xl font-bold leading-none lg:text-6xl text-black">
              8
            </p>
            <p className="text-sm sm:text-base text-black">TED talks</p>
          </div>
          <div className="flex flex-col justify-start m-2 lg:m-6">
            <p className="text-4xl font-bold leading-none lg:text-6xl text-black">
              22
            </p>
            <p className="text-sm sm:text-base text-black">
              Years of experience
            </p>
          </div>
          <div className="flex flex-col justify-start m-2 lg:m-6">
            <p className="text-4xl font-bold leading-none lg:text-6xl text-black">
              10+
            </p>
            <p className="text-sm sm:text-base text-black">Workshops</p>
          </div>
        </div>
      </section>

      <div className="p-6 my-5 py-12 dark:bg-violet-400 dark:text-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-center text-6xl tracking-tighter font-bold">
              Up to
              <br className="sm:hidden" />
              50% Off
            </h2>
            <div className="space-x-2 text-center py-2 lg:py-0">
              <span>Start making money!</span>
            </div>
            <Link
              href="#"
              rel="noreferrer noopener"
              className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block dark:bg-gray-50 dark:text-gray-900 dark:border-gray-400"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
