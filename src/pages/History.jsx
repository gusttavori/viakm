import { useState, useEffect } from 'react';
import { db } from '../db/db';
import { Clock, Fuel, MapPin, Gauge, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import './History.css'; // Importando o CSS exclusivo

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      // Calculate consumption for each record using the previous one
      const chronological = await db.abastecimentos.orderBy('odometro').toArray();

      const processed = chronological.map((record, index) => {
        let consumo = null;
        if (index > 0) {
          const prev = chronological[index - 1];
          const kmDiff = record.odometro - prev.odometro;
          if (kmDiff > 0 && prev.litros > 0) {
            consumo = (kmDiff / prev.litros).toFixed(1);
          }
        }
        return { ...record, consumo };
      });

      // Reverse to show newest first
      setHistory(processed.reverse());
    };
    fetchHistory();
  }, []);

  // Variáveis de animação para a lista em cascata
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="app-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="history-card-premium"
      >
        <div className="card-header">
          <div className="icon-wrapper">
            <Clock size={24} color="white" />
          </div>
          <h2 className="app-title">Histórico de Abastecimento</h2>
        </div>

        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="empty-state-premium"
          >
            <FileText size={48} className="empty-icon" />
            <p>Nenhum registro encontrado.</p>
            <span>Seus abastecimentos aparecerão aqui.</span>
          </motion.div>
        ) : (
          <motion.div
            className="history-list-premium"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {history.map((item) => (
              <motion.div key={item.id} variants={itemVariants} className="history-item-premium">

                <div className="history-row top-row">
                  <div className="history-date">
                    <span className="date-text">{new Date(item.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="history-price">
                    R$ {Number(item.valor).toFixed(2)}
                  </div>
                </div>

                <div className="history-divider"></div>

                <div className="history-row bottom-row">
                  <div className="history-details">
                    <div className="detail-pill">
                      <Fuel size={14} className="detail-icon" />
                      {Number(item.litros).toFixed(1)} L
                    </div>
                    <div className="detail-pill">
                      <Gauge size={14} className="detail-icon" />
                      {Number(item.odometro).toFixed(0)} Km
                    </div>
                  </div>

                  {item.consumo ? (
                    <div className="consumption-tag">
                      <MapPin size={14} />
                      {item.consumo} Km/L
                    </div>
                  ) : (
                    <div className="consumption-tag empty">
                      Primeiro registro
                    </div>
                  )}
                </div>

              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}