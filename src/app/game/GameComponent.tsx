import React, { useEffect } from 'react';
import { updateUserStats, getUserStats } from '@/lib/api';

interface GameProps {
  fid: string; // User's FID
}

const GameComponent: React.FC<GameProps> = ({ fid }) => {
  const handleGameOutcome = async (outcome: 'win' | 'loss' | 'draw') => {
    try {
      await updateUserStats(fid, outcome);
      const stats = await getUserStats(fid);
      console.log('User Stats:', stats);
    } catch (error) {
      console.error('Error updating or fetching user stats:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGameOutcome('win');
    }, 5000);

    return () => clearTimeout(timer);
  }, [fid]);

  return (
    <div>
      {/* Your game UI goes here */}
    </div>
  );
};

export default GameComponent;
