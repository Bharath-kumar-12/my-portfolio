function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-80 backdrop-blur-md px-8 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white">
        Bharath<span className="text-yellow-400">.</span>
      </h1>

      {/* Nav Links */}
      <ul className="flex gap-8 text-gray-300 font-medium">
        <li><a href="#about" className="hover:text-yellow-400 transition">About</a></li>
        <li><a href="#projects" className="hover:text-yellow-400 transition">Projects</a></li>
        <li><a href="#skills" className="hover:text-yellow-400 transition">Skills</a></li>
        <li><a href="#contact" className="hover:text-yellow-400 transition">Contact</a></li>
      </ul>

    </nav>
  );
}

export default Navbar;