import AdminNavBarComponent from '../BarComponents/AdminNavBarComponent'
import AdminSidebarComponent from '../BarComponents/AdminSidebarComponent'
import AdminAccountsComponent from "./components/AdminAccountsComponent"

const AdminAccounts = () => {

    const pageTitle = 'Accounts'

    return (

        <>
            <div className="ums-main">
                <AdminSidebarComponent></AdminSidebarComponent>
                <div className="ums-content-section">
                    <AdminNavBarComponent pageTitle={pageTitle} userProfile=''></AdminNavBarComponent>
                    <AdminAccountsComponent></AdminAccountsComponent>
                </div>
            </div>
        </>

    )
}

export default AdminAccounts