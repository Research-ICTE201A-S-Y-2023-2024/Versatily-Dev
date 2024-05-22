import './AdminAccountsComponentStyle.css'
import 'react-toastify/dist/ReactToastify.css'
/*import { ToastContainer, toast } from 'react-toastify'
import { useEffect, useState } from 'react';
import axios from 'axios' */

const AdminAccountsComponent = () => {

  /*
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadingToast = () => {
    toast('Loading in accounts, Please wait.', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const loadingErrorToast = () => {
    toast.error('Error occurred, please try again.', {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  useEffect(() => {
    console.log('Loading state changed:', loading);
    if (loading) {
      loadingToast();
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      loadingErrorToast();
    }
  }, [error]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/accounts')
      .then(response => {
        console.log(response)
        // Convert the response data into an array if it's not already
        // eslint-disable-next-line no-unused-vars
        const dataAsArray = Array.isArray(response.data) ? response.data : [response.data];
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching account data:', error);
        setError('Error fetching account data. Please try again later.');
        setLoading(false);
      });
  }, []);
  */

  return (
    <>
      <div className="ums-acp-content">
        {/*<ToastContainer />*/}
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
            
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminAccountsComponent