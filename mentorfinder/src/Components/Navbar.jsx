import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-auto flex items-baseline space-x-4">
                {/* <NavLink
                  exact
                  to="/"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </NavLink> */}
                <NavLink
                  exact
                  to="/dashboard"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  className="text-purple-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  exact
                  to="/communityhub"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  className="text-purple-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Community Hub
                </NavLink>
                <NavLink
                  exact
                  to="/mymentors"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  className="text-purple-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Mentors
                </NavLink>
                <NavLink
                  exact
                  to="/findmentors"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  className="text-purple-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Find Mentors
                </NavLink>
                <NavLink
                  exact
                  to="/findmentors"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  className="text-purple-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ml-auto"
                >
                  Find Mentors
                </NavLink>
                <NavLink
                  exact
                  to="/findmentors"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  className="text-purple-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ml-auto"
                >
                  Notifications
                </NavLink>
                <NavLink
                  exact
                  to="/findmentors"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  className="text-purple-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ml-auto"
                >
                  Logout
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
