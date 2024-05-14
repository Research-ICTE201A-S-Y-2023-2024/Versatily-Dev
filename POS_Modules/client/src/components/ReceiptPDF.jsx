import { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ReceiptPDF = ({ workbenchUnique, workbenchNo, cartItems }) => {
    const tableNo = workbenchNo;
    const workbenchUniqueID = workbenchUnique;
    const receiptRef = useRef(null);
    const [overallTotal, setOverallTotal] = useState(0);
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.price * item.quantity;
        });
        setOverallTotal(total);
    }, [cartItems]);

    const toastConfig = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    const generatePDFAndSaveData = async () => {
        try {
            if (cartItems.length === 0) {
                toast.error('Cart is empty. Add items before generating Receipt.', toastConfig);
                return;
            }
    
            const newTransactionId = workbenchUniqueID;
            setTransactionId(newTransactionId);
    
            const transactionData = {
                transactionId: newTransactionId,
                currentDate: getCurrentDate(),
                overallTotal: overallTotal
            };
    
            const itemData = cartItems.map(item => ({
                transactionId: newTransactionId,
                name: item.name,
                category: item.category,
                price: item.price,
                quantity: item.quantity,
                total: item.price * item.quantity
            }));
    
            const response = await axios.post('http://localhost:5000/orders', {
                transactionData,
                itemData
            });
    
            if (response.data.transactionId) {
                // Update workbench status
            await axios.patch(`http://localhost:5000/kiosk/${tableNo}`, { status: true });
                toast.success('Transaction and items saved successfully.', toastConfig);

                
                // generatePDF(transactionData, itemData);

                navigate('/kiosk');
            } else {
                console.error('Failed to save transaction and items.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };    

    const generatePDF = (transactionData, itemData) => {
        // Create an instance of a jsPDF
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'pt',
            format: [350, 800]
        });

        let posY = 50;

        // Draw the main title
        const text = 'Versatility';
        const headColor = '#79AC78';
        const fontSize = 18;
        const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
        const x = (doc.internal.pageSize.width - textWidth) / 2;

        doc.setFontSize(fontSize);
        doc.setTextColor(headColor);
        doc.text(text, x, posY);
        posY += 40;

        // Draw the line break
        const lineBreakColor = '#000000';
        const lineBreak = " - ".repeat(100);

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
        const overallTotal = transactionData && transactionData.overallTotal ? transactionData.overallTotal.toFixed(2) : 'N/A';
        
        doc.text(`ITEM COUNT:`, 30, posY + 20);
        doc.text(`TOTAL:`, 30, posY + 40);

        doc.text(`${itemCount}`, 250, posY + 20);
        doc.text(`${overallTotal}`, 250, posY + 40);

        posY += 60;
        doc.setTextColor('#555555');
        doc.text(lineBreak, 10, posY);

        doc.text(`CASH:`, 30, posY + 20);
        doc.text(`CHANGE:`, 30, posY + 40);

        doc.text(`${itemCount}`, 250, posY + 20);
        doc.text(`${overallTotal}`, 250, posY + 40);

        posY += 60;
        doc.text(lineBreak, 10, posY);

        posY += 25;

        const say = 'THANK YOU FOR YOUR PURCHASE!';
        const sayHeadColor = '#00000';
        const sayFontSize = 10;
        const sayTextWidth = doc.getStringUnitWidth(say) * sayFontSize / doc.internal.scaleFactor;
        const sayX = (doc.internal.pageSize.width - sayTextWidth) / 2;

        doc.setFontSize(sayFontSize);
        doc.setTextColor(sayHeadColor);
        doc.text(say, sayX, posY);

        posY += 25;

        const qrCodeImageWidth = 50; // Adjust width as needed
        const qrCodeImageHeight = 50; // Adjust height as needed
        const qrCodeText = "Scan the QR Code!\nYour feedbacks will greatly\nbe appreciated";

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

        doc.setFontSize(8)
        doc.text(`Receipt #: ${transactionData.transactionId}`, 145, posY);
        doc.text(`Date: ${formatDate(transactionData.currentDate)}`, 145, posY + 10);
        

        
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
            hour12: true
        };
        return date.toLocaleDateString('en-US', options);
    };

    const getCurrentDate = () => {
        const now = new Date();
        const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        return currentDate;
    };

    return (
        <>
            <div>
                <button className='generate-pdf' onClick={generatePDFAndSaveData}>Generate PDF</button>
                <hr></hr>
                <h3>Summary</h3>
                <h3>Table No # {tableNo}</h3>
                <h4>Transaction ID: {transactionId}</h4>
                <h4>Date: {formatDate(getCurrentDate())}</h4>
                <div ref={receiptRef}>
                    {cartItems.map((item, index) => (
                        <div key={index}>
                            <p>{item.name} x {item.quantity} = ₱{item.price * item.quantity}</p>
                            <p>Category: {item.category}</p>
                            <hr></hr>
                        </div>
                    ))}
                </div>
                <h4>Overall Total: ₱{overallTotal.toFixed(2)}</h4>
            </div>
            <ToastContainer />
        </>
    );
};

ReceiptPDF.propTypes = {
    workbenchUnique: PropTypes.string.isRequired,
    workbenchNo: PropTypes.string.isRequired,
    cartItems: PropTypes.array.isRequired
};

export default ReceiptPDF;