import React from 'react';
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";

const Home = ({ data }) => {
  return (
    <>
      <Hero data={data?.about} />
      <About data={data?.about} stats={data?.stats} />
      <Skills skills={data?.skills} />
      <Projects projects={data?.projects} />
      <Experience experience={data?.experience} data={data?.about} />
      <Contact />
    </>
  );
};

export default Home;
