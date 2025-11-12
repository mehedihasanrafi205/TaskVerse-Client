import React from "react";
import { motion } from "framer-motion";
import { Briefcase, User, DollarSign, Calendar } from "lucide-react";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  const {
    title,
    description,
    coverImage,
    category,
    postedBy,
    postedByImage,
    price,
    created_at,
    _id,
  } = job;

  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link to={`/job-detail/${_id}`}>
      <motion.div
        whileHover={{ scale: 1.02, boxShadow: "0 0 5px 2px #f7ce3e" }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group bg-base-200/80  border border-secondary/30 hover:border-secondary/60 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300"
      >
        <div className="relative overflow-hidden h-56">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"></div>

          <span className="absolute top-3 left-3 bg-primary/90 text-[#F7CE3E] text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
            {category}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-primary-content group-hover:text-secondary transition-colors duration-300">
            {title}
          </h2>

          <p className="text-primary-content/70 text-sm line-clamp-5">
            {description}
          </p>

          <div className="flex items-center justify-between mt-3 text-sm text-secondary/90">
            <div className="flex items-center gap-2">
              <img
                src={postedByImage}
                alt={postedBy}
                className="w-8 h-8 rounded-full object-cover border border-secondary/30"
              />
              <span className="font-medium ">{postedBy}</span>
            </div>

            <div className="flex items-center gap-1 text-green-600 font-semibold">
              <DollarSign size={16} />
              <span>{price.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Briefcase size={14} />
              <span>{category}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default JobCard;
