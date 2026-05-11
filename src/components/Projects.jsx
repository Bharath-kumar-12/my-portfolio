function Projects() {
  return (
    <section id="projects" className="bg-zinc-900 py-20 px-8">

      <h2 className="text-4xl font-bold text-center text-white mb-16">
        My <span className="text-yellow-400">Projects</span>
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-black border border-zinc-700 rounded-2xl p-6 hover:border-yellow-400 transition duration-300">
          <h3 className="text-xl font-bold text-white mb-3">Portfolio Website</h3>
          <p className="text-gray-400 mb-4">My personal portfolio built with React and Tailwind CSS.</p>
          <div className="flex gap-2 mb-6">
            <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">React</span>
            <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">Tailwind</span>
          </div>
          <a href="#" className="text-yellow-400 font-medium hover:underline">View Project</a>
        </div>

        <div className="bg-black border border-zinc-700 rounded-2xl p-6 hover:border-yellow-400 transition duration-300">
          <h3 className="text-xl font-bold text-white mb-3">E-Commerce App</h3>
          <p className="text-gray-400 mb-4">A full featured online shopping app with cart and payments.</p>
          <div className="flex gap-2 mb-6">
            <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">React</span>
            <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">Node.js</span>
          </div>
          <a href="#" className="text-yellow-400 font-medium hover:underline">View Project</a>
        </div>

        <div className="bg-black border border-zinc-700 rounded-2xl p-6 hover:border-yellow-400 transition duration-300">
          <h3 className="text-xl font-bold text-white mb-3">Weather App</h3>
          <p className="text-gray-400 mb-4">Real-time weather app using OpenWeather API.</p>
          <div className="flex gap-2 mb-6">
            <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">React</span>
            <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">API</span>
          </div>
          <a href="#" className="text-yellow-400 font-medium hover:underline">View Project</a>
        </div>

      </div>

    </section>
  );
}

export default Projects;