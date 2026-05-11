function Skills() {
  return (
    <section id="skills" className="bg-black py-20 px-8">

      <h2 className="text-4xl font-bold text-center text-white mb-16">
        My <span className="text-yellow-400">Skills</span>
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-center hover:border-yellow-400 transition duration-300">
          <p className="text-4xl mb-3">⚛️</p>
          <p className="text-white font-bold">React.js</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-center hover:border-yellow-400 transition duration-300">
          <p className="text-4xl mb-3">🎨</p>
          <p className="text-white font-bold">Tailwind CSS</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-center hover:border-yellow-400 transition duration-300">
          <p className="text-4xl mb-3">🟨</p>
          <p className="text-white font-bold">JavaScript</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-center hover:border-yellow-400 transition duration-300">
          <p className="text-4xl mb-3">🌐</p>
          <p className="text-white font-bold">HTML & CSS</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-center hover:border-yellow-400 transition duration-300">
          <p className="text-4xl mb-3">🐙</p>
          <p className="text-white font-bold">Git & GitHub</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-center hover:border-yellow-400 transition duration-300">
          <p className="text-4xl mb-3">🗄️</p>
          <p className="text-white font-bold">MongoDB</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-center hover:border-yellow-400 transition duration-300">
          <p className="text-4xl mb-3">🟢</p>
          <p className="text-white font-bold">Node.js</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-center hover:border-yellow-400 transition duration-300">
          <p className="text-4xl mb-3">🔷</p>
          <p className="text-white font-bold">TypeScript</p>
        </div>

      </div>

    </section>
  );
}

export default Skills;