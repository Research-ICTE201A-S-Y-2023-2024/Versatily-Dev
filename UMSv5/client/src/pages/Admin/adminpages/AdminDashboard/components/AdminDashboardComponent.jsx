import AdminNavBarComponent from "../../BarComponents/AdminNavBarComponent"
import AdminSidebarComponent from "../../BarComponents/AdminSidebarComponent"
import AdminStatusBarComponent from "../../BarComponents/AdminStatusBarComponent"
import profile from '../../BarComponents/12079228_101330600225708_7831705582603875769_n.jpg'

const AdminDashboardComponent = () => {

  const pageTitle = "Dashboard"

  return (
    <>
    
        <div className="ums-main">
          <AdminSidebarComponent></AdminSidebarComponent>
          <div className="ums-content-section">
          <AdminNavBarComponent pageTitle={pageTitle} userProfile={profile}></AdminNavBarComponent>
          <AdminStatusBarComponent></AdminStatusBarComponent>
          </div>
        </div>
    
    </>
  )
}

export default AdminDashboardComponent