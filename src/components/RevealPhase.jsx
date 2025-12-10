import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from './Button';

export const RevealPhase = ({ roomCode, gameState, user, onBecomeGiver, onProceed }) => {
  const isGiver = gameState.giverId === user?.uid;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-pop">
      <div className="absolute top-4 right-4 bg-slate-800 px-3 py-1 rounded border border-slate-700 font-mono text-xs text-slate-400">
        Room: {roomCode}
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">Giver Selection</h2>
      <p className="text-slate-400 mb-8 text-center max-w-xs text-sm">
        One person from each team should see the words to bid.
      </p>

      {isGiver ? (
        <div className="bg-slate-800 p-6 rounded-2xl w-full max-w-sm border border-slate-700 shadow-2xl mb-8 space-y-3">
          <div className="text-center text-xs text-slate-500 uppercase font-bold mb-2">Secret Words</div>
          {gameState.currentWords.map((word, i) => (
            <div key={i} className="text-xl font-bold text-center border-b border-slate-700 pb-2 last:border-0 last:pb-0 text-emerald-400">
              {word}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/50 p-8 rounded-2xl w-full max-w-sm border border-slate-700 border-dashed mb-8 text-center text-slate-500">
          Waiting for Givers to review words...
        </div>
      )}

      <div className="space-y-4 w-full max-w-xs">
        {!isGiver && (
          <Button variant="secondary" onClick={onBecomeGiver}>
            <Eye size={18} /> I am a Giver
          </Button>
        )}
        <Button onClick={onProceed}>
          Proceed to Bidding
        </Button>
      </div>
    </div>
  );
};
