import AdminNavBarComponent from "../BarComponents/AdminNavBarComponent";
import AdminSidebarComponent from "../BarComponents/AdminSidebarComponent";
import AccountOverviewComponent from "./components/AccountOverviewComponent";

const AccountOverview = () => {
  return (
    <>
    
        <div className="ums-main">
            <AdminSidebarComponent></AdminSidebarComponent>
            <div className="ums-content-section">
                <AdminNavBarComponent pageTitle="Overview"></AdminNavBarComponent>
                <AccountOverviewComponent></AccountOverviewComponent>
            </div>
        </div>

    </>
  )
}

export default AccountOverview