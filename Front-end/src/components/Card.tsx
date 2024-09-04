import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

// Componente de Card con fetch
const Card = ({ title, icon: Icon, fetchUrl }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl]);

  return (
    <div style={styles.card}>
      <IconContext.Provider value={{ size: '2em', color: 'white' }}>
        <div style={styles.iconContainer}>
          <Icon />
        </div>
      </IconContext.Provider>
      <h2 style={styles.title}>{title}</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={styles.error}>{error.message}</p>}
      {data && <pre style={styles.data}>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

// Estilos en línea (puedes usar styled-components o CSS en su lugar)
const styles = {
  card: {
    borderRadius: '8px',
    background: '#333',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '300px',
  },
  iconContainer: {
    marginBottom: '10px',
  },
  title: {
    margin: 0,
    fontSize: '1.2em',
  },
  error: {
    color: 'red',
  },
  data: {
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
  },
};

// Validación de tipos de props
Card.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired, // Asegura que icon es un componente de ícono
  fetchUrl: PropTypes.string.isRequired, // URL para la solicitud fetch
};

export default Card;
