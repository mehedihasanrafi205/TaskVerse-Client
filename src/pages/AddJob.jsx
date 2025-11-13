import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import useAxios from "../hook/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Sparkles } from "lucide-react";

const PostJob = () => {
  const { user, setRefetch, refetch } = useContext(AuthContext);
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

    // console.log("Job Data:", jobData);

    try {
      await axios.post("/addJob", jobData);
      Swal.fire({
        title: "Job posted successfully!",
        icon: "success",
        draggable: true,
      });
      form.reset();
      setRefetch(!refetch);
      setTimeout(() => {
        navigate("/all-jobs");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="min-h-screen  py-25 flex justify-center items-center">
      <motion.div
        whileHover={{ boxShadow: "0 0 5px 2px #f7ce3e" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-base-200/80 w-full max-w-2xl rounded-2xl shadow-lg p-8 border border-secondary/30 hover:border-secondary/60"
      >
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
              Job Post
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-content">
            Post A New
            <span className="text-secondary logo-font ms-2 ">Job</span>
          </h2>
          <p className="text-secondary-content/80  max-w-2xl mx-auto">
            Create a new task and find the right person for the job
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
       
          <div>
            <label className="block font-medium text-primary-content mb-1">
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

        
          <div>
            <label className="block font-medium text-primary-content mb-1">
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

      
          <div>
            <label className="block font-medium text-primary-content mb-1">
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

      
          <div>
            <label className="block font-medium text-primary-content mb-1">
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

       
          <div>
            <label className="block font-medium text-primary-content mb-1">
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

          <div>
            <label className="block font-medium text-primary-content mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              placeholder=" React, Node.js, MongoDB"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-medium text-primary-content mb-1">
              Experience Required
            </label>
            <input
              type="text"
              name="experienceRequired"
              placeholder=" 3+ years in frontend development"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-medium text-primary-content mb-1">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-primary-content mb-1">
                Posted By
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full "
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
                className="input input-bordered w-full "
              />
            </div>
          </div>

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
