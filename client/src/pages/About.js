import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import "../CSS/about.css"
import Navbar from "../Componenets/Navbar";

function About() {
  const [state] = useState({
    title: "Hello everyone",
    titleTwo: "Contact me for"
  });

  return (
    <>
      <Navbar />

      <div className="home">

        <div className="home-intro" id="content-div">
          <h2>
            <div className="title">{state.title}</div>
          </h2>
          <h2>
            <div className="titleTwo ">{state.titleTwo}</div>
          </h2>

          <div className="text">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 40,
                strings: [
                  "Web App Development",
                  "Full-stack Development",
                  "Your DREAM project"
                ],
              }}
            />
          </div>
        </div>

      </div>
    </>
  );
}

export default About;