import profile from './12079228_101330600225708_7831705582603875769_n.jpg'
import profile2 from './645c91974451100c24bd3c58fb143a6a.jpg'
import profile3 from './371508907_206348945770614_7331935409586489016_n.jpg'

const AdminStatusBarComponent = () => {
  return (
    <>
        <div className="ums-content-section-status-bar">
          <div className="ums-adc-status-bar-section">
            <div className="ums-adc-status-bar">
              <div className="ums-adc-status-bar-label">ICTE201A | Staffs</div>
              <div className="ums-adc-status-bar-account">

                <div className="ums-adc-status-bar-account-img">
                  <div className="ums-adc-status-bar-account-profile-img">
                    <img src={profile} alt="" />
                  </div>
                </div>

                <div className="ums-adc-status-bar-account-name">
                  <span>VanzTyl <br /> (Ian De Guzman)</span>
                </div>

                <div className="ums-adc-status-bar-account-status">
                  <div className="ums-adc-status-active"></div>
                </div>

              </div>
              <div className="ums-adc-status-bar-account">

                <div className="ums-adc-status-bar-account-img">
                  <div className="ums-adc-status-bar-account-profile-img">
                    <img src={profile2} alt="" />
                  </div>
                </div>

                <div className="ums-adc-status-bar-account-name">
                  <span>Ashen <br /> (Kurt Baybay)</span>
                </div>

                <div className="ums-adc-status-bar-account-status">
                  <div className="ums-adc-status-active"></div>
                </div>

              </div>
              <div className="ums-adc-status-bar-account">

                <div className="ums-adc-status-bar-account-img">
                  <div className="ums-adc-status-bar-account-profile-img">
                    <img src={profile3} alt="" />
                  </div>
                </div>

                <div className="ums-adc-status-bar-account-name">
                  <span>Onigiri <br /> (Jean De Guzman)</span>
                </div>

                <div className="ums-adc-status-bar-account-status">
                  <div className="ums-adc-status-active"></div>
                </div>

              </div>
            </div>
          </div>
        </div>
    </>

  )
}

export default AdminStatusBarComponent