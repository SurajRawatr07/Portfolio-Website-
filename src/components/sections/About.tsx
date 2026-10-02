import React from 'react';
import AboutMe from './AboutMe';
import Services from './Services';
import TechStack from './TechStack';

interface AboutProps {
  techStackRef?: React.RefObject<HTMLDivElement | null>;
}

const About: React.FC<AboutProps> = ({ techStackRef }) => {
  return (
    <>
      <AboutMe />
      <Services />
      <div ref={techStackRef}>
        <TechStack />
      </div>
    </>
  );
};

export default About;
