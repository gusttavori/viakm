import { useState } from 'react';
import { useFuelLogic } from '../hooks/useFuelLogic';
import { AlertTriangle, PlusCircle, X, ChevronRight, Droplet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Calculator.css';

export default function Calculator() {
  const {
    ethanolPrice, setEthanolPrice,
    gasolinePrice, setGasolinePrice,
    useAverage, setUseAverage,
    ethanolKm, setEthanolKm,
    gasolineKm, setGasolineKm,
    result,
    saveRefuel
  } = useFuelLogic();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValor, setModalValor] = useState('');
  const [modalLitros, setModalLitros] = useState('');
  const [modalOdometro, setModalOdometro] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!modalValor || !modalLitros || !modalOdometro) return;

    // ⚠️ CORREÇÃO CRÍTICA: Converte string para número antes de salvar no DB
    await saveRefuel(
      Number(modalValor),
      Number(modalLitros),
      Number(modalOdometro)
    );

    setIsModalOpen(false);
    setModalValor('');
    setModalLitros('');
    setModalOdometro('');
  };

  return (
    <div className="app-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="calculator-card"
      >
        <div className="card-header">
          <div className="icon-wrapper">
            <Droplet size={24} color="white" />
          </div>
          <h2 className="app-title">Calculadora ViaKm</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="warning-box-premium"
        >
          <AlertTriangle className="warning-icon-premium" size={20} />
          <p>Sempre encha o tanque para garantir cálculos precisos no seu consumo!</p>
        </motion.div>

        <div className="form-container">
          <div className="input-group-premium">
            <label className="input-label-premium">Preço do Etanol (R$)</label>
            <div className="input-wrapper">
              <span className="input-prefix">R$</span>
              <input
                type="number"
                inputMode="decimal" /* Força teclado numérico no celular */
                className="input-field-premium with-prefix"
                placeholder="0,00"
                value={ethanolPrice}
                onChange={(e) => setEthanolPrice(e.target.value)}
                step="0.01"
              />
            </div>
          </div>

          <div className="input-group-premium">
            <label className="input-label-premium">Preço da Gasolina (R$)</label>
            <div className="input-wrapper">
              <span className="input-prefix">R$</span>
              <input
                type="number"
                inputMode="decimal"
                className="input-field-premium with-prefix"
                placeholder="0,00"
                value={gasolinePrice}
                onChange={(e) => setGasolinePrice(e.target.value)}
                step="0.01"
              />
            </div>
          </div>

          <div className="switch-container-premium">
            <span className="switch-label">Usar média do meu carro</span>
            <button
              type="button"
              onClick={() => setUseAverage(!useAverage)}
              className={`switch-track ${useAverage ? 'active' : ''}`}
            >
              <motion.span
                layout
                className="switch-thumb"
                animate={{ x: useAverage ? 28 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          <AnimatePresence>
            {useAverage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="average-inputs-container"
              >
                <div className="average-grid">
                  <div className="input-group-premium">
                    <label className="input-label-premium text-center">Km/L Etanol</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      className="input-field-premium text-center"
                      placeholder="Ex: 8.5"
                      value={ethanolKm}
                      onChange={(e) => setEthanolKm(e.target.value)}
                      step="0.1"
                    />
                  </div>
                  <div className="input-group-premium">
                    <label className="input-label-premium text-center">Km/L Gasolina</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      className="input-field-premium text-center"
                      placeholder="Ex: 11.2"
                      value={gasolineKm}
                      onChange={(e) => setGasolineKm(e.target.value)}
                      step="0.1"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="result-card-premium"
            >
              <div className="result-blur-effect"></div>
              <div className="result-content">
                <div className="result-subtitle">Melhor Escolha</div>
                <div className="result-title-main">
                  {result.isEthanolBetter ? 'Etanol' : 'Gasolina'}
                </div>

                <div className="result-stats-box">
                  <span className="stat-text">
                    Economia de <strong>{result.savingsPercent.toFixed(1)}%</strong>
                  </span>
                  <span className="stat-value">
                    Salva R$ {result.savingsPerLiter ? result.savingsPerLiter.toFixed(2) : result.savingsPerKm.toFixed(2)}
                    <span className="stat-unit">
                      {result.savingsPerLiter ? 'por Litro' : 'por Km'}
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-outline-premium"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle size={20} className="icon-amber" />
          Registrar abastecimento
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-overlay-premium"
              style={{ zIndex: 90 }}
              onClick={() => setIsModalOpen(false)}
            />
            <div className="modal-wrapper" style={{ zIndex: 100 }}>
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="modal-content-premium"
                style={{ maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-drag-handle"></div>

                <div className="modal-header-premium">
                  <h2>Novo Abastecimento</h2>
                  <button className="btn-close-premium" onClick={() => setIsModalOpen(false)}>
                    <X size={20} />
                  </button>
                </div>

                <form
                  onSubmit={handleRegister}
                  className="modal-form custom-scrollbar"
                  style={{ overflowY: 'auto', paddingBottom: '1rem', flex: 1 }}
                >
                  <div className="input-group-premium">
                    <label className="input-label-premium">Valor Total (R$)</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      className="input-field-premium"
                      required
                      step="0.01"
                      placeholder="0.00"
                      value={modalValor}
                      onChange={(e) => setModalValor(e.target.value)}
                    />
                  </div>
                  <div className="input-group-premium">
                    <label className="input-label-premium">Litros Abastecidos</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      className="input-field-premium"
                      required
                      step="0.01"
                      placeholder="0.00"
                      value={modalLitros}
                      onChange={(e) => setModalLitros(e.target.value)}
                    />
                  </div>
                  <div className="input-group-premium">
                    <label className="input-label-premium">Odômetro Atual (Km)</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      className="input-field-premium"
                      required
                      step="0.1"
                      placeholder="Ex: 45000"
                      value={modalOdometro}
                      onChange={(e) => setModalOdometro(e.target.value)}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-primary-premium"
                    style={{ marginTop: '1.5rem', marginBottom: '1rem' }}
                  >
                    Salvar Registro
                    <ChevronRight size={20} />
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}