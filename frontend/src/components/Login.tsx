import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  onLogin: (usuario: any, token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [esRegistro, setEsRegistro] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const endpoint = esRegistro ? '/auth/registro' : '/auth/login';
      const response = await axios.post(
        `http://localhost:5000/api${endpoint}`,
        formData
      );

      if (esRegistro) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        setEsRegistro(false);
        setFormData({ ...formData, nombre: '' });
      } else {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
        onLogin(response.data.usuario, response.data.token);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error de conexión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{esRegistro ? 'Registro' : 'Iniciar Sesión'}</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {esRegistro && (
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
            />
          </div>

          <button type="submit" disabled={cargando}>
            {cargando ? 'Procesando...' : (esRegistro ? 'Registrarse' : 'Iniciar Sesión')}
          </button>
        </form>

        <button 
          className="toggle-btn"
          onClick={() => {
            setEsRegistro(!esRegistro);
            setError('');
          }}
        >
          {esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </button>
      </div>
    </div>
  );
};

export default Login;