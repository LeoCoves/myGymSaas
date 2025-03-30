import React from "react";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <p className="text-gray-600 mb-4">{message}</p>
          <div className="flex justify-end space-x-4">
            <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
              Cancelar
            </button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmModal;