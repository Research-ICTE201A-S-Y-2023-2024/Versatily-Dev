import './AdminAccountsComponentStyle.css'
import { useEffect, useState } from 'react';
import axios from 'axios'

const AdminAccountsComponent = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/accounts')
      .then(response => {
        console.log(response)
        // Convert the response data into an array if it's not already
        const dataAsArray = Array.isArray(response.data) ? response.data : [response.data];
        setAccounts(dataAsArray);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching account data:', error);
        setError('Error fetching account data. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
            <div className="ums-acp-content">
      <div className="ums-acp-content-header-section">
        <div className="ums-acp-content-header">
          <span>8 Accounts</span>
        </div>
        <div className="ums-acp-button-section">
          <div className="ums-acp-add-account-button">
            <button className="ums-acp-add-account">
              <span>+</span><span>Add Account</span>
            </button>
          </div>
          <div className="ums-acp-filter-button">
            <button className="ums-acp-filter">
              <i className="fi fi-rr-filter"></i><span>Filter</span>
            </button>
          </div>
        </div>
      </div>
      <div className="ums-acp-content-body-section">
        <div className="ums-acp-content-body">
          {accounts.map(account => (
            <div className="ums-acp-content-account-card" key={`${account.account_id}-${account.account_username}`}>
              <div className="ums-acp-content-account-card-image-container">
                <div className="ums-acp-content-account-card-image"></div>
              </div>
              <div className="ums-acp-content-account-card-container">
                <div className="ums-acp-content-account-card-text-section">
                  <span className='ums-acp-card-username'>{account.account_username}</span>
                  <span className='ums-acp-card-account-id'>Account ID: {account.account_id}</span>
                </div>
                <div className="ums-acp-content-account-card-role-section">
                  <div className="ums-acp-card-user-role">User Role</div>
                  <div className="ums-acp-card-system-role">System Role</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    </>
  )

}

export default AdminAccountsComponent