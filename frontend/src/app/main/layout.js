import Sidebar from "@/components/Sidebar";


export default function Layout({ children }) {
    return (
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar Component */}
          <Sidebar />
  
          {/* Main content area */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
            {children}
          </main>
        </div>
      </div>
    );
  }