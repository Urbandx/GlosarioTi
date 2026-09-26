import React from 'react';

interface Termino {
  id: number;
  concepto: string;
  definicionCorta: string;
  definicionLarga: string;
  ejemplos: string[];
  imagen: string;
  categorias: string[];
}

interface TerminoCardProps {
  termino: Termino;
  onVerMas: (termino: Termino) => void;
  onEliminar: (id: number) => void;
  favoritos: number[];
  onToggleFavorito: (id: number) => void;
  estaLogueado: boolean;
}

const TerminoCard: React.FC<TerminoCardProps> = ({ termino, onVerMas, onEliminar }) => {
  return (
    <article className="card">
      <img src={termino.imagen} alt={termino.concepto} loading="lazy" />
      <h3>{termino.concepto}</h3>
      <p>{termino.definicionCorta}</p>
      
      <button className="ver-mas-btn" onClick={() => onVerMas(termino)}>
        Ver más
      </button>
      
      <button 
        className={`fav-btn ${esFavorito ? 'favorito' : ''}`}
        onClick={handleFavorito}
        aria-label={`Marcar ${termino.concepto} como favorito`}
      >
        {esFavorito ? '★' : '☆'}
      </button>

      <button 
        className="eliminar-btn"
        onClick={() => onEliminar(termino.id)}
        title="Eliminar término"
      >
        🗑️
      </button>
    </article>
  );
};

export default TerminoCard;