import './AdminDashboardComponentStyle.css'
import Logo from '../assets/Logo-DarkGreen.png'

const AdminDashboardComponent = () => {

  return (
    <>
          <div className="ums-main">

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

            <div className="ums-adc-content-section">
                <div className="ums-adc-navbar-section">

                <div className="ums-adc-navbar">

                  <div className="ums-adc-page-title-section">

                    <div className="ums-adc-page-title">
                      <span></span>
                    </div>

                  </div>

                  <div className="ums-adc-navbar-profile-section">

                    <div className="ums-adc-notifications-section">

                      <div className="ums-adc-notifications">

                        <div className="ums-adc-notifications-logo">
                          <i className="fi fi-ss-cowbell"></i>
                        </div>

                      </div>

                    </div>

                    <div className="ums-adc-profile-section">

                      <div className="ums-adc-profile">

                        <div className="ums-adc-profile-image">
                          <img src='' alt="img" />
                        </div>

                      </div>

                    </div>

                    </div>

                  </div>

                </div>
            </div>

          </div>
    </>
  )
}

export default AdminDashboardComponent