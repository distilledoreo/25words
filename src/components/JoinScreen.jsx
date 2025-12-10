import React from 'react';
import { Button } from './Button';

export const JoinScreen = ({ localPlayer, setLocalPlayer, roomCode, setRoomCode, onJoin }) => {
  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    setRoomCode(code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-sm border border-slate-700 shadow-2xl">
        <h1 className="text-3xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
          JOIN GAME
        </h1>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 font-bold uppercase">Your Name</label>
            <input 
              type="text" 
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1"
              value={localPlayer.name}
              onChange={e => setLocalPlayer(p => ({...p, name: e.target.value}))}
              placeholder="Enter name..."
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-bold uppercase">Room Code</label>
            <div className="flex gap-2 mt-1">
              <input 
                type="text" 
                className="flex-1 bg-slate-900 border border-slate-700 p-3 rounded-lg text-white uppercase font-mono tracking-widest text-center"
                value={roomCode}
                onChange={e => setRoomCode(e.target.value.toUpperCase())}
                placeholder="CODE"
                maxLength={6}
              />
              <button 
                onClick={generateRoomCode}
                className="bg-slate-700 text-white px-3 rounded-lg text-xs font-bold uppercase hover:bg-slate-600 transition-colors"
              >
                Generate
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-bold uppercase">Select Team</label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              <button 
                onClick={() => setLocalPlayer(p => ({...p, team: 'red'}))}
                className={`p-3 rounded-lg border-2 font-bold ${localPlayer.team === 'red' ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-slate-900 border-slate-700 text-slate-200'}`}
              >
                Red Team
              </button>
              <button 
                onClick={() => setLocalPlayer(p => ({...p, team: 'blue'}))}
                className={`p-3 rounded-lg border-2 font-bold ${localPlayer.team === 'blue' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-700 text-slate-200'}`}
              >
                Blue Team
              </button>
            </div>
          </div>
          <Button disabled={!localPlayer.name || !roomCode} onClick={onJoin}>Enter Lobby</Button>
        </div>
      </div>
    </div>
  );
};
