// export default function Navbar() {
//     return <nav className="nav">
//         <a href="/">Site Name</a>
//         <ul>
//             <li><a href="./pages/Dashboard">Dashboard</a></li>
//             <li><a href="./pages/FindMentor">Find Mentor</a></li>
//             <li><a href="./pages/MyMentos">My Mentors</a></li>
//         </ul>
//     </nav>
// }

import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Site Name
      </Link>
      <ul>
        <CustomLink to="/dashboard">Dashboard</CustomLink>
        <CustomLink to="/findmentor">Find Mentor</CustomLink>
       < CustomLink to="/mymentors">My Mentors</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
