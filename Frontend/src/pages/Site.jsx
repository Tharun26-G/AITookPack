import { useState, useEffect } from "react";
import axios from "axios";

const categoriesList = [
  "AI", "Coding", "Research", "Analysis", "Study", "Design", "Task", "PowerPoint",
  "Productivity", "Automation", "Data Visualization", "Presentation", "Machine Learning",
  "Generative AI", "Education", "Workflow", "Graphic Design", "Project Management",
  "Collaboration", "Innovation", "Data Science", "Development Tools", "Creative Tools",
  "Time Management", "Learning Tools", "Image", "Video"
];

const Site = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPrice, setFilterPrice] = useState("All");
  const [copiedUrl, setCopiedUrl] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchTools = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tools");
      setTools(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch tools. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();

    const ws = new WebSocket("ws://localhost:5000");
    ws.onopen = () => console.log("WebSocket connected");
    ws.onmessage = (event) => {
      const newTool = JSON.parse(event.data);
      setTools((prevTools) => [newTool, ...prevTools]);
    };
    ws.onclose = () => console.log("WebSocket disconnected");
    ws.onerror = (err) => console.error("WebSocket error:", err);

    return () => ws.close();
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
  };

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(""), 2000);
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const filteredTools = tools.filter((tool) => {
    const matchSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.categories.some((cat) =>
        cat.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchPrice =
      filterPrice === "All" ||
      tool.price.toLowerCase() === filterPrice.toLowerCase();

    const matchSelectedCategories =
      selectedCategories.length === 0 ||
      selectedCategories.every((cat) =>
        tool.categories.map((c) => c.toLowerCase()).includes(cat.toLowerCase())
      );

    return matchSearch && matchPrice && matchSelectedCategories;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hamburger Menu */}
      <div className="fixed top-19 md:top-5 left-4 z-30">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out bg-white border-r border-gray-200 shadow-md md:sticky top-0 z-20 overflow-hidden ${
            sidebarOpen ? "w-full md:w-64 h-screen" : "w-0"
          }`}
        >
          {sidebarOpen && (
            <div
              className={`p-4 h-full overflow-y-auto ${
                sidebarOpen && windowWidth < 768 ? "mt-14" : ""
              }`}
            >
              <h2 className="text-lg font-semibold mb-4 ml-13">Categories</h2>
              <input
                type="text"
                placeholder="Search categories..."
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="w-full mt-2 mb-3 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[calc(100vh-4rem)]">
                {categoriesList
                  .filter((cat) =>
                    cat.toLowerCase().includes(categorySearch.toLowerCase())
                  )
                  .map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryToggle(cat)}
                      className={`text-xs px-2 py-1 rounded-full border ${
                        selectedCategories.includes(cat)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-100 text-gray-700 border-gray-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mt-16 mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🛠️ Available Tools
            </h2>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6">
              <div className="relative flex-1 w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </div>

              <div className="w-full sm:w-auto">
                <select
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="All">All Prices</option>
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>

            {/* Tool Cards */}
            {loading ? (
              <div className="text-center text-gray-600">Loading tools...</div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : filteredTools.length === 0 ? (
              <div className="text-center text-gray-600">No tools found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <div
                    key={tool._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                  >
                    <div className="p-4 relative">
                      <div className="flex justify-between items-start mb-2">
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 font-medium text-sm flex items-center hover:underline"
                        >
                          {tool.title}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                        <span
                          className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                            tool.price === "Free"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {tool.price}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs mb-2">
                        {truncateText(tool.description, 100)}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {tool.categories.map((cat, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-xs"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-end relative">
                        <button
                          onClick={() => handleCopyUrl(tool.url, tool._id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors relative"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                          </svg>
                          {copiedUrl === tool._id && (
                            <div className="absolute bottom-full right-0 mb-2 bg-white text-gray-700 text-xs border border-gray-200 rounded-md shadow px-2 py-1">
                              🔗 Link Copied!
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Site;
