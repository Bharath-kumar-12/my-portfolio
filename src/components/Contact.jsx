function Contact() {
  return (
    <section id="contact" className="bg-zinc-900 py-20 px-8">

      <h2 className="text-4xl font-bold text-center text-white mb-16">
        Contact <span className="text-yellow-400">Me</span>
      </h2>

      <div className="max-w-2xl mx-auto bg-black border border-zinc-700 rounded-2xl p-10">

        {/* Name */}
        <div className="mb-6">
          <label className="text-gray-400 mb-2 block">Your Name</label>
          <input
            type="text"
            placeholder="Bharath"
            className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="text-gray-400 mb-2 block">Your Email</label>
          <input
            type="email"
            placeholder="bharath@gmail.com"
            className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
          />
        </div>

        {/* Message */}
        <div className="mb-8">
          <label className="text-gray-400 mb-2 block">Your Message</label>
          <textarea
            rows="5"
            placeholder="Hello Bharath, I'd like to work with you..."
            className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
          />
        </div>

        {/* Button */}
        <button className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition duration-300">
          Send Message 🚀
        </button>

      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-8 mt-12 text-gray-400">
        <a href="#" className="hover:text-yellow-400 transition">GitHub</a>
        <a href="#" className="hover:text-yellow-400 transition">LinkedIn</a>
        <a href="#" className="hover:text-yellow-400 transition">Twitter</a>
      </div>

    </section>
  );
}

export default Contact;