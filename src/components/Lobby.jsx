import React from 'react';
import { Button } from './Button';

export const Lobby = ({ roomCode, gameState, onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center space-y-8 animate-pop">
      <div className="space-y-2">
        <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
          25 WORDS
        </h1>
        <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 inline-block">
          <span className="text-slate-400 text-xs uppercase font-bold mr-2">Room Code:</span>
          <span className="text-xl font-mono font-bold text-white tracking-widest">{roomCode}</span>
        </div>
        <p className="text-slate-400 text-sm mt-2">Waiting for players to join <strong>{roomCode}</strong>...</p>
      </div>
      
      <div className="flex gap-4 w-full max-w-md">
        <div className="flex-1 bg-red-900/10 border border-red-500/30 p-4 rounded-xl">
          <h3 className="font-bold text-red-400 mb-2">Red Score</h3>
          <span className="text-3xl font-black">{gameState.scores.red}</span>
        </div>
        <div className="flex-1 bg-blue-900/10 border border-blue-500/30 p-4 rounded-xl">
          <h3 className="font-bold text-blue-400 mb-2">Blue Score</h3>
          <span className="text-3xl font-black">{gameState.scores.blue}</span>
        </div>
      </div>

      <div className="w-full max-w-xs">
        <Button onClick={onStartGame}>Start New Game</Button>
      </div>
    </div>
  );
};
