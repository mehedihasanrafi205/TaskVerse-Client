import React, { useState, use } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Edit,
  Camera,
  Save,
  X,
  Award,
  Star,
  DollarSign,
  Clock,
} from "lucide-react";

const Profile = () => {
  const { user, updateUserProfile } = use(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || "John Doe",
    email: user?.email || "john@example.com",
    phone: "+880 1711 123456",
    location: "Dhaka, Bangladesh",
    bio: "Freelancer specializing in web development and design. Passionate about creating user-focused digital experiences.",
    title: "Full Stack Developer",
    hourlyRate: "$50",
    experience: "5+ years",
    skills: ["React", "Node.js", "JavaScript", "Tailwind CSS", "MongoDB"],
    photoURL: user?.photoURL || "https://via.placeholder.com/150",
  });

  const handleSave = async () => {
    try {
      await updateUserProfile(profileData.displayName, user?.photoURL);

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile information has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: error.message,
        confirmButtonColor: "#F7CE3E",
      });
    }
  };

  const stats = [
    {
      icon: Briefcase,
      label: "Jobs Completed",
      value: "47",
      color: "text-blue-600",
    },
    { icon: Star, label: "Rating", value: "4.9", color: "text-yellow-600" },
    {
      icon: DollarSign,
      label: "Earned",
      value: "$12.5K",
      color: "text-green-600",
    },
    {
      icon: Clock,
      label: "Response",
      value: "2 hrs",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <motion.div
          whileHover={{ boxShadow: "0 0 5px 2px #f7ce3e" }}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-200/80 rounded-2xl shadow-xl overflow-hidden border border-secondary/30"
        >
          {/* Cover Image */}
          <div className="relative h-48 bg-base-300">
            <div className="absolute inset-0 bg-black/20" />
            <img
              className="h-full w-full object-cover"
              src="https://media.licdn.com/dms/image/v2/C561BAQGpxRlo9gp3cQ/company-background_10000/company-background_10000/0/1585466636525/withel_cover?e=2147483647&v=beta&t=PCEp6-UUEB0lzhUbmL5dbMVtc2B5JCBUGeAczZHQYQw"
              alt=""
            />
            <button className="absolute top-4 right-4 btn btn-sm btn-circle bg-secondary/20 hover:bg-secondary/30 border-none backdrop-blur-sm text-primary-content">
              <Camera size={18} />
            </button>
          </div>

          {/* Avatar & Info */}
          <div className="relative px-8 pb-8 -mt-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-secondary/50 shadow-lg bg-gray-100">
                <img
                  src={profileData.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <button className="absolute bottom-2 right-2 btn btn-sm btn-circle bg-secondary/80 text-primary border-none">
                  <Camera size={16} />
                </button>
              </div>

              {/* Edit / Save Buttons */}
              <div className="flex gap-2">
                {!isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsEditing(true)}
                    className="btn btn-success text-gray-50"
                  >
                    <Edit size={18} />
                    Edit
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={handleSave}
                      className="btn bg-green-600 text-white border-none hover:bg-green-700"
                    >
                      <Save size={18} />
                      Save
                    </motion.button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn btn-outline btn-error"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Name & Title */}
            <div className="mt-6 space-y-1">
              {isEditing ? (
                <div className="space-y-3 max-w-md">
                  <input
                    type="text"
                    value={profileData.displayName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        displayName: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                    placeholder="Full Name"
                  />
                  <input
                    type="text"
                    value={profileData.title}
                    onChange={(e) =>
                      setProfileData({ ...profileData, title: e.target.value })
                    }
                    className="input input-bordered w-full"
                    placeholder="Job Title"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-primary-content">
                    {profileData.displayName}
                  </h1>
                  <p className="text-lg text-secondary-content/80">
                    {profileData.title}
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* ==== STATS ==== */}
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ boxShadow: "0 0 5px 2px #f7ce3e" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-base-200/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition border border-secondary/30 hover:border-secondary/60 "
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <span className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </span>
                </div>
                <p className="text-secondary-content/70 text-sm">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ==== ABOUT & SKILLS ==== */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ boxShadow: "0 0 5px 2px #f7ce3e" }}
              className="bg-base-200/80 rounded-2xl shadow-lg p-6 border border-secondary/30 hover:border-secondary/60"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-[#f7ce3e]/10 rounded-lg flex items-center justify-center">
                  <User size={23} className="text-[#f7ce3e]" />
                </div>
                <h2 className="text-2xl font-bold text-primary-content">
                  About Me
                </h2>
              </div>

              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-secondary-content/80 leading-relaxed">
                  {profileData.bio}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ boxShadow: "0 0 5px 2px #f7ce3e" }}
              className="bg-base-200/80 rounded-2xl shadow-lg p-6 border border-secondary/30 hover:border-secondary/60"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-[#f7ce3e]/10 rounded-lg flex items-center justify-center">
                  <Award size={23} className="text-[#f7ce3e]" />
                </div>
                <h2 className="text-2xl font-bold text-primary-content">
                  Skills
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-[#f7ce3e]/20 text-[#f7ce3e] px-4 py-2 rounded-lg text-sm font-semibold border border-[#f7ce3e]/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ boxShadow: "0 0 5px 2px #f7ce3e" }}
              className="bg-base-200/80 rounded-2xl shadow-lg p-6 border border-secondary/30 hover:border-secondary/60"
            >
              <h3 className="text-xl font-bold text-primary-content mb-4">
                Quick Info
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-secondary-content/60">
                    Hourly Rate
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {profileData.hourlyRate}/hr
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-content/60">
                    Experience
                  </p>
                  <p className="font-semibold text-secondary-content">
                    {profileData.experience}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-content/60 font-medium mb-1">
                    Availability
                  </p>
                  <span className="badge bg-green-500/10 text-green-700 border border-green-500/20 px-4 py-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Available Now
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-base-200/80 rounded-2xl p-6 text-white shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">Want to work together?</h3>
              <p className="text-white/80 mb-4 text-sm">
                Let’s discuss your project and bring your ideas to life!
              </p>
              <button className="btn btn-secondary  w-full border-none ">
                Contact Me
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
