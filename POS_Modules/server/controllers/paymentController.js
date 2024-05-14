import Transaction from '../models/transactionModel.js';

export const savePayment = async (req, res) => {
    try {
        const { id, payment } = req.body;

        const transaction = await Transaction.findOne({
            where: {
                id: id
            }
        });

        if (!transaction) {
            throw new Error(`Transaction with ID ${id} not found.`);
        }

        // Update the payment information of the retrieved transaction
        await Transaction.update(
            { 
                payment: payment
            }, {
            where: {
                id: id
            }
        });

        return res.status(201).json({ msg: "Transaction Updated Successfully" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}