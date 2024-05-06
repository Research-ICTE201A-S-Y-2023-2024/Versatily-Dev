import PropTypes from 'prop-types';
import './css/CartSideaBar.css';
import ReceiptPDF from '../ReceiptPDF.jsx'
import { useState } from 'react';

const CartSidebar = ({ workbenchUnique , workbenchNo, cartItems, removeFromCart, isOpen, setIsOpen }) => {
    const workbenchNumber = workbenchNo;
    const workbenchUniqueID = workbenchUnique;

    const [generatePDF, setGeneratePDF] = useState(false);
    const handleGeneratePDF = () => {
        setGeneratePDF(true);
    };

    const calculateTotal = (price, quantity) => {
        return price * quantity;
    };

    // Calculate overall total
    const overallTotal = cartItems.reduce((total, item) => {
        return total + calculateTotal(item.price, item.quantity);
    }, 0);

    return (
        <>
            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={() => setIsOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <h2>Order Table #{workbenchNumber}</h2>
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p>No items in cart.</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div className="cart-item" key={index}>
                                <img src={item.url} alt={item.name} />
                                <div className="item-info">
                                    <p className="cart-item-name">{item.name}</p>
                                    <p className='cart-item-quantity'>{item.quantity}x</p>
                                </div>
                                <div className="quantity-controls">
                                    <p className="cart-item-price"><span>₱</span> {item.price.toFixed(2)}</p>
                                    <button className="remove-item" onClick={() => removeFromCart(index)}><i className='bx bx-x'></i></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <hr className='break-line' />
                <div className="overall-total-container">
                    <div className="overall-total-text">Overall Total: </div>
                    <div className="overall-total-money"><span>₱</span> {overallTotal.toFixed(2)}</div>
                </div>
                <button className='generate-summary' onClick={handleGeneratePDF}>Generate a Receipt Preview</button>
                {generatePDF && <ReceiptPDF workbenchNo={workbenchNo} workbenchUnique={workbenchUniqueID} cartItems={cartItems} />}
            </div>
        </> 
    );
}

// Define prop types for CartSidebar
CartSidebar.propTypes = {
    workbenchUnique: PropTypes.string.isRequired,
    workbenchNo: PropTypes.string.isRequired,
    cartItems: PropTypes.array.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};

export default CartSidebar;