import { useState, useEffect } from 'react';
import { db } from '../db/db';
import { TrendingUp, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import './Dashboard.css'; // Importando o CSS exclusivo deste componente

export default function Dashboard() {
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    // A simple simulation logic for MVP dashboard.
    // In a real scenario, we would use FuelDB records to calculate complex savings by comparing standard prices.
    // Here we count the number of refuelings and simulate an average saving of R$ 15.50 per tank (example logic)
    // based on user switching to the Smart Calculator choice as requested in Functionalidad 5.
    const calculateSavings = async () => {
      const count = await db.abastecimentos.count();
      // Estimated saving per refueling is 15.5 for MVP demo
      setSavings(count * 15.50);
    };

    calculateSavings();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="dashboard-card-premium"
    >
      {/* Efeito de brilho de fundo (Glow) */}
      <div className="dash-glow-effect"></div>

      <div className="dash-content-wrapper">
        <div className="dash-header">
          <div className="dash-icon-wrapper">
            <Wallet size={24} color="white" />
          </div>
          <h2 className="dash-title">Economia Estimada</h2>
        </div>

        <div className="dash-body">
          <p className="dash-subtitle">Você economizou este mês:</p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="dash-value-premium"
          >
            <span className="dash-currency">R$</span> {savings.toFixed(2)}
          </motion.div>
        </div>

        <div className="dash-footer">
          <div className="dash-footer-icon">
            <TrendingUp size={16} />
          </div>
          <p>Baseado em suas escolhas inteligentes na bomba.</p>
        </div>
      </div>
    </motion.div>
  );
}