import './AccountOverviewComponentStyle.css'
import borgir from '../assets/BORGIR.jpg'

const AccountOverviewComponent = () => {
  return (
    <div className="ums-ao-content-section">

        <div className="ums-ao-content-container">

            <div className="ums-ao-content-image-section">
                <img src={borgir} alt="" />
                <div className="ums-ao-content-image-filler"></div>
            </div>



        </div>
                    
    </div>
  )
}

export default AccountOverviewComponent