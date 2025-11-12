import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import useAxios from "../hook/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import {
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Briefcase,
  Calendar,
  Plus,
  Tag,
  Sparkles,
} from "lucide-react";
import Loading from "../components/Loading";

const MyAddedJobs = () => {
  const { user, setRefetch, refetch } = use(AuthContext);
  const axios = useAxios();
  const [loading, setLoading] = useState(true);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get(`/myAddedJobs/?email=${user.email}`).then((data) => {
      setJobs(data.data);
      setLoading(false);
    });
  }, [axios, user, refetch]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F7CE3E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      customClass: {
        confirmButton:
          "btn bg-secondary text-primary hover:bg-secondary/90 border-none",
        cancelButton: "btn btn-outline btn-error",
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/deleteJob/${id}`);
        setLoading(false);
        setJobs(jobs.filter((job) => job._id !== id));
        setRefetch(!refetch);

        await Swal.fire({
          title: "Deleted!",
          text: "Your job post has been deleted.",
          icon: "success",
          confirmButtonColor: "#F7CE3E",
          customClass: {
            confirmButton:
              "btn bg-secondary text-primary hover:bg-secondary/90 border-none",
          },
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.message || "Failed to delete post",
          confirmButtonColor: "#F7CE3E",
        });
      }
    }
  };
  if (loading) return <Loading></Loading>;

  if (jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <Briefcase className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-primary-content mb-2">
          No jobs posted yet
        </h3>
        <p className="text-secondary-content mb-6">
          Start by posting your first job opportunity
        </p>
        <Link to="/add-job">
          <button className="btn bg-secondary text-primary hover:bg-secondary/90 border-none hover:shadow-[0_0_20px_rgba(247,206,62,0.5)] transition-all duration-300">
            <Plus size={20} />
            Post Your First Job
          </button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-300 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="text-sm font-semibold text-secondary">
                  Added Jobs
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-content">
                My Added
                <span className="text-secondary logo-font ms-2 ">Jobs</span>
              </h2>
              <p className="text-secondary-content/80  max-w-2xl mx-auto">
                Manage jobs you have posted on TaskVerse
              </p>
            </motion.div>
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-lg text-secondary-content/80">
              Total Jobs:
            </span>
            <span className="text-3xl font-bold text-secondary">
              {jobs?.length}
            </span>
          </div>

          {/* Add New Job Button */}
          <Link to="/add-job">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-secondary text-primary hover:bg-secondary/90 border-none shadow-lg hover:shadow-[0_0_20px_rgba(247,206,62,0.5)] transition-all duration-300"
            >
              <Plus size={20} />
              Add New Job
            </motion.button>
          </Link>
        </motion.div>
        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <motion.div
              whileHover={{ boxShadow: "0 0 5px 2px #f7ce3e" }}
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-base-200/80 rounded-2xl shadow-lg overflow-hidden border  border-secondary/30 hover:border-secondary/60 group"
            >
              <div className="grid md:grid-cols-12 gap-4 p-6">
                {/* Job Image */}
                <div className="md:col-span-3">
                  <div className="relative rounded-xl overflow-hidden h-40 md:h-full">
                    <img
                      src={job.coverImage}
                      alt={job.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-secondary/50 transition-all duration-300 rounded-xl" />
                  </div>
                </div>

                {/* Job Details */}
                <div className="md:col-span-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-content mb-2 group-hover:text-secondary transition-colors duration-300">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap gap-3 mb-3">
                      <span className="badge badge-outline border-[#F7CE3E] text-secondary-content/90 bg-[#F7CE3E]/20 hover:shadow-[0_0_15px_rgba(4,42,43,0.3)] transition-all duration-300">
                        <Tag size={15} className="mr-1" />
                        {job.category || "General"}
                      </span>
                      <div className="flex items-center gap-1 text-green-600 font-bold group-hover:drop-shadow-[0_0_8px_rgba(247,206,62,0.6)] transition-all duration-300">
                        <DollarSign size={18} />
                        <span className="text-lg ">
                          {job.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <p className="text-secondary-content/80 line-clamp-2 mb-3">
                      {job.summary || job.description}
                    </p>

                    {job.created_at && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={16} />
                        <span>
                          Posted:{" "}
                          {new Date(job.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-3 flex flex-col justify-center gap-3">
                  {/* Stats */}
                  <div className="bg-accent  border border-secondary/20 rounded-xl p-4 mb-2 hover:bg-linear-to-br hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-secondary-content/90">
                        Applications
                      </span>
                      <span className="font-bold text-primary-content">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-secondary-content/90">
                        Views
                      </span>
                      <span className="font-bold text-primary-content">
                        127
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/job-detail/${job._id}`}
                      className="btn btn-sm btn-outline border-primary-content text-primary-content  hover:text-white hover:shadow-[0_0_15px_rgba(4,42,43,0.4)] w-full transition-all duration-300"
                    >
                      <Eye size={16} />
                      View Details
                    </Link>

                    <Link
                      to={`/Update-job/${job._id}`}
                      className="btn btn-sm bg-secondary text-primary hover:bg-secondary/90 border-none hover:shadow-[0_0_20px_rgba(247,206,62,0.5)] w-full transition-all duration-300"
                    >
                      <Edit size={16} />
                      Edit Job
                    </Link>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDelete(job._id)}
                      className="btn btn-sm btn-outline btn-error hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] w-full transition-all duration-300"
                    >
                      <Trash2 size={16} />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Desktop Table View */}
        <div className="hidden xl:block mt-12 bg-base-200/80 rounded-2xl shadow-lg overflow-hidden border border-secondary/80">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-linear-to-r from-primary via-[#053234] to-[#064548] text-white">
                <tr>
                  <th className="text-base">#</th>
                  <th className="text-base">Image</th>
                  <th className="text-base">Job Title</th>
                  <th className="text-base">Category</th>
                  <th className="text-base">Price</th>
                  <th className="text-base">Date Posted</th>
                  <th className="text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr
                    key={job._id}
                    className="hover:bg-linear-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 hover:shadow-[inset_0_0_20px_rgba(247,206,62,0.1)]"
                  >
                    <td className="font-semibold">{index + 1}</td>
                    <td>
                      <div className="avatar group">
                        <div className="rounded-lg h-16 w-24 overflow-hidden ring-2 ring-transparent group-hover:ring-secondary/50 transition-all duration-300">
                          <img
                            src={job.coverImage}
                            alt={job.title}
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold text-primary-content hover:text-primary transition-colors duration-300">
                      {job.title}
                    </td>
                    <td>
                      <span className="badge badge-secondary text-primary hover:shadow-[0_0_15px_rgba(247,206,62,0.4)] transition-all duration-300">
                        {job.category}
                      </span>
                    </td>
                    <td className="font-bold text-green-600 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.4)] transition-all duration-300">
                      ${job.price.toLocaleString()}
                    </td>
                    <td className="text-secondary-content/80">
                      {job.created_at
                        ? new Date(job.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/Update-job/${job._id}`}
                          className="btn btn-sm bg-secondary text-primary hover:bg-secondary/90 border-none hover:shadow-[0_0_15px_rgba(247,206,62,0.5)] transition-all duration-300"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="btn btn-sm btn-outline btn-error hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAddedJobs;
