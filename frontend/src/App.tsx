import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Buscador from './components/Buscador';
import Filtros from './components/Filtros';
import TerminoCard from './components/TerminoCard';
import Modal from './components/Modal';

interface Termino {
  id: number;
  concepto: string;
  definicionCorta: string;
  definicionLarga: string;
  ejemplos: string[];
  imagen: string;
  categorias: string[];
}

const API_URL = 'http://localhost:5000/api';

function App() {
  const [terminos, setTerminos] = useState<Termino[]>([]);
  const [terminosFiltrados, setTerminosFiltrados] = useState<Termino[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [terminoModal, setTerminoModal] = useState<Termino | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar términos desde el backend
  useEffect(() => {
    cargarTerminos();
  }, []);

  const cargarTerminos = async () => {
    try {
      setCargando(true);
      setError(null);
      const response = await axios.get(`${API_URL}/terminos`);
      setTerminos(response.data);
      setCargando(false);
    } catch (error) {
      console.error('Error cargando términos:', error);
      setError('No se pudieron cargar los términos. Verifica que el backend esté ejecutándose.');
      setCargando(false);
    }
  };

  // Filtrar términos
  useEffect(() => {
    let resultados = terminos;

    if (categoriaActiva !== 'Todas') {
      resultados = resultados.filter(termino => 
        termino.categorias && termino.categorias.includes(categoriaActiva)
      );
    }

    if (busqueda) {
      const lowerBusqueda = busqueda.toLowerCase();
      resultados = resultados.filter(termino =>
        termino.concepto.toLowerCase().includes(lowerBusqueda) ||
        termino.definicionCorta.toLowerCase().includes(lowerBusqueda) ||
        (termino.categorias && termino.categorias.some(cat => 
          cat.toLowerCase().includes(lowerBusqueda)
        ))
      );
    }

    setTerminosFiltrados(resultados);
  }, [terminos, categoriaActiva, busqueda]);

  const eliminarTermino = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este término?')) {
      try {
        await axios.delete(`${API_URL}/terminos/${id}`);
        setTerminos(terminos.filter(t => t.id !== id));
        alert('Término eliminado correctamente');
      } catch (error) {
        console.error('Error eliminando término:', error);
        alert('Error al eliminar el término');
      }
    }
  };

  if (cargando) {
    return (
      <div className="cargando">
        <div>Cargando términos...</div>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={cargarTerminos} className="retry-btn">
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      
      <main id="main-content">
        <section id="glosario" aria-labelledby="glosario-titulo">
          <h2 id="glosario-titulo">Glosario de Términos TI</h2>
          
          <Buscador 
            busqueda={busqueda} 
            setBusqueda={setBusqueda} 
          />
          
          <Filtros 
            categoriaActiva={categoriaActiva}
            setCategoriaActiva={setCategoriaActiva}
          />

          <div className="grid-cards" role="list">
            {terminosFiltrados.length === 0 ? (
              <div className="no-results" role="alert">
                <p>No se encontraron términos que coincidan con "{busqueda}"</p>
                <button 
                  onClick={() => {
                    setBusqueda('');
                    setCategoriaActiva('Todas');
                  }} 
                  className="clear-search-btn"
                >
                  Limpiar búsqueda
                </button>
              </div>
            ) : (
              terminosFiltrados.map(termino => (
                <TerminoCard 
                  key={termino.id}
                  termino={termino}
                  onVerMas={setTerminoModal}
                  onEliminar={eliminarTermino}
                />
              ))
            )}
          </div>
        </section>
      </main>

      {terminoModal && (
        <Modal 
          termino={terminoModal}
          onCerrar={() => setTerminoModal(null)}
        />
      )}
    </div>
  );
}

export default App;