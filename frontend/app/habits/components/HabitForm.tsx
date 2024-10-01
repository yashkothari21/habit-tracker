'use client';

import { useEffect, useState } from 'react';

interface HabitFormProps {
  onHabitAdded?: () => void;
  habit?: any;
}

const HabitForm: React.FC<HabitFormProps> = ({ habit }) => {
  const [name, setName] = useState<string>(habit?.name || '');
  const [description, setDescription] = useState<string>(habit?.description || '');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setDescription(habit.description);
    }
  }, [habit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = habit 
      ? `${process.env.NEXT_PUBLIC_API_URL}/habit/${habit.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/habit`;
    
    const method = habit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (habit) {
          setSuccess('Habit updated successfully!');
        } else {
          setSuccess('Habit added successfully!');
          setName('');
          setDescription('');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Error saving habit.');
      }
    } catch (err) {
      setError('Failed to save habit.');
    }
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    if (habit) {
      setName(habit.name);
      setDescription(habit.description);
    }
  };

  return (
    <div className="p-4 border rounded-md cursor-pointer hover:bg-gray-100 mb-5">
      <h1 className="text-2xl font-bold mb-4">{habit ? 'Edit Habit' : 'Add New Habit'}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Habit name"
          className="w-full p-2 border rounded-md"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Habit description"
          className="w-full p-2 border rounded-md"
          required
        />
        <div className="bottom-button">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            {habit ? 'Update Habit' : 'Add Habit'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
