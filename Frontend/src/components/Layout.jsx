import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; 

const Layout = () => {
  return (
    <div>
   <Navbar/>
      <main>
        <Outlet /> {/* The route's content will be rendered here */}
      </main>
    </div>
  );
};

export default Layout;
