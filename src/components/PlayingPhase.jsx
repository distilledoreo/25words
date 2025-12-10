import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from './Button';

export const PlayingPhase = ({ gameState, user, localPlayer, updateGame, onSubmitRound }) => {
  const [clueInput, setClueInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(45);
  
  const isGiver = user?.uid && gameState.giverId === user.uid;
  const isGuesser = !isGiver;

  // Timer Logic
  useEffect(() => {
    if (gameState.phase !== 'playing' || !gameState.startTime) return;
    
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
      const remaining = Math.max(0, 45 - elapsed);
      setTimeLeft(remaining);
    }, 500);

    return () => clearInterval(interval);
  }, [gameState.phase, gameState.startTime, user?.uid, gameState.giverId]);

  const submitClue = (e) => {
    e.preventDefault();
    if (!clueInput.trim()) return;

    const words = clueInput.trim().split(/\s+/);
    const count = words.length;

    const newLog = [...gameState.cluesLog, { 
      text: clueInput, 
      count: count, 
      timestamp: Date.now(),
      sender: localPlayer.name
    }];

    updateGame({
      cluesLog: newLog,
      usedWordCount: gameState.usedWordCount + count
    });
    setClueInput("");
  };

  const toggleWord = (index) => {
    if (!user || gameState.giverId !== user.uid) return;
    const newGuessed = [...gameState.wordsGuessed];
    newGuessed[index] = !newGuessed[index];
    updateGame({ wordsGuessed: newGuessed });
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${timeLeft === 0 ? 'bg-red-900/10' : ''}`}>
      {/* Header */}
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center shadow-lg shrink-0">
        <div>
          <div className="text-xs text-slate-400 uppercase font-bold">Limit</div>
          <div className={`text-xl font-bold ${gameState.usedWordCount > gameState.winningBid ? 'text-red-500' : 'text-white'}`}>
            {gameState.usedWordCount} / {gameState.winningBid}
          </div>
        </div>
        <div className={`text-4xl font-mono font-black ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
          {timeLeft}s
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400 uppercase font-bold">Team</div>
          <div className={`text-xl font-black uppercase ${gameState.activeTeam === 'red' ? 'text-red-400' : 'text-blue-400'}`}>
            {gameState.activeTeam}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Clue Log Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-32">
          {gameState.cluesLog.length === 0 && (
            <div className="text-center text-slate-600 mt-10 italic">No clues given yet...</div>
          )}
          {gameState.cluesLog.map((log, idx) => (
            <div key={idx} className="flex flex-col items-start clue-bubble">
              <div className="bg-slate-700/80 rounded-2xl rounded-tl-none px-4 py-2 text-white border border-slate-600 shadow-sm max-w-[80%]">
                <span className="text-lg">{log.text}</span>
              </div>
              <span className="text-xs text-slate-500 mt-1 ml-2 font-mono">Count: {log.count}</span>
            </div>
          ))}
          <div id="clue-end"></div>
        </div>

        {/* Giver Overlay: Word List */}
        {isGiver && (
          <div className="absolute top-4 right-4 z-10 w-48 bg-slate-900/90 backdrop-blur border border-slate-700 p-3 rounded-xl shadow-2xl">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 border-b border-slate-700 pb-1">Target Words</h4>
            <div className="space-y-2">
              {gameState.currentWords.map((w, idx) => (
                <button 
                  key={idx}
                  onClick={() => toggleWord(idx)}
                  className={`w-full text-left text-sm font-bold px-2 py-1 rounded transition-colors ${
                    gameState.wordsGuessed[idx] 
                    ? 'text-emerald-500 line-through opacity-50' 
                    : 'text-white hover:bg-slate-800'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Guesser Status Overlay */}
        {isGuesser && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-slate-800/80 backdrop-blur px-3 py-1 rounded-full border border-slate-600 text-xs font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle size={14} />
              {gameState.wordsGuessed.filter(Boolean).length} / 5 Solved
            </div>
          </div>
        )}
      </div>

      {/* Input / Controls Area */}
      <div className="bg-slate-800 p-4 border-t border-slate-700 shrink-0">
        {isGiver ? (
          <div className="space-y-4">
            <form onSubmit={submitClue} className="flex gap-2">
              <input 
                autoFocus
                type="text" 
                value={clueInput}
                onChange={e => setClueInput(e.target.value)}
                placeholder="Type clue here..."
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <Button type="submit" className="!w-auto px-6">Send</Button>
            </form>
            <div className="flex gap-2">
              <Button variant="danger" className="text-xs" onClick={() => onSubmitRound(false)}>Fail</Button>
              <Button 
                variant="success" 
                className="text-xs" 
                onClick={() => onSubmitRound(true)}
                disabled={!gameState.wordsGuessed.every(Boolean) && gameState.usedWordCount <= gameState.winningBid}
              >
                Success
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 text-sm py-2 animate-pulse">
            Waiting for Giver to type...
          </div>
        )}
      </div>
    </div>
  );
};
