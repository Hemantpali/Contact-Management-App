import React from 'react';

const Alert = ({ type = 'info', message, onClose }) => {
  const alertStyles = {
    success: 'bg-green-100 text-green-700 border-green-300',
    error: 'bg-red-100 text-red-700 border-red-300',
    info: 'bg-blue-100 text-blue-700 border-blue-300',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-300'
  };

  return (
    <div className={`p-3 rounded-lg border ${alertStyles[type]} flex items-center justify-between`}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-current opacity-70 hover:opacity-100 focus:outline-none"
          aria-label="Close"
        >
          <span className="text-xl">&times;</span>
        </button>
      )}
    </div>
  );
};

export default Alert;

