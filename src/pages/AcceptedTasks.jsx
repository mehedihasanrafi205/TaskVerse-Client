import React, { useEffect, useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import useAxios from "../hook/useAxios";
import Swal from "sweetalert2";
import {
  Check,
  X,
  User,
  Calendar,
  Tag,
  Briefcase,
  Plus,
  FileCheck,
  Sparkles,
} from "lucide-react";
import Loading from "../components/Loading";
import { Link } from "react-router";
import toast from "react-hot-toast";

const MyAcceptedTasks = () => {
  const { user, refetch, setRefetch } = use(AuthContext);
  const axios = useAxios();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`/my-accepted-tasks?email=${user.email}`)
        .then((res) => {
          setTasks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [axios, user, refetch]);

  const handleRemove = async (id, type) => {
    const removedTask = tasks.find((task) => task._id === id);
    setTasks(tasks.filter((task) => task._id !== id));

    try {
      await axios.delete(`/my-accepted-tasks/${id}`);
      setRefetch(!refetch);
      {
        type === "done"
          ? toast.success("Task Completed!")
          : toast.error("Task Cancelled");
      }
    } catch (error) {
      setTasks((prev) => [...prev, removedTask]);

      toast.error("Action failed! Try again.");
    }
  };

  if (loading) return <Loading />;

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileCheck className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-primary-content mb-2">
          No tasks accepted yet
        </h3>
        <p className="text-secondary-content mb-6">
          Start by accepting your first task to get going.
        </p>
        <Link to="/all-jobs">
          <button className="btn bg-secondary text-primary hover:bg-secondary/90 border-none hover:shadow-[0_0_20px_rgba(247,206,62,0.5)] transition-all duration-300">
            <Plus size={20} />
            Browse Tasks
          </button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
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
                  Accepted Task
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-content">
                My Accepted
                <span className="text-secondary logo-font ms-2 ">Tasks</span>
              </h2>
              <p className="text-secondary-content/80  max-w-2xl mx-auto">
                Manage your ongoing projects and commitments
              </p>
            </motion.div>
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-lg text-secondary-content/80">
              Total Tasks:
            </span>
            <span className="text-3xl font-bold text-secondary">
              {tasks?.length}
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
              Add New Task
            </motion.button>
          </Link>
        </motion.div>

        <div className="space-y-5">
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                whileHover={{ boxShadow: "0 0 5px 2px #f7ce3e" }}
                key={task._id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  height: 0,
                  marginBottom: 0,
                  transition: { duration: 0.3 },
                }}
                className="bg-base-200/80 border  border-secondary/30 hover:border-secondary/60 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col md:flex-row "
              >
                <div className="md:w-1/3 h-[220px] overflow-hidden relative">
                  <img
                    src={
                      task.coverImage || "https://via.placeholder.com/600x400"
                    }
                    alt={task.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />

                  <span className="absolute top-3 left-3 bg-primary/90 text-[#F7CE3E] text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    In Progress
                  </span>
                </div>

                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-semibold text-primary-content line-clamp-1">
                        {task.title}
                      </h3>
                      <span className="badge badge-outline border-[#F7CE3E] text-secondary-content/90 bg-[#F7CE3E]/20">
                        <Tag size={14} className="mr-1" />
                        {task.category || "General"}
                      </span>
                    </div>

                    <p className="text-secondary-content/80 mb-3 leading-snug text-sm line-clamp-2">
                      {task.summary ||
                        "Complete this task following the best freelance practices."}
                    </p>

                    <div className="flex gap-4 text-xs text-secondary-content/60">
                      <div className="flex items-center gap-1">
                        <User size={13} />
                        <span>{task.postedBy || "Client"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={13} />
                        <span>
                          {new Date(task.accepted_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleRemove(task._id, "done")}
                      className="btn  bg-primary-content text-base-200 border-none hover:bg-primary-content/80"
                    >
                      <Check size={14} />
                      Done
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleRemove(task._id, "cancel")}
                      className="btn  bg-[#F7CE3E] text-primary border-none hover:bg-[#FFD84C]"
                    >
                      <X size={14} />
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyAcceptedTasks;
