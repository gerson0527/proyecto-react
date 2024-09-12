import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface InactivityContextProps {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const InactivityContext = createContext<InactivityContextProps | undefined>(undefined);

export const InactivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setShowAlert(true);
    }, 30 * 60 * 1000); // 30 minutos
    setTimer(newTimer);
  };

  const handleActivity = () => {
    if (showAlert) return;
    resetTimer();
  };

  const handleAlertClose = (logout: boolean) => {
    setShowAlert(false);
    if (logout) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.replace('/');
    } else {
        const storedUser = localStorage.getItem('user');
        const userObject = storedUser ? JSON.parse(storedUser) : null;
        //refrescar el token de la sesión
        fetch('http://localhost:5000/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token__refresh: userObject.token__refresh }),
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        
        .then(data => {
            console.log('Success:', data);
            if (data.accessToken) {
                localStorage.setItem('token', data.accessToken);
                console.log('New token stored:', data.accessToken);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });              

        resetTimer();
    }
  };

  useEffect(() => {
    resetTimer();
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, []);

  return (
    <InactivityContext.Provider value={{ showAlert, setShowAlert }}>
      {children}
      {showAlert && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{ marginTop: 0, color: '#333' }}>Sesión Inactiva</h2>
            <p style={{ color: '#666', marginBottom: '20px',textAlign:'left' }}>
              ¿Estás aún ahí? Tu sesión ha estado inactiva por un tiempo.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => handleAlertClose(true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cerrar sesión
              </button>
              <button
                onClick={() => handleAlertClose(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Continuar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </InactivityContext.Provider>
  );
};

export const useInactivity = () => {
  const context = useContext(InactivityContext);
  if (context === undefined) {
    throw new Error('useInactivity must be used within an InactivityProvider');
  }
  return context;
};