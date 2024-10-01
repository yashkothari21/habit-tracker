import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-md p-6 w-1/3">
        <button onClick={onClose} className="mb-4 text-red-500">
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
