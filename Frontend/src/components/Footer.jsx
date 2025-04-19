import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-1 py-2 text-center text-sm text-gray-600">
      <p className="mb-1">
        Made with <span className="text-red-500">♥</span> by{" "}
        <a
          href="https://github.com/Tharun26-G"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium hover:underline"
        >
          Tharun
        </a>
      </p>
      <div className="flex justify-center space-x-3 text-xl">
        <a
          href="https://github.com/Tharun26-G"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
        >
          <FaGithub />
        </a>
        <a
          href="https://x.com/_Tharun_G"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          <FaSquareXTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
