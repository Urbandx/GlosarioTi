import React from 'react';

const Header: React.FC = () => {
  return (
    <header id="header" role="banner">
      <div className="logo">
        <img src="/img/logo-192x192.png" alt="Glosario TI Logo" className="logo-img" />
        Glosario TI
      </div>
      <nav role="navigation" aria-label="Menú principal">
      </nav>
    </header>
  );
};

export default Header;