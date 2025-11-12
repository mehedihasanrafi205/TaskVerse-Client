import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import JobCard from "./JobCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";

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

const LatestJobs = () => {
  const [jobs, SetJobs] = useState([]);

  useEffect(() => {
    fetch("https://taskverse-server.vercel.app/latestJobs")
      .then((res) => res.json())
      .then((data) => {
        SetJobs(data);
      });
  }, [SetJobs]);
  console.log(jobs);

  return (
    <div className="container mx-auto mt-40 mb-20 px-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-sm font-semibold text-secondary">
            Latest Jobs
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-content">
          <span className="text-secondary logo-font">Latest Jobs:</span> Turn
          Skills Into Success
        </h2>
        <p className="text-secondary-content/80  max-w-2xl mx-auto">
          Explore tasks and seize your perfect opportunity.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {jobs.map((job) => (
          <motion.div key={job._id}>
            <JobCard job={job} />
          </motion.div>
        ))}
      </motion.div>

      <Link
        to={"/all-jobs"}
        className="inline-flex items-center gap-2 px-10 mt-5 font-semibold  btn btn-outline btn-secondary rounded-lg"
      >
        View All Jobs
        <ArrowRight size={18} />
      </Link>
    </div>
  );
};

export default LatestJobs;
