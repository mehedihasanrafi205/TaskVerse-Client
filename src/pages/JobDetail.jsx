import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  DollarSign,
  User,
  Mail,
  Tag,
  Award,
  Briefcase,
  ArrowLeft,
  Heart,
  Share2,
  CircleCheck,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import useAxios from "../hook/useAxios";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

const JobDetail = () => {
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const axios = useAxios();
  const { id } = useParams();
  const [job, setJob] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3000/allJobs/${id}`).then((data) => {
      setJob(data.data);
    });
  }, [axios, id]);

  const randomYear = Math.floor(Math.random() * (2025 - 2010 + 1)) + 2010;
  const randomDay = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  const randomNumber = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  const randomView = Math.floor(Math.random() * (800 - 200 + 1)) + 200;

  if (!job) return <Loading></Loading>;

  const handleAccept = async () => {
    if (user.email === job.postedByEmail) {
      toast.error("You cannot accept your own job");
      return;
    }
    toast.loading("Loading...", { id: "accept-job" });

    try {
      await axios.post("/my-accepted-tasks", {
        ...job,
        jobId: job._id,
        userEmail: user.email,
        accepted_at: new Date().toISOString(),
      });
      toast.success("Job Accepted!", { id: "accept-job" });
    } catch (error) {
      toast.error(error.message || "Failed to accept job", {
        id: "accept-job",
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-300 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-gray-600 hover:text-[#f7ce3e] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span>Back to Jobs</span>
        </motion.button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Cover Image & Title Card */}
            <motion.div
              whileHover={{
                boxShadow: "0 0 15px 5px #f7ce3e",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden border border-secondary/50"
            >
              {/* Cover Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={job.coverImage}
                  alt={job.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-[#f7ce3e] text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {job.category}
                  </span>
                </div>
              </div>

              {/* Title Section */}
              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {job.title}
                </h1>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={18} />
                    <span className="text-sm">
                      Posted {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 font-bold text-lg">
                    <DollarSign size={18} />
                    <span>{job.price?.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleAccept}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn w-3/5 md:w-85/100 bg-[#f7ce3e] hover:bg-[#f7ce3e]/90 text-black font-bold border-none shadow-md"
                  >
                    Accept
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 10px #f7ce3e" }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-circle btn-outline border-gray-300 hover:border-[#f7ce3e] hover:text-[#f7ce3e]"
                  >
                    <Heart size={20} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 10px #f7ce3e" }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-circle btn-outline border-gray-300 hover:border-[#f7ce3e] hover:text-[#f7ce3e]"
                  >
                    <Share2 size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Summary */}
            <motion.div
              whileHover={{ boxShadow: "0 0 12px #f7ce3e" }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-8 border border-secondary/50"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#f7ce3e]/10 rounded-lg flex items-center justify-center">
                  <Briefcase size={18} className="text-[#f7ce3e]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Job Summary
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{job.summary}</p>
            </motion.div>

            {/* Full Description */}
            <motion.div
              whileHover={{ boxShadow: "0 0 12px #f7ce3e" }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-8 border border-secondary/50"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Full Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </motion.div>

            {/* Skills */}
            {job.skills && (
              <motion.div
                whileHover={{ boxShadow: "0 0 12px #f7ce3e" }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-secondary/50"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-[#f7ce3e]/10 rounded-lg flex items-center justify-center">
                    <Tag size={18} className="text-[#f7ce3e]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Skills Required
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {job.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="bg-[#f7ce3e]/20 text-[#f7ce3e] px-4 py-2 rounded-lg text-sm font-semibold border border-[#f7ce3e]/30 transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Experience */}
            {job.experienceRequired && (
              <motion.div
                whileHover={{ boxShadow: "0 0 12px #f7ce3e" }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-secondary/50"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-[#f7ce3e]/10 rounded-lg flex items-center justify-center">
                    <Award size={18} className="text-[#f7ce3e]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Experience Required
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {job.experienceRequired}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Posted By */}
            <motion.div
              whileHover={{ boxShadow: "0 0 12px #f7ce3e" }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-secondary/50 sticky top-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Posted By
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={job.postedByImage}
                    alt={job.postedBy}
                    className="w-15 h-15 rounded-full object-cover ring-4 ring-[#f7ce3e]/30"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{job.postedBy}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    {" "}
                    <span className="text-green-600">
                      <CircleCheck size={17} />
                    </span>
                    Verified Client
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <span className="text-sm truncate">{job.postedByEmail}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="text-sm">Member since {randomYear}</span>
                </div>
              </div>

              {/* Contact Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                className="btn w-full bg-[#f7ce3e] hover:bg-[#f7ce3e]/90 text-black font-bold border-none shadow-md"
              >
                Contact Client
              </motion.button>
            </motion.div>

            {/* Job Stats */}
            <motion.div
              whileHover={{ boxShadow: "0 0 12px #f7ce3e" }}
              transition={{ duration: 0.3 }}
              className="bg-linear-to-br from-[#f7ce3e] to-[#f7ce3e]/70 rounded-xl shadow-lg p-6 text-primary"
            >
              <h3 className="text-lg font-bold mb-4">Job Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-primary/80">Applications</span>
                  <span className="font-bold text-xl">{randomNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary/80">Views</span>
                  <span className="font-bold text-xl">{randomView}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary/80">Time Left</span>
                  <span className="font-bold text-xl">{randomDay} days</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
