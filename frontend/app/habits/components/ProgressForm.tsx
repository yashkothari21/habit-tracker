import React, { useState } from 'react';

interface ProgressFormProps {
  habitId: number;
  onProgressUpdated: () => void;
  onClose: () => void;
}

const ProgressForm: React.FC<ProgressFormProps> = ({ habitId, onProgressUpdated, onClose }) => {
  const [status, setStatus] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/habit/${habitId}/progress`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status, date }),
        }
      );

      if (response.ok) {
        setSuccess('Progress updated successfully!');
        setStatus(false);
        setDate('');
        onProgressUpdated();
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Error updating progress.');
      }
    } catch (err) {
      setError('Failed to update progress.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        value={status ? 'true' : 'false'}
        onChange={(e) => setStatus(e.target.value === 'true')}
        className="w-full p-2 border rounded-md"
      >
        <option value="false">Not Completed</option>
        <option value="true">Completed</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Update Progress
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
};

export default ProgressForm;
