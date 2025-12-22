import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import { Home } from './pages/Home';
import { Mozo } from './pages/Mozo';
import { Cocinero } from './pages/Cocinero';

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mozo" element={<Mozo />} />
          <Route path="/cocinero" element={<Cocinero />} />
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
