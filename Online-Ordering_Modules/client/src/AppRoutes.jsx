import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderPage from '../src/Pages/Order/Order.jsx';
import Product from '../src/Pages/Product/Product.jsx';
import Category from '../src/Pages/Category/Category.jsx';
import Transaction from '../src/Pages/Transaction/Transaction.jsx';
import Receipt from '../src/components/Receipt/Receipt.jsx';
import Login from '../src/Pages/Login/Login.jsx';
import Register from '../src/Pages/Register/Register.jsx';
import Profile from '../src/Pages/Profile/Profile.jsx';

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/products" element={<Product />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/receipt/:id" element={<Receipt />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
