import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import UploadPage from './pages/UploadPage';
import Navbar from './components/Navbar';  // Import Navbar

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />  {/* Add Navbar here */}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </Router> 
    </CartProvider>
  );
}

export default App;
