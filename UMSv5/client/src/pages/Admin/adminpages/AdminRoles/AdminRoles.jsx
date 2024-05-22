import AdminNavBarComponent from '../BarComponents/AdminNavBarComponent'
import AdminSidebarComponent from '../BarComponents/AdminSidebarComponent'
import AdminRolesComponent from './components/AdminRolesComponent'
import profile from '../BarComponents/12079228_101330600225708_7831705582603875769_n.jpg'

const AdminRoles = () => {

    const pageTitle = 'Roles'

  return (
    <>
    
        <div className="ums-main">
          <AdminSidebarComponent></AdminSidebarComponent>
          <div className="ums-content-section">
          <AdminNavBarComponent pageTitle={pageTitle} userProfile={profile}></AdminNavBarComponent>
          <AdminRolesComponent></AdminRolesComponent>
          </div>
        </div>

    </>
  )
}

export default AdminRoles