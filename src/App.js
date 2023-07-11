// import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
function App() {
  return (
    <div className="App">
      {/* for blur */}
      <div className="blur" style={{top: '-18%', right: '0'}}></div>
      <div className="blur" style={{top: '36%', left: '-10rem'}}></div>
      <Home/>
  
    </div>
  );
}

export default App;
