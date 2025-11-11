import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import useAxios from "../hook/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const PostJob = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const price = form.price.value;
    const summary = form.summary.value;
    const description = form.description.value;
    const coverImage = form.coverImage.value;
    const skills = form.skills.value.split(",").map((s) => s.trim());
    const experienceRequired = form.experienceRequired.value;

    if (!title || !category || !price || !summary || !coverImage) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const jobData = {
      title,
      category,
      price: parseFloat(price),
      summary,
      description,
      coverImage,
      skills,
      experienceRequired,
      postedBy: user?.displayName || "Anonymous",
      postedByEmail: user?.email || "N/A",
      postedByImage:
        user?.photoURL || "https://www.w3schools.com/howto/img_avatar.png",
      created_at: new Date().toISOString(),
    };

    console.log("Job Data:", jobData);

    try {
      await axios.post("/addJob", jobData);
      Swal.fire({
        title: "Job posted successfully!",
        icon: "success",
        draggable: true,
      });
      form.reset();
      setTimeout(() => {
        navigate("/all-jobs");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="min-h-screen bg-base-300 py-15 flex justify-center items-center">
      <motion.div
        whileHover={{ boxShadow: "0 0 5px 2px #f7ce3e" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8 border border-secondary/30"
      >
        <motion.h2
                className="text-3xl font-semibold text-black text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Post A New Job
              </motion.h2>
              <motion.p
                className="mb-5 text-gray-700 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Create a new task and find the right person for the job
              </motion.p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Job Title */}
          <div>
            <label className="block font-medium text-primary mb-1">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              placeholder=" Frontend Developer"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-primary mb-1">
              Category *
            </label>
            <select
              name="category"
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Category</option>
              <option>Web Development</option>
              <option>Graphic Design</option>
              <option>Digital Marketing</option>
              <option>UI/UX Design</option>
              <option>Mobile Development</option>
              <option>AI & Machine Learning</option>
              <option>Cybersecurity</option>
              <option>Blockchain</option>
              <option>Data Analysis</option>
              <option>Management</option>
              <option>Other</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium text-primary mb-1">
              Budget / Price ($) *
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter your offered price"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block font-medium text-primary mb-1">
              Short Summary *
            </label>
            <input
              type="text"
              name="summary"
              placeholder="A short summary of the job"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-primary mb-1">
              Full Description *
            </label>
            <textarea
              name="description"
              placeholder="Detailed job description..."
              className="textarea textarea-bordered w-full"
              rows="6"
              required
            ></textarea>
          </div>

          {/* Skills */}
          <div>
            <label className="block font-medium text-primary mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              placeholder=" React, Node.js, MongoDB"
              className="input input-bordered w-full"
            />
          </div>

          {/* Experience Required */}
          <div>
            <label className="block font-medium text-primary mb-1">
              Experience Required
            </label>
            <input
              type="text"
              name="experienceRequired"
              placeholder=" 3+ years in frontend development"
              className="input input-bordered w-full"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block font-medium text-primary mb-1">
              Cover Image URL *
            </label>
            <input
              type="url"
              name="coverImage"
              placeholder="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Posted By Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-primary mb-1">
                Posted By
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium text-primary mb-1">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="btn bg-secondary text-primary font-semibold hover:bg-secondary/80 w-full"
            >
              Post Job
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PostJob;
