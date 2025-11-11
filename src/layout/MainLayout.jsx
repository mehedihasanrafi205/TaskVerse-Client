import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import ClickSpark from "../components/ClickSpark";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-300">
      <Navbar />
      <section className="flex-1">
        <ClickSpark
          sparkColor="#f7ce3e"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <Outlet />
        </ClickSpark>
      </section>
      <Footer />
    </div>
  );
};

export default MainLayout;
