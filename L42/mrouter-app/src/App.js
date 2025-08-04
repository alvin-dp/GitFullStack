import './App.css';
import Home from './components/Home';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Navigation from './components/Navigation';
import NavLinkNavigation from './components/NavLinkNavigation';
import { BrowserRouter,Routes,Route  } from "react-router";
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <BrowserRouter>
        <Navigation />
        <NavLinkNavigation/>    
      <Routes>
        <Route index element ={<Home/>}/>
        <Route path='about' element={<About/>}>
           <Route path='about1' element={<p>'About myself!'</p>}> </Route>
           <Route path='about2' element={<p>'About Company!'</p>}> </Route>
        </Route>
        <Route path='contact' element={<ContactUs/>}/>
        <Route path="/products/:productId"  element={<ProductDetails />}/>
      </Routes>  
    </BrowserRouter> 
  );
}

export default App;
