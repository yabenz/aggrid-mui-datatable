
import './App.css'
import { Routes, Route }  from 'react-router-dom';

import CarDetails from './pages/CarDetails';
import Home from './pages/Home';


function App() {
 
 return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars/:id" element={<CarDetails />} />
      </Routes>
    </div>
  );
}

export default App;