import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Paintbrush,
  PenTool,
  Video,
  Megaphone,
  Cpu,
  Briefcase,
  Globe,
  BarChart,
  Wrench,
  Sparkles,
} from "lucide-react";

const categories = [
  { name: "Web Development", icon: Code, jobs: "1,234" },
  { name: "Graphic Design", icon: Paintbrush, jobs: "856" },
  { name: "Content Writing", icon: PenTool, jobs: "642" },
  { name: "Video Editing", icon: Video, jobs: "523" },
  { name: "Digital Marketing", icon: Megaphone, jobs: "789" },
  { name: "Software Testing", icon: Cpu, jobs: "456" },
  { name: "Project Management", icon: Briefcase, jobs: "398" },
  { name: "SEO Optimization", icon: Globe, jobs: "612" },
  { name: "Data Analysis", icon: BarChart, jobs: "734" },
  { name: "Technical Support", icon: Wrench, jobs: "445" },
];

const TopCategories = () => {
  return (
    <section className="py-20  relative overflow-hidden">
      {/* subtle background pattern */}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#f7ce3e]/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-semibold text-secondary">
              Popular Categories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-content mb-4">
            Explore Top{" "}
            <span className="text-[#f7ce3e] drop-shadow-md logo-font ">
              Categories
            </span>
          </h2>
          <p className="text-secondary-content/80 max-w-2xl mx-auto">
            Discover trending job fields and grow your freelance career with the
            most in-demand skills.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  scale: 1.07,
                  y: -5,
                  boxShadow: "0 0 5px 2px #f7ce3e",
                }}
                className="group bg-base-300 backdrop-blur-md border border-secondary/50 hover:border-secondary/80 rounded-2xl shadow-sm p-6 hover:bg-[#042A2B] transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#f7ce3e]/40 group-hover:bg-[#f7ce3e] transition-all duration-300">
                    <Icon
                      className="w-8 h-8 text-primary-content group-hover:text-white transition-colors duration-300"
                      strokeWidth={1.6}
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-primary-content group-hover:text-[#f7ce3e] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-secondary-content/80 group-hover:text-gray-200 transition-colors">
                    {cat.jobs} Jobs
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
