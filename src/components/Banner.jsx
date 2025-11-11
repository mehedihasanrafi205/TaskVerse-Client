import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const images = [
  "https://www.upwork.com/att/download/portfolio/persons/uid/1394948321970139136/profile/projects/files/4b674d48-20ad-4d50-bdaf-1e15f9429fb9",
  "https://www.upwork.com/att/download/portfolio/persons/uid/1559111323520700416/profile/projects/files/fee8d083-eb15-417f-8040-75040ce8c24c",
  "https://i.ibb.co.com/bgDFFmxn/watch-now-2.png",
  "https://i.ibb.co.com/p68BRpzV/watch-now-1.png",
  "https://www.upwork.com/att/download/portfolio/persons/uid/1394948321970139136/profile/projects/files/c708e0a0-73ae-4575-8381-c229709868ae",
];

const BannerColumn = ({ direction = "down" }) => {
  const width = 500;
  const height = 300;
  const gap = 16;
  const heightPerImage = height + gap;
  const totalHeight = images.length * heightPerImage;

  const loopImages = [...images, ...images];

  return (
    <div className="overflow-hidden flex flex-col gap-4">
      <motion.div
        animate={{
          y: direction === "down" ? [0, -totalHeight] : [-totalHeight, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-4"
      >
        {loopImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="banner"
            className="object-cover rounded-xl border border-secondary/70 shadow-md transition-shadow hover:shadow-[0_0_2px_#f7ce3e,0_0_4px_#f7ce3e]"
            style={{ width: `${width}px`, height: `${height}px` }}
          />
        ))}
      </motion.div>
    </div>
  );
};

const Banner = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center border-b border-secondary">
      <div className="absolute inset-0 bg-linear-to-b from-[#042A2B]/90 via-[#0A7373]/80 to-[#042A2B]/90"></div>
      <div className="absolute inset-0 bg-black/50 z-5"></div>
      <div className="absolute z-10 text-center px-4 ">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold bg-linear-to-r  from-[#f7ce3e] via-[#FFD84C] to-[#f7ce3e] bg-clip-text text-transparent mb-4 drop-shadow-lg"
        >
          Turn Your Skills Into Opportunity
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-2xl text-gray-300 mb-6 drop-shadow-md"
        >
          Connect with clients worldwide and grow your career with real
          opportunities.
        </motion.p>

        <div className="space-x-3 mt-4">
          <Link to={"/all-jobs"}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-lg  bg-[#042A2B] text-white border-none hover:bg-[#063637]"
            >
              All Jobs
            </motion.button>
          </Link>
          <Link to={"/add-job"}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-lg  bg-[#F7CE3E] text-[#042A2B] border-none hover:bg-[#FFD84C]"
            >
              Create a Job
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 flex justify-center gap-4 px-2 md:px-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <BannerColumn key={i} direction={i % 2 === 0 ? "down" : "up"} />
        ))}
      </div>
    </section>
  );
};

export default Banner;
