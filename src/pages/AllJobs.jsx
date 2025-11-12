import React from "react";
import { useLoaderData } from "react-router";
import JobCard from "../components/JobCard";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
  console.log(data);

  return (
    <div className="container mx-auto my-8 px-5">
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

      <motion.div
        className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {data.map((job) => (
          <motion.div key={job._id} variants={cardVariants}>
            <JobCard job={job} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AllJobs;
