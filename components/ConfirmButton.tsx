import React from 'react';

interface ConfirmButtonProps {
  onClick: () => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onClick }) => {
  return (
    <div className="confirm-button mt-4 w-full">
      <button
        className="w-full p-3 bg-yellow-400 rounded-lg text-black font-bold hover:bg-yellow-500"
        onClick={onClick}
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmButton;
