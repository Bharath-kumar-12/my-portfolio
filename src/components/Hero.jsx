function Hero() {
  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
      
      {/* Greeting */}
      <p className="text-yellow-400 text-lg font-medium mb-2">Hey there, I'm</p>

      {/* Name */}
      <h1 className="text-6xl font-bold text-white mb-4">
        Bharath
      </h1>

      {/* Title */}
      <h2 className="text-2xl text-gray-400 mb-6">
        Frontend Developer
      </h2>

      {/* Description */}
      <p className="text-gray-500 max-w-xl mb-8">
        I build beautiful, responsive and creative websites. 
        Passionate about clean code and great design.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <a href="#projects" className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition">
          View Projects
        </a>
        <a href="#contact" className="border border-yellow-400 text-yellow-400 font-bold px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-black transition">
          Contact Me
        </a>
      </div>

    </section>
  );
}

export default Hero;