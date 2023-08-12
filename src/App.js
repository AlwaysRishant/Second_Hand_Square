import React from 'react';
import { BrowserRouter as Router, Routes, Route ,BrowserRouter} from 'react-router-dom';
import Userlogin from './Components/Userlogin';
import Product from './Components/Product';
import Additem from './Components/Additem';
const App = () => {
  return (
    <div>
     <BrowserRouter>
      <Routes>
        <Route path="addproduct" element={<Additem/>} />
        <Route path="/" element={<Userlogin/>}></Route>
        <Route path="/products" element={<Product/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};
export default App;