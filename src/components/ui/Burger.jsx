import React, { Suspense, lazy, useState } from 'react';
import { RiMenu2Fill } from "react-icons/ri";

const Drawer = lazy(() => import('./Drawer'));

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative flex items-center">
      {/* --- Main Navbar UI --- */}
      <nav className="">
        <button 
          onClick={toggleSidebar} 
          className="text-xl hover:text-(--text-light) transition-colors text-(--text-gray) cursor-pointer"
          aria-label="Open Menu"
        >
          <RiMenu2Fill />
        </button>
      </nav>

      {/* --- Drawer Logic --- */}
      {isOpen && (
        <Suspense fallback={null}>
          <Drawer isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </Suspense>
      )}
    </div>
  );
};

export default Navbar;
