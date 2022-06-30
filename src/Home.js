import React from "react";
import "./style.css";
import "./index.js";

const Home = () => {
  return (
    <div className='editor'>
      <div className='header'>
        <h1>Recipe Keeper</h1>
      </div>
      <div className='blue'>
        <p className='welcome'>
          Welcome to Recipe Keeper! I developed this app because I wanted a
          better option for saving recipes, as previously I was just pasting
          links into a note on my phone. It wasn't handy when it came time to
          find a particular recipe, it was annoying at best. So I decided to
          develop my own app! Would it have been easier to go to the play store
          and search for one? 100%. But here we are!
        </p>
      </div>
    </div>
  );
};

export default Home;
