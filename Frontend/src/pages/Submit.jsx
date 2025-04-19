import { useState } from "react";
   import axios from "axios";
   import Select from "react-select";

   const priceOptions = [
     { value: "Free", label: "Free" },
     { value: "Paid", label: "Paid" },
   ];

   const defaultCategoryOptions = [
     { label: "AI", value: "AI" },
     { label: "Coding", value: "Coding" },
     { label: "Research", value: "Research" },
     { label: "Analysis", value: "Analysis" },
     { label: "Study", value: "Study" },
     { label: "Design", value: "Design" },
     { label: "Task", value: "Task" },
     { label: "PowerPoint", value: "PowerPoint" },
     { label: "Productivity", value: "Productivity" },
     { label: "Automation", value: "Automation" },
     { label: "Data Visualization", value: "DataVisualization" },
     { label: "Presentation", value: "Presentation" },
     { label: "Machine Learning", value: "MachineLearning" },
     { label: "Generative AI", value: "GenerativeAI" },
     { label: "Education", value: "Education" },
     { label: "Workflow", value: "Workflow" },
     { label: "Graphic Design", value: "GraphicDesign" },
     { label: "Project Management", value: "ProjectManagement" },
     { label: "Collaboration", value: "Collaboration" },
     { label: "Innovation", value: "Innovation" },
     { label: "Data Science", value: "DataScience" },
     { label: "Development Tools", value: "DevelopmentTools" },
     { label: "Creative Tools", value: "CreativeTools" },
     { label: "Time Management", value: "TimeManagement" },
     { label: "Learning Tools", value: "LearningTools" },
     { label: "Image", value: "Image" },
     { label: "Video", value: "Video" },
   ];

   const Submit = () => {
     const [formData, setFormData] = useState({
       title: "",
       url: "",
       description: "",
       categories: [],
       price: "",
       customCategory: "",
     });
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [message, setMessage] = useState("");
     const [showConfirm, setShowConfirm] = useState(false);
     const [categoryOptions, setCategoryOptions] = useState(defaultCategoryOptions);

     const handleSelectChange = (selectedOptions) => {
       setFormData({ ...formData, categories: selectedOptions || [] });
     };

     const handlePriceChange = (selectedOption) => {
       setFormData({ ...formData, price: selectedOption?.value || "" });
     };

     const handleInputChange = (e) => {
       setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
       }));
     };

     const handleCustomCategorySubmit = (e) => {
       e.preventDefault();
       if (formData.customCategory.trim()) {
         const newOption = {
           label: formData.customCategory,
           value: formData.customCategory.replace(/\s+/g, ""),
         };
         setCategoryOptions((prev) => [...prev, newOption]);
         setFormData((prev) => ({
           ...prev,
           categories: [...prev.categories, newOption],
           customCategory: "",
         }));
       }
     };

    const handleSubmit = async () => {
  setIsSubmitting(true);
  setMessage("");

  try {
    const { title, url, description, categories, price } = formData;

    // Step 1: Get existing tools
    const getRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tools`);
    const tools = getRes.data;

    // Step 2: Check if tool with same title or URL already exists
    const duplicate = tools.find(
      (tool) =>
        tool.title.trim().toLowerCase() === title.trim().toLowerCase() ||
        tool.url.trim().toLowerCase() === url.trim().toLowerCase()
    );

    if (duplicate) {
      setMessage("❌ Tool with the same title or URL already exists.");
      setIsSubmitting(false);
      return;
    }

    // Step 3: Format data for submission
    const formattedData = {
      title,
      url,
      description,
      categories: categories.map((c) => c.value),
      price,
    };

    // Step 4: Submit the tool
    const postRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tools`, formattedData);

    if (postRes.status === 201) {
      setMessage("✅ Tool submitted successfully!");
      setFormData({
        title: "",
        url: "",
        description: "",
        categories: [],
        price: "",
        customCategory: "",
      });
    } else {
      setMessage("❌ Submission failed. Try again.");
    }
  } catch (err) {
    console.error(err);
    setMessage("❌ Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
    setShowConfirm(false);
  }
};


     const handleConfirmation = (e) => {
  e.preventDefault();

  const { title, url, description, categories, price } = formData;

  // Basic validation
  if (!title.trim() || !url.trim() || !description.trim() || !price || categories.length === 0) {
    setMessage("❌ Please fill in all required fields.");
    return;
  }

  if (categories.length > 3) {
    setMessage("❌ You can select up to 3 categories only.");
    return;
  }

  setMessage(""); // clear any previous error
  setShowConfirm(true);
};


     const truncateText = (text, maxLength) => {
       if (!text) return "";
       if (text.length <= maxLength) return text;
       return text.substring(0, maxLength) + "...";
     };

     return (
       <div className="max-w-5xl mx-auto mt-6 p-4">
         <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
           🛠️ Submit Your Tool
         </h2>
         <div className="flex flex-col lg:flex-row gap-6">
           {/* Form Section */}
           <div className="w-full lg:w-2/3">
             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-1 rounded-xl shadow-md">
               <div className="bg-white p-6 rounded-xl space-y-4">
                 <div className="space-y-1">
                   <label className="block text-xs font-medium text-gray-700">Tool Name</label>
                   <input
                     className="w-full p-2 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
                     type="text"
                     name="title"
                     placeholder="Enter a catchy name"
                     value={formData.title}
                     onChange={handleInputChange}
                     required
                   />
                 </div>
                 <div className="space-y-1">
                   <label className="block text-xs font-medium text-gray-700">Website URL</label>
                   <input
                     className="w-full p-2 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
                     type="url"
                     name="url"
                     placeholder="https://example.com"
                     value={formData.url}
                     onChange={handleInputChange}
                     required
                   />
                 </div>
                 <div className="space-y-1">
                   <label className="block text-xs font-medium text-gray-700">Description</label>
                   <textarea
                     className="w-full p-2 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
                     name="description"
                     placeholder="Describe in 2 lines"
                     rows={2}
                     value={formData.description}
                     onChange={handleInputChange}
                     required
                   />
                 </div>
                 <div className="space-y-1">
                   <label className="block text-xs font-medium text-gray-700">Categories</label>
                   <Select
                     isMulti
                     name="categories"
                     options={categoryOptions}
                     value={formData.categories}
                     onChange={handleSelectChange}
                     placeholder="Select up to 3 categories"
                     classNamePrefix="react-select"
                     className="react-select-container text-sm"
                     styles={{
                       control: (base) => ({
                         ...base,
                         border: 0,
                         boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                         backgroundColor: "rgb(249 250 251)",
                         borderRadius: "0.5rem",
                         padding: "0.1rem",
                         fontSize: "0.875rem",
                       }),
                       menu: (base) => ({
                         ...base,
                         zIndex: 9999,
                       }),
                       option: (base, { isFocused }) => ({
                         ...base,
                         backgroundColor: isFocused ? "#DBEAFE" : "white",
                         color: "#1E3A8A",
                       }),
                     }}
                   />
                 </div>
                 <div className="space-y-1">
                   <label className="block text-xs font-medium text-gray-700">Custom Category</label>
                   <div className="flex gap-2">
                     <input
                       className="w-full p-2 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
                       type="text"
                       name="customCategory"
                       placeholder="Create a new category"
                       value={formData.customCategory}
                       onChange={handleInputChange}
                     />
                     <button
                       onClick={handleCustomCategorySubmit}
                       className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm"
                       disabled={!formData.customCategory.trim()}
                     >
                       Add
                     </button>
                   </div>
                 </div>
                 <div className="space-y-1">
                   <label className="block text-xs font-medium text-gray-700">Pricing</label>
                   <Select
                     name="price"
                     options={priceOptions}
                     value={priceOptions.find((p) => p.value === formData.price)}
                     onChange={handlePriceChange}
                     placeholder="Is it Free or Paid?"
                     classNamePrefix="react-select"
                     className="react-select-container text-sm"
                     styles={{
                       control: (base) => ({
                         ...base,
                         border: 0,
                         boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                         backgroundColor: "rgb(249 250 251)",
                         borderRadius: "0.5rem",
                         padding: "0.1rem",
                         fontSize: "0.875rem",
                       }),
                       menu: (base) => ({
                         ...base,
                         zIndex: 9999,
                       }),
                       option: (base, { isFocused }) => ({
                         ...base,
                         backgroundColor: isFocused ? "#DBEAFE" : "white",
                         color: "#1E3A8A",
                       }),
                     }}
                   />
                 </div>
                 <button
                   type="submit"
                   onClick={handleConfirmation}
                   className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all text-sm"
                   disabled={isSubmitting}
                 >
                   {isSubmitting ? (
                     <span className="flex items-center justify-center">
                       <svg
                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                       >
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path
                           className="opacity-75"
                           fill="currentColor"
                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                         ></path>
                       </svg>
                       Submitting...
                     </span>
                   ) : (
                     "Publish Tool"
                   )}
                 </button>
                 {message && (
                   <div
                     className={`text-center p-2 rounded-lg text-xs ${
                       message.includes("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                     }`}
                   >
                     {message}
                   </div>
                 )}
               </div>
             </div>
           </div>
           {/* Preview Section */}
           <div className="w-full lg:w-1/3 flex flex-col">
             <h3 className="text-lg font-semibold mb-3 text-gray-700">🔍 Live Preview</h3>
             <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
               <div className="p-4 relative">
                 <div className="flex justify-between items-start mb-2">
                   <h4 className="text-blue-600 font-medium text-sm flex items-center">
                     {formData.title || "Tool Name"}
                     {formData.url && (
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
                     )}
                   </h4>
                   {formData.price && (
                     <span
                       className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                         formData.price === "Free" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"
                       }`}
                     >
                       {formData.price}
                     </span>
                   )}
                 </div>
                 <p className="text-gray-600 text-xs mb-2">
                   {formData.description ? truncateText(formData.description, 50) : "Describe your tool"}
                 </p>
                 <div className="flex flex-wrap gap-1 mb-3">
                   {formData.categories.length > 0 ? (
                     formData.categories.slice(0, 3).map((cat) => (
                       <span key={cat.value} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-xs">
                         {cat.label}
                       </span>
                     ))
                   ) : (
                     <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-xs">AI</span>
                   )}
                 </div>
                 <div className="flex justify-end">
                   <button className="text-blue-600 hover:text-blue-800 transition-colors">
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
                   </button>
                 </div>
               </div>
             </div>
           </div>
         </div>
         {/* Confirmation Modal */}
         {showConfirm && (
           <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm">
             <div className="bg-white p-5 rounded-xl shadow-xl w-full max-w-xs">
               <div className="text-center">
                 <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 mb-3">
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5 text-blue-600"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                   >
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                   </svg>
                 </div>
                 <h3 className="text-lg font-bold text-gray-800">Ready to Publish?</h3>
                 <p className="mt-1 text-gray-600 text-xs">
                   You're about to publish <span className="font-semibold text-blue-600">{formData.title || "your tool"}</span>.
                 </p>
                 <div className="mt-2 p-1 bg-gray-50 rounded-lg text-xs text-gray-500 break-all">
                   {formData.url || "URL not provided"}
                 </div>
               </div>
               <div className="mt-4 flex gap-2">
                 <button
                   onClick={() => setShowConfirm(false)}
                   className="flex-1 py-1.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-xs"
                 >
                   Cancel
                 </button>
                 <button
                   onClick={handleSubmit}
                   className="flex-1 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs"
                 >
                   Confirm
                 </button>
               </div>
             </div>
           </div>
         )}
       </div>
     );
   };

   export default Submit;