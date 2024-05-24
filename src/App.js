import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/navbar';
import { AuthPage } from './pages/auth';
import { Register } from './pages/auth/register';
import { CheckoutPage } from './pages/checkout';
import { ShopPage } from './pages/shop';
import { PurchasedItemsPage } from './pages/purchased-items';
import { ShopContextProvider } from './context/shop-context';
import { Footer } from './pages/footer/footer';
import { Order } from './pages/checkout/order';
import { About } from './pages/company/about';
import {Contact} from './pages/company/contact';

function App() {
  return (
    <div className="App">
      <Router>
        <ShopContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path='/register' element={<Register />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/purchased-items" element={<PurchasedItemsPage />} />
            <Route path="/order" element={<Order/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
          </Routes>
          <Footer />
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;
