// Define routes to use the controller functions
import Order from '../models/productModel.js';
import Transaction from '../models/transactionModel.js'; 
import Item from '../models/itemModel.js';


// Controller function to get all orders
export const getAllOrders = async (req, res) => {
    try {
        const response = await Order.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Controller function to save a new transaction and its associated items
export const saveTransactionAndItems = async (req, res) => {
    try {
        const { transactionData, itemData } = req.body;

        if (!transactionData || !itemData) {
            return res.status(400).json({ error: 'Transaction data and item data are required.' });
        }

        // Create a new transaction instance
        const newTransaction = await Transaction.create({
            transactionId: transactionData.transactionId,
            overallTotal: transactionData.overallTotal
        });

        // Save items associated with the transaction
        const promises = itemData.map(async (item) => {
            await Item.create({
                transactionId: item.transactionId,
                name: item.name,
                category: item.category,
                price: item.price,
                quantity: item.quantity,
                total: item.total
            });
        });

        await Promise.all(promises);

        return res.status(201).json({ message: 'Transaction and items saved successfully.', transactionId: newTransaction.id });
    } catch (error) {
        console.error('Error saving transaction and items:', error);
        return res.status(500).json({ error: 'Failed to save transaction and items.', details: error.message });
    }
};