import "./DashboardPageStyle.css"
import { useState } from 'react'

function DashboardPage() {

  const [isHovered, setIsHovered] = useState(false)

      const handleMouseEnter = () => {
          setIsHovered(true);
      };
      
        const handleMouseLeave = () => {
          setIsHovered(false);
  };

  return (

    <div>

    <div className="main">
      
      <div className={isHovered ? "sidebar-section-hovered" : "sidebar-section"}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      >

        <div className="sidebar">
        
          <div className="sidebar-upper-section">
            
            <div className="header-section">

                <div className="header">

                  <div className={isHovered ? "header-logo-section-hovered" : "header-logo-section"}
                  onMouseEnter={handleMouseEnter} 
                  onMouseLeave={handleMouseLeave}
                  >
                    <span className={isHovered ? "span-hovered" : "span"}
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}>V</span>

                  </div>
                  
                  <div className={isHovered ? "header-text-section-hovered" : "header-text-section"}
                  onMouseEnter={handleMouseEnter} 
                  onMouseLeave={handleMouseLeave}>
                  <span>Versatily</span></div>

                </div>

            </div>
          
          </div>

          <div className="sidebar-lower-section">

            <div className="sidebar-button-section">

              <div className={isHovered ? "sidebar-button-hovered" : "sidebar-button"}><i className='bx bxs-dashboard'></i><span>Dashboard</span></div>
              <div className={isHovered ? "sidebar-button-hovered" : "sidebar-button"}><i className='bx bxs-user-detail'></i><span>Staffs</span></div>

            </div>

          </div>

        </div>

      </div>

      <div className="hero-section">

          <div className="navbar-section">

              <div className="navbar">

                <div className="header-section">
                  <span>Dashboard</span>
                </div>

                <div className="profile-section">
                  <div className="profile-logo">
                    <i className='bx bxs-user-circle'></i>
                  </div>
              </div>

          </div>

          </div>

          <div className="dashboard-section">

            <div className="dashboard">

              <div className="dashboard-upper-section">

                <div className="audit-section">

                </div>

                <div className="employee-status-section">

                </div>

              </div>

              <div className="dashboard-lower-section">

                <div className="recent-employee-section">

                </div>

              </div>

            </div>

          </div>

      </div>

    </div>

    </div>
    
    
    
  )
}

export default DashboardPage
