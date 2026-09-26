import React, { useState } from 'react';

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
        className="eliminar-btn"
        onClick={() => onEliminar(termino.id)}
        title="Eliminar término"
        aria-label={`Eliminar ${termino.concepto}`}
      >
        🗑️
      </button>
    </article>
  );
};

export default TerminoCard;