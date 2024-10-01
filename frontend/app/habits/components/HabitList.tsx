import Modal from '@/components/Modal';
import React, { useState } from 'react';
import HabitForm from './HabitForm';

interface Habit {
  id: number;
  name: string;
  description: string;
  progress: {
    id: number; habit_id: number; date: string; status: boolean;
  }[];
}

interface HabitListProps {
  habits: Habit[];
  onSelectHabit: (habit: Habit) => void;
  onDeleteHabit: (habitId: number) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, onSelectHabit, onDeleteHabit }) => {
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (habit: Habit) => {
    setEditingHabit(habit);
    setIsEditModalOpen(true);
  };


  const handleDeleteClick = async (habitId: number) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      const response = await fetch(`http://localhost:8000/api/v1/habit/${habitId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDeleteHabit(habitId);
      } else {
        console.error('Error deleting habit');
      }
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingHabit(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Habit History</h1>
        {habits.map((habit) => (
          <div key={habit.id} className="p-4 border rounded-md hover:bg-gray mb-5">
            <div className='habit-list-panel' style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 className="text-xl font-semibold">{habit.name}</h2>
              <div className='habit-list-side-button flex space-x-2'>
                <button
                  onClick={() => handleEditClick(habit)}
                  className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
                  title="Edit Habit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232a3.001 3.001 0 014.236 4.236l-1.414 1.414a1 1 0 00-.293.707v3.414a1 1 0 01-1 1h-3.414a1 1 0 00-.707.293l-1.414 1.414a3.001 3.001 0 01-4.236-4.236l1.414-1.414a1 1 0 00.293-.707V8.414a1 1 0 011-1h3.414a1 1 0 00.707-.293l1.414-1.414z" />
                  </svg>
                </button>

                <button
                  onClick={() => handleDeleteClick(habit.id)}
                  className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-200"
                  title="Delete Habit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <p>{habit.description}</p>
            <div className="mt-2 p-4 border rounded-md cursor-pointer hover:bg-gray-100" onClick={() => onSelectHabit(habit)}>
              {habit.progress.length > 0 ? (
                <div>
                  <h3 className="font-semibold">Progress:</h3>
                  {habit.progress.map((progress) => (
                    <div key={progress.id} className="flex items-center">
                      <span className={progress.status ? "text-green-500" : "text-red-500"}>
                        {progress.status ? '✔️' : '❌'} {progress.date}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No progress recorded</p>
              )}
            </div>
          </div>
        ))}

        <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
          {editingHabit && (
            <div>
              <HabitForm
                habit={editingHabit}
              />
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default HabitList;
