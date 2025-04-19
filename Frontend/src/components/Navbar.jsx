import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaPlusCircle } from "react-icons/fa"; // Importing the icons

const Navbar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Explore", path: "/sites", icon: <FaSearch /> },
    { name: "Submit", path: "/submit", icon: <FaPlusCircle /> },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-md z-50 px-6 py-3 rounded-full flex items-center justify-between max-w-[90%] md:max-w-3xl w-full border border-gray-200">
      {/* Brand Name */}
      <Link to="/" className="text-blue-700 font-bold text-lg md:text-xl">
        AItoolPack
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6 ml-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-2 text-sm font-medium ${
              pathname === item.path
                ? "text-blue-700 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            } transition`}
          >
            {/* Show icon on medium and larger screens, hide on small screens */}
            <span className="hidden md:block">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
