import Link from 'next/link';
import '../app/globals.css';

const Sidebar = () => {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link href="/main/dashboard" className="nav-link active">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/main/tasks" className="nav-link">
              Tasks
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
