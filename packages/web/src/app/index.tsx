import React, { useState } from "react";
import daveCaveBar from "./dave-cave-bar.png";
import navImage from "./dave.jpg";
import { Twitter, Github, Twitch, Instagram, Linkedin, X, User, FileText, Code, ArrowDown } from "lucide-react";

function App(): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Toggle Drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-10 bg-transparent">
        <div className="h-16 flex items-center justify-start p-4">
          <img
            src={navImage}
            alt="Navbar Image"
            className="h-12 w-12 rounded-full cursor-pointer"
            onClick={toggleDrawer}
          />
        </div>
      </nav>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-20 w-full sm:w-64`}
      >
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-400"
          onClick={toggleDrawer}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6 text-white space-y-6">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6" />
            <a href="#about" className="text-lg hover:text-yellow-400">
              About Me
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <a href="#blog" className="text-lg hover:text-yellow-400">
              Blog
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Code className="h-6 w-6" />
            <a href="#projects" className="text-lg hover:text-yellow-400">
              Pet Projects
            </a>
          </div>
        </div>
      </div>

      {/* Main Section with Background Image */}
      <div
        className="relative h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${daveCaveBar})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div
          className="relative h-full flex flex-col items-center justify-center text-center px-4"
          style={{ transform: "translateY(5%)" }}
        >
          <div className="flex space-x-1 sm:space-x-2">
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-6" />
            </a>
            <a
              href="https://github.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-400 hover:text-gray-400 transition-colors duration-200"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-6" />
            </a>
            <a
              href="https://twitch.tv/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitch"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
            >
              <Twitch className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-6" />
            </a>
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-6" />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-6" />
            </a>
          </div>

          {/* Down Arrow for "Say Hi" */}
          <div className="absolute bottom-6 sm:bottom-12 flex flex-col items-center">
            <p className="text-sm sm:text-base text-gray-400 mb-1 sm:mb-2">Say Hi</p>
            <a href="#sayhi">
              <ArrowDown className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-gray-400 hover:text-yellow-400 transition-colors duration-200" />
            </a>
          </div>
        </div>
      </div>

      {/* "Say Hi" Section */}
      <section id="sayhi" className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      </section>
    </div>
  );
}

export default App;

