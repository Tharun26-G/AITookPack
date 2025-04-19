import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="relative h-screen w-full flex flex-col">
      {/* Fixed Navbar, pushed down by 15px */}
      <Navbar className="fixed top-[15px] w-full z-10" />

      {/* Main content section that scrolls */}
      <main className="flex-1 pt-[80px] pb-[70px] overflow-y-auto w-full px-4 md:px-12 text-center">
        {/* Hero Section */}
        <div className="mt-4 mb-8 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            AI Tool Pack Directory
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Discover and submit the best AI tools across categories. Your go-to collection for everything AI.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left max-w-6xl mx-auto">
          <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Submit Tools</h3>
            <p className="text-gray-600">
              Found an awesome AI site? Submit it to help others discover new tools.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Explore & Share</h3>
            <p className="text-gray-600">
              Explore top AI tools across categories and share them.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Free & Paid Filters</h3>
            <p className="text-gray-600">
              Whether you need a free tool or a pro solution, filter and find what suits you best.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-blue-50 p-8 rounded-2xl text-center mb-10 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
            Share your favorite AI tools with the world
          </h2>
          <p className="text-gray-600 mb-6">
            Join a growing community curating the best of AI – one tool at a time.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/sites"
              className="bg-gray-200 text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-300 transition"
            >
              Explore Tools
            </a>
            <a
              href="/submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              + Submit Tool
            </a>
          </div>
        </div>
      </main>

      {/* Fixed Footer */}
      <Footer className="fixed bottom-0 w-full z-10" />
    </div>
  );
};

export default Home;
