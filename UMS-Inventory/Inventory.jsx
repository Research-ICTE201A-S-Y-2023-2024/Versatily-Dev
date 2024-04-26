import React, { useState } from 'react';
import './Inventory.css';
import { ToastContainer, toast } from 'react-toastify';

function Inventory() {
    const [inventoryList, setInventoryList] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const updateMenu = document.getElementById('inventoryUpdateMenu');

    const handleAddValue = function () {
        if (productName.trim() !== '') {
            setInventoryList([...inventoryList, { product_name: productName, product_price: productPrice }]);
            setProductName('');
            setProductPrice(0);
        } else {
            toast.error('Product name field is empty.');
        }
    };

    const handleDelete = function (index) {
        const itemToDelete = inventoryList[index];
        toast.success('Deleted product: ' + itemToDelete.product_name);
        setInventoryList(inventoryList.filter((_, i) => i !== index));
        setSelectedItemIndex(null);
        updateMenu.style.display = 'none';
    };

    const handleInvClick = function (index) {
        const product = inventoryList[index];
        const { product_name, product_price } = product;

        setSelectedItemIndex(index);
        setProductName(product_name);
        setProductPrice(product_price);

        updateMenu.style.display = 'flex';
    };

    const handleInventoryUpdate = function () {
        if (selectedItemIndex !== null) {
            setInventoryList((products) => 
            products.map((product, index) =>
                index === selectedItemIndex
                    ? { ...product, product_name: productName, product_price: productPrice }
                    : product
            ));

            setProductName('');
            setProductPrice(0);
            const updateMenu = document.getElementById('inventoryUpdateMenu');
            updateMenu.style.display = 'none';
            toast.success('Inventory updated successfully!');
        } else {
            toast.error('No item selected for update.');
        }
    };


    return (
        <div className="inventory-main">
            <div className="inventory-header">
                <h1>Inventory</h1>
            </div>
            <div className="inventory-container">
                {inventoryList && inventoryList.length > 0 ? (
                    inventoryList.map((value, index) => (
                        <div key={index} onClick={() => handleInvClick(index)}>
                            {index + 1}
                            <br />
                            Product Name: {value.product_name}
                            <br />
                            Product Price: {value.product_price}
                            <br />
                        </div>
                    ))
                ) : (
                    <div>There's nothing here...</div>
                )}
            </div>
            <div className="inventory-add-menu">
                <button onClick={handleAddValue}>Add a value to the inventory</button>
                <label>
                    Product Name
                    <br />
                    <input
                        type="text"
                        value={productName}
                        onChange={event => {
                            const inputValue = event.target.value;
                            setProductName(inputValue);
                        }}
                    />
                </label>
                <label>
                    Product Price
                    <br />
                    <input
                        type="number"
                        value={productPrice}
                        onChange={event => {
                            const inputValue = parseFloat(event.target.value);
                            setProductPrice(inputValue);
                        }}
                    />
                </label>
            </div>
            <div className="inventory-update-menu" id="inventoryUpdateMenu">
                <h2>Inventory Update Menu</h2>
                {selectedItemIndex !== null && (
                    <p>Index: {selectedItemIndex}</p>
                )}
                <label>
                    Product Name
                    <br />
                    <input
                        type="text"
                        value={productName}
                        onChange={event => {
                            const inputValue = event.target.value;
                            setProductName(inputValue);
                        }}
                    />
                </label>
                <label>
                    Product Price
                    <br />
                    <input
                        type="number"
                        value={productPrice}
                        onChange={event => {
                            const inputValue = parseFloat(event.target.value);
                            setProductPrice(inputValue);
                        }}
                    />
                </label>
                <div style={{ marginBottom: '20px' }}>
                    <button style={{ marginRight: '10px' }} onClick={() => { handleInventoryUpdate(selectedItemIndex) }}>Update</button>
                    <button onClick={() => handleDelete(selectedItemIndex)}>Delete</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Inventory;
