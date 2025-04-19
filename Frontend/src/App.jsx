import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Submit from './pages/Submit';
import Site from './pages/Site';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}> {/* All routes will be wrapped in Layout */}
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/sites" element={<Site />} />
      </Route>
    </Routes>
  );
}

export default App;
