import React, { useEffect } from 'react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  variant: 'filled' | 'outlined';
  onClose: () => void; // Requerido para cerrar la alerta
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({ type, message, variant, onClose, duration=3000 }) => {
  const baseClasses = 'p-4 mb-4 text-sm rounded-lg display: flex items-center ';
  const variantClasses = variant === 'filled'
    ? type === 'success'
      ? 'bg-green-500 text-white'
      : 'bg-red-500 text-white'
    : type === 'success'
    ? 'border border-green-500 text-green-800'
    : 'border border-red-500 text-red-800';

  useEffect(() => {
    const timer = setTimeout(onClose, duration); // 3 segundos
    return () => clearTimeout(timer); // Limpieza del temporizador
  }, [onClose]);

  return (
    <div className={`${baseClasses} ${variantClasses}`} role="alert">
      <span className="font-medium">
      </span>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
