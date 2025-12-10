import React from 'react';
import { Button } from './Button';

export const RoundSummary = ({ gameState, onNextRound, onLeave }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-pop">
      <h2 className="text-3xl font-bold mb-8">Scoreboard</h2>
      
      <div className="flex gap-6 w-full max-w-md mb-12">
        <div className="flex-1 bg-red-900/30 border-2 border-red-500 rounded-2xl p-6 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 w-full h-2 bg-red-500"></div>
          <h3 className="text-red-400 font-bold mb-2">RED</h3>
          <span className="text-6xl font-black text-white">{gameState.scores.red}</span>
        </div>
        <div className="flex-1 bg-blue-900/30 border-2 border-blue-500 rounded-2xl p-6 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 w-full h-2 bg-blue-500"></div>
          <h3 className="text-blue-400 font-bold mb-2">BLUE</h3>
          <span className="text-6xl font-black text-white">{gameState.scores.blue}</span>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <Button onClick={onNextRound}>Next Round</Button>
        <Button variant="outline" onClick={onLeave}>Leave Room</Button>
      </div>
    </div>
  );
};
