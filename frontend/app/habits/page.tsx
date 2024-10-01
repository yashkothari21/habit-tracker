'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import ProgressForm from './components/ProgressForm';

const HabitsPage = () => {
  const [habits, setHabits] = useState<any[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false); // Progress modal state
  

  // Fetch the list of habits
  const fetchHabits = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/habits/history`);
      if (!response.ok) throw new Error('Failed to fetch habits');
      const data = await response.json();
      setHabits(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleProgressUpdated = async () => {
    if (selectedHabit) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/habit/${selectedHabit.id}`);
        if (!response.ok) throw new Error('Failed to fetch progress');
        const data = await response.json();
        setSelectedHabit({ ...selectedHabit, progress: data.progress });
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [habits]);

  const handleHabitClick = (habit: any) => {
    setSelectedHabit(habit);
    setIsProgressModalOpen(true); // Open progress modal
  };

  const handleDeleteHabit = (habitId: number) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  const handleCloseProgressModal = () => {
    setIsProgressModalOpen(false);
    setSelectedHabit(null);
  };

  return (
    <div className="container mx-auto p-4">
      <HabitForm onHabitAdded={fetchHabits} />
      {error && <p className="text-red-500">{error}</p>}

      <HabitList
        habits={habits}
        onSelectHabit={handleHabitClick}
        onDeleteHabit={handleDeleteHabit}
      />

      <Modal isOpen={isProgressModalOpen} onClose={handleCloseProgressModal}>
        {selectedHabit && (
          <div>
            <h2 className="text-2xl font-bold mb-2">{selectedHabit.name}</h2>
            <p className='mb-4'>{selectedHabit.description}</p>
            <ProgressForm
              habitId={selectedHabit.id}
              onProgressUpdated={handleProgressUpdated}
              onClose={handleCloseProgressModal}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HabitsPage;
