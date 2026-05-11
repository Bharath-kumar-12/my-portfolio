function About() {
  return (
    <section id="about" className="bg-black py-20 px-8">
      
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-center text-white mb-16">
        About <span className="text-yellow-400">Me</span>
      </h2>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Photo */}
        <div className="w-64 h-64 rounded-full border-4 border-yellow-400 overflow-hidden flex-shrink-0">
          <img
            src="https://avatar.iran.liara.run/public/boy"
            alt="Bharath"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Hi, I'm Bharath 👋
          </h3>
          <p className="text-gray-400 mb-4">
            I'm a passionate Frontend Developer based in Chennai, India. 
            I love building modern, responsive websites with clean and creative designs.
          </p>
          <p className="text-gray-400 mb-6">
            I work with React.js, Tailwind CSS, and JavaScript to bring ideas to life. 
            Always learning, always growing! 🚀
          </p>

          {/* Info */}
          <div className="flex flex-col gap-2 text-gray-300">
            <p>📍 <span className="text-yellow-400">Location:</span> Chennai, India</p>
            <p>🎓 <span className="text-yellow-400">Role:</span> Frontend Developer</p>
            <p>📧 <span className="text-yellow-400">Email:</span> bharath@gmail.com</p>
          </div>
        </div>

      </div>

    </section>
  );
}

export default About;