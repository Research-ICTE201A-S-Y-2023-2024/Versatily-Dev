// Define routes to use the controller functions.
import Transaction from '../models/transactionModel.js';
import Item from '../models/itemModel.js';
import Workbench from '../models/workbenchModel.js';

// Controller function to get all transactions
export const getAllTransaction = async (req, res) => {
    try {
        const workbench = await Workbench.findOne();
        const transactions = await Transaction.findAll();
        res.json({workbench, transactions});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" + error});
    }
};

// Controller function to get a table, transaction, and items by ID
export const getTableTransactionsItems = async (req, res) => {
    try {
        const { transactionId } = req.params;

        const workbench = await Workbench.findOne({
            where: {
                workbenchID: transactionId
            }
        });

        const transaction = await Transaction.findAll({
            where: {
                transactionId: transactionId
            }
        });

        const items = await Item.findAll({
            where: {
                transactionId: transactionId
            }
        });

        if (!transaction) {
            return res.status(404).json({ msg: "Transaction not found" });
        }

        res.json({workbench, transaction, items});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" + error});
    }
};
