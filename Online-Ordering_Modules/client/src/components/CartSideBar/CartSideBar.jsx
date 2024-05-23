import PropTypes from 'prop-types';
import './CartSideaBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

const CartSidebar = ({ cartItems, removeFromCart, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [, setTransactionId] = useState('');

  const toastConfig = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

  const calculateTotal = (price, quantity) => {
    return price * quantity;
  };

  // Calculate overall total
  const overallTotal = cartItems.reduce((total, item) => {
    return total + calculateTotal(item.price, item.quantity);
  }, 0);

  const generateOrderID = () => {
    return uuidv4();
  };

  const generatePDFAndSaveData = async () => {
    try {
      if (cartItems.length === 0) {
        toast.error(
          'Cart is empty. Add items before generating Receipt.',
          toastConfig,
        );
        return;
      }

      const newTransactionId = generateOrderID();
      setTransactionId(newTransactionId);

      const transactionData = {
        transactionId: newTransactionId,
        currentDate: getCurrentDate(),
        overallTotal,
      };

      const itemData = cartItems.map(item => ({
        transactionId: newTransactionId,
        name: item.name,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      }));

      await axios.post('http://localhost:5000/orders', {
        transactionData,
        itemData,
      });

      generatePDF(transactionData, itemData);

      console.log('Getting all data');
      console.log('OrderID: ' + newTransactionId);
      console.log('currentDate: ' + getCurrentDate());
      console.log('Total Price: ' + overallTotal);
      console.log('-------------------------------');

      const sampleData = cartItems.map((itemX) => {
        console.log('ItemID: ' + newTransactionId);
        console.log('name: ' + itemX.name);
        console.log('category: ' + itemX.category);
        console.log('price: ' + itemX.price);
        console.log('quantity: ' + itemX.quantity);
        console.log('total: ' + itemX.price * itemX.quantity);
      });

      console.log({sampleData});

      Swal.fire({
        title: 'Thank You for Your Order',
        text: 'Your order is now reserved.',
        icon: 'success',
      }).then((result) => {
        if(result.isConfirmed) {
          window.location.reload();
        }
      });

      // this should be back on landing page or maybe use window.location.reload method
      navigate('/orders');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const generatePDF = (transactionData, itemData) => {
  // Create an instance of a jsPDF
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'pt',
      format: [350, 800],
    });

    let posY = 50;

    // Draw the main title
    const text = 'Versatility';
    const headColor = '#79AC78';
    const fontSize = 18;
    const textWidth =
      (doc.getStringUnitWidth(text) * fontSize) / doc.internal.scaleFactor;
    const x = (doc.internal.pageSize.width - textWidth) / 2;

    doc.setFontSize(fontSize);
    doc.setTextColor(headColor);
    doc.text(text, x, posY);
    posY += 40;

    // Draw the line break
    const lineBreakColor = '#000000';
    const lineBreak = ' - '.repeat(100);

    doc.setTextColor(lineBreakColor);
    doc.text(lineBreak, 10, posY);

    // Draw the table headers
    const tableHeadColor = '#000000';
    const tableHeadFontSize = 12;
    posY += 15;

    doc.setTextColor(tableHeadColor);
    doc.setFontSize(tableHeadFontSize);
    doc.text('QTY', 30, posY);
    doc.text('ITEM', 100, posY);
    doc.text('AMOUNT', 270, posY);

    // Draw the line below the headers
    posY += 10;
    doc.text(lineBreak, 10, posY);

    // Iterate over item data and draw each item
    itemData.forEach((item, index) => {
      posY += 20; // Adjust the vertical spacing as needed

      doc.setFontSize(12);
      // Convert values to strings before passing them to text method
      doc.text(item.quantity.toString() + 'x', 30, posY);
      doc.text(item.name.toString(), 100, posY);
      doc.text(item.total.toFixed(2).toString(), 270, posY);

      if (index !== itemData.length - 1) {
        posY += 10;
      }
    });

    posY += 25;
    doc.text(lineBreak, 10, posY);

    const itemCount = itemData.length;
    const overallTotal =
      transactionData && transactionData.overallTotal
        ? transactionData.overallTotal.toFixed(2)
        : 'N/A';

    doc.text('ITEM COUNT:', 30, posY + 20);
    doc.text('TOTAL:', 30, posY + 40);

    doc.text(`${itemCount}`, 250, posY + 20);
    doc.text(`${overallTotal}`, 250, posY + 40);

    posY += 25;

    const say = 'THANK YOU FOR YOUR PURCHASE!';
    const sayHeadColor = '#00000';
    const sayFontSize = 10;
    const sayTextWidth =
      (doc.getStringUnitWidth(say) * sayFontSize) / doc.internal.scaleFactor;
    const sayX = (doc.internal.pageSize.width - sayTextWidth) / 2;

    doc.setFontSize(sayFontSize);
    doc.setTextColor(sayHeadColor);
    doc.text(say, sayX, posY);

    posY += 25;

    const qrCodeImageWidth = 50; // Adjust width as needed
    // const qrCodeImageHeight = 50; // Adjust height as needed
    const qrCodeText =
      'Scan the QR Code!\nYour feedbacks will greatly\nbe appreciated';

    // Calculate positions
    const qrCodeImageX = 10; // Adjust X coordinate as needed
    const qrCodeImageY = posY; // Adjust Y coordinate as needed
    const qrCodeTextX = qrCodeImageX + qrCodeImageWidth + 20; // Adjust X coordinate as needed
    const qrCodeTextY = qrCodeImageY; // Adjust Y coordinate as needed

    // Add QR code image
    // doc.addImage(qrcode, 'PNG', qrCodeImageX, qrCodeImageY, qrCodeImageWidth, qrCodeImageHeight);

    // Add text
    doc.setFontSize(8);
    doc.text(qrCodeText, qrCodeTextX, qrCodeTextY);

    posY += 45;

    doc.setFontSize(8);
    doc.text(`Receipt #: ${transactionData.transactionId}`, 145, posY);
    doc.text(
      `Date: ${formatDate(transactionData.currentDate)}`,
      145,
      posY + 10,
    );

    doc.save(transactionData.transactionId + '.pdf');
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now
      .getHours()
      .toString()
      .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    return currentDate;
  };

  return (
    <>
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2>Order No #</h2>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.url} alt={item.name} />
                <div className="item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-quantity">{item.quantity}x</p>
                </div>
                <div className="quantity-controls">
                  <p className="cart-item-price">
                    <span>₱</span> {item.price.toFixed(2)}
                  </p>
                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(index)}
                  >
                    <i className="bx bx-x"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <hr className="break-line" />
        <div className="overall-total-container">
          <div className="overall-total-text">Total Price: </div>
          <div className="overall-total-money">
            <span>₱</span> {overallTotal.toFixed(2)}
          </div>
        </div>
        <div className="order-container">
          <button className="generate-order" onClick={generatePDFAndSaveData}>
            Order
          </button>
        </div>
        {/* {generatePDF && <ReceiptPDF cartItems={cartItems} />} */}
        <ToastContainer />
      </div>
    </>
  );
};

// Define prop types for CartSidebar
CartSidebar.propTypes = {
  cartItems: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CartSidebar;
