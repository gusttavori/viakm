import { useState } from 'react';
import Calculator from './pages/Calculator';
import History from './pages/History';
import Dashboard from './pages/Dashboard';
import BottomNav from './components/BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css'; // Mantido caso tenha estilos extras

// Importação correta da imagem no Vite (a partir da pasta src/assets)
import logoViaKm from './assets/viakm.png';

function App() {
  const [activeTab, setActiveTab] = useState('calc');

  return (
    <>
      {/* Header com animação de descida suave e centralizado */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="header"
        style={{
          display: 'flex',
          justifyContent: 'center', // Centraliza horizontalmente
          alignItems: 'center',     // Centraliza verticalmente
          padding: '3rem 1rem 1rem 1rem', // Dá um respiro legal no topo
          background: 'transparent'
        }}
      >
        <img
          src={logoViaKm} /* Usando a variável importada no topo */
          alt="Logo ViaKm"
          style={{
            height: '40px', /* Ajuste a altura conforme o tamanho da sua logo */
            width: 'auto',
            objectFit: 'contain'
          }}
        />
      </motion.header>

      <main className="main-content">
        {/* AnimatePresence gerencia a saída (exit) dos componentes antes de renderizar o novo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} /* A chave avisa ao Framer Motion que a aba mudou */
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            {activeTab === 'calc' && <Calculator />}
            {activeTab === 'history' && <History />}
            {activeTab === 'dash' && <Dashboard />}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}

export default App;