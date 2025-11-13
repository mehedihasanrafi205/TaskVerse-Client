import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import JobCard from "../components/JobCard";
import { motion } from "framer-motion";
import { ArrowDownUp, CalendarArrowDown, Sparkles } from "lucide-react";
import useAxios from "../hook/useAxios";
import Loading from "../components/Loading";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const AllJobs = () => {
  const data = useLoaderData();
  const [jobs, setJobs] = useState(data);
  const [sortOption, setSortOption] = useState("Sort By Date/Time");
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const handleSortSystem = async (e) => {
    const sortValue = e.target.value;
    setSortOption(sortValue);
    setLoading(true);
    try {
      const res = await axios.get(`/sort-by-date/jobs?sort=${sortValue}`);
      setJobs(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if(loading) return <Loading></Loading>

  return (
    <div className="container mx-auto mt-8 mb-25 px-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-sm font-semibold text-secondary">All Jobs</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-content">
          All Available
          <span className="text-secondary logo-font ms-2">Jobs</span>
        </h2>
        <p className="text-secondary-content/80  max-w-2xl mx-auto">
          Browse and apply for available tasks on TaskVerse
        </p>
      </motion.div>

      <div className="mb-10 flex justify-end">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          className="relative"
        >
          <div className="flex items-center gap-2 bg-base-200/80 border-2 border-secondary/50 hover:border-secondary transition-all duration-300 px-4 py-2 rounded-xl shadow-md hover:shadow-lg">
            <div className="w-9 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
              <CalendarArrowDown size={18} className="text-secondary" />
            </div>

            <select
              defaultValue={sortOption}
              onChange={handleSortSystem}
              className="select  select-ghost bg-base-200 border-none outline-none focus:outline-none font-medium text-primary-content cursor-pointer"
            >
              <option disabled  className="bg-secondary text-black/80">
                Sort By Date/Time
              </option>
              <option value="newest" className="bg-secondary mt-0.5 text-black">
                Newest First
              </option>
              <option value="oldest" className="bg-secondary mt-0.5 text-black">
                Oldest First
              </option>
            </select>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {jobs.map((job) => (
          <motion.div key={job._id} variants={cardVariants}>
            <JobCard job={job} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AllJobs;
