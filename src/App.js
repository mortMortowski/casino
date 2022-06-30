import Home from './Home';
import Footer from './Footer';
import Menu from './Menu';
import Shop from './Shop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
