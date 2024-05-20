import './AdminBarStyles.css'
import Logo from '../../assets/Logo-DarkGreen.png'

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
            <div className="ums-adc-sidebar-lower-section">

                <div className="ums-adc-sidebar-dir-section">

                    <div className="ums-adc-sidebar-dir-header">
                        Main
                    </div>

                    <div className="ums-adc-sidebar-dir-button">
                        <div className="ums-adc-sidebar-dir-button-icon">
                            <i className="fi fi-rr-apps"></i>
                        </div>
                        <div className="ums-adc-sidebar-dir-button-label">
                            <span>Dashboard</span>
                        </div>
                    </div>

                    <div className="ums-adc-sidebar-dir-button">
                        <div className="ums-adc-sidebar-dir-button-icon">
                            <i className="fi fi-ss-users"></i>
                        </div>
                        <div className="ums-adc-sidebar-dir-button-label">
                            <span>Accounts</span>
                        </div>
                    </div>

                    <div className="ums-adc-sidebar-dir-button">
                        <div className="ums-adc-sidebar-dir-button-icon">
                            <i className="fi fi-ss-organization-chart"></i>
                        </div>
                        <div className="ums-adc-sidebar-dir-button-label">
                            <span>Roles</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </>
  )
}

export default AdminSidebarComponent