import './AdminDashboardComponentStyle.css'
import Logo from '../assets/Logo-DarkGreen.png'

const AdminSidebarComponent = () => {
  return (
    <>
        <div className="ums-adc-sidebar-section">
            <div className="ums-adc-sidebar-upper-section">

            <div className="ums-adc-sidebar-header-section">

                <div className="ums-adc-sidebar-header">

                <div className="ums-adc-sidebar-header-image">
                    <img src={Logo} alt="" />
                </div>

                <div className="ums-adc-sidebar-header-text">
                    <span>Versatily</span>
                </div>

                </div>

            </div>

            </div>
            <div className="ums-adc-sidebar-lower-section"></div>
        </div>
    </>
  )
}

export default AdminSidebarComponent