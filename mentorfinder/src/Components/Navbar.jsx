import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-auto flex items-baseline space-x-4">
                <NavLink
                  exact
                  to="/"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </NavLink>
                <NavLink
                  exact
                  to="/about"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </NavLink>
                <NavLink
                  exact
                  to="/contact"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
