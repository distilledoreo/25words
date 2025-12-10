import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from './Button';

export const BiddingPhase = ({ roomCode, gameState, user, updateGame, onStartPlaying }) => {
  const isGiver = gameState.giverId === user?.uid;

  return (
    <div className="flex flex-col items-center min-h-screen p-6 max-w-md mx-auto animate-pop pt-12">
      <div className="absolute top-4 right-4 bg-slate-800 px-3 py-1 rounded border border-slate-700 font-mono text-xs text-slate-400">
        Room: {roomCode}
      </div>
      <h2 className="text-3xl font-black mb-2 text-slate-200">BIDDING</h2>
      
      {/* Only Giver sees words here */}
      {isGiver && (
        <div className="w-full mb-6 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
          <div className="text-xs font-bold uppercase text-slate-500 mb-1">Reminder</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {gameState.currentWords.map((w,i) => <span key={i} className="text-xs text-emerald-400 bg-slate-800 px-2 py-1 rounded">{w}</span>)}
          </div>
        </div>
      )}

      <div className="w-full space-y-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <label className="block text-slate-400 text-xs font-bold uppercase mb-2">Winning Bid</label>
          <div className="flex items-center justify-between gap-4">
            <Button 
              variant="secondary" 
              onClick={() => updateGame({ winningBid: Math.max(1, gameState.winningBid - 1) })} 
              className="w-16 h-16 rounded-full !p-0"
            >
              <Minus size={18} />
            </Button>
            <span className="text-5xl font-mono font-bold w-20 text-center">{gameState.winningBid}</span>
            <Button 
              variant="secondary" 
              onClick={() => updateGame({ winningBid: gameState.winningBid + 1 })} 
              className="w-16 h-16 rounded-full !p-0"
            >
              <Plus size={18} />
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-slate-400 text-xs font-bold uppercase mb-2">Winning Team</label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => updateGame({ activeTeam: 'red' })}
              className={`p-6 rounded-xl border-4 font-black text-xl transition-all ${
                gameState.activeTeam === 'red' 
                ? 'bg-red-500/20 border-red-500 text-red-100' 
                : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
            >
              RED
            </button>
            <button 
              onClick={() => updateGame({ activeTeam: 'blue' })}
              className={`p-6 rounded-xl border-4 font-black text-xl transition-all ${
                gameState.activeTeam === 'blue' 
                ? 'bg-blue-500/20 border-blue-500 text-blue-100' 
                : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
            >
              BLUE
            </button>
          </div>
        </div>

        <Button 
          disabled={!gameState.activeTeam} 
          onClick={onStartPlaying}
          variant={gameState.activeTeam === 'red' ? 'danger' : gameState.activeTeam === 'blue' ? 'primary' : 'secondary'}
        >
          Start Round
        </Button>
      </div>
    </div>
  );
};
