import React from "react";

import { motion } from "framer-motion";
import { Clock, Shield, Sparkles, Users } from "lucide-react";

// ============ WHY CHOOSE US COMPONENT ============
const features = [
  {
    icon: Shield,
    title: "Secure Payments",
    desc: "Your transactions are protected with industry-grade security and encryption.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Clock,
    title: "Quick Hiring",
    desc: "Post jobs and connect with skilled professionals instantly within minutes.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Users,
    title: "Trusted Community",
    desc: "Join a vibrant network of 10,000+ verified clients and freelancers.",
    color: "from-purple-500 to-pink-600",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 mb-40 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
              Why Choose Us
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-content">
            Why <span className="text-secondary logo-font">TaskVerse</span> Stands Out?
          </h2>
          <p className="text-secondary-content/80  max-w-2xl mx-auto">
            We're dedicated to connecting talent with opportunity—securely,
            efficiently, and globally
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, boxShadow: "0 0 5px 2px #f7ce3e"}}
                className="group relative rounded-3xl"
              >
                <div className="relative bg-[#042d2ef6] backdrop-blur-xl p-8 rounded-3xl border border-secondary/50 hover:border-secondary transition-all duration-300 overflow-hidden h-full">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-linear-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-[0_0_30px_rgba(247,206,62,0.3)]`}
                  >
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </motion.div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-secondary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="divider before:bg-secondary/30 after:bg-secondary/30 my-8"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-8 mt-6 pt-6 "
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
              10K+
            </div>
            <div className="text-secondary-content/80">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
              5K+
            </div>
            <div className="text-secondary-content/80">Jobs Posted</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl  font-bold text-secondary mb-2">
              98%
            </div>
            <div className="text-secondary-content/80">Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
