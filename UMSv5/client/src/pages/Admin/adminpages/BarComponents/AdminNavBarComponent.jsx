import './AdminBarStyles.css'
import { PropTypes } from 'prop-types'

const AdminNavBarComponent = ({ pageTitle, userProfile }) => {
  return (
    <>
        <div className="ums-adc-navbar-section">

        <div className="ums-adc-navbar">

            <div className="ums-adc-page-title-section">

            <div className="ums-adc-page-title">
                <span>{pageTitle}</span>
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
                    <img src={userProfile} alt="img" />
                </div>

                </div>

            </div>

            </div>

            </div>

        </div>
    </>
  )
}

AdminNavBarComponent.propTypes = {
    pageTitle: PropTypes.string.isRequired, // pageTitle is a required string
    userProfile: PropTypes.string.isRequired,
};

export default AdminNavBarComponent