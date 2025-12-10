import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { fetchRandomWords } from './utils/words';
import { JoinScreen } from './components/JoinScreen';
import { Lobby } from './components/Lobby';
import { RevealPhase } from './components/RevealPhase';
import { BiddingPhase } from './components/BiddingPhase';
import { PlayingPhase } from './components/PlayingPhase';
import { RoundSummary } from './components/RoundSummary';

function App() {
  const [localPlayer, setLocalPlayer] = useState({ name: '', team: 'red' });
  const [roomCode, setRoomCode] = useState("");
  const [joined, setJoined] = useState(false);
  
  const { user, gameState, updateGame } = useGameState(roomCode, joined);

  // Game Actions
  const startGame = async () => {
    const words = await fetchRandomWords(5);
    updateGame({
      scores: { red: 0, blue: 0 },
      currentWords: words,
      wordsGuessed: [false, false, false, false, false],
      usedWordCount: 0,
      winningBid: 25,
      phase: 'reveal',
      cluesLog: [],
      giverId: null,
      activeTeam: null
    });
  };

  const nextRound = async () => {
    const words = await fetchRandomWords(5);
    updateGame({
      currentWords: words,
      wordsGuessed: [false, false, false, false, false],
      usedWordCount: 0,
      winningBid: 25,
      phase: 'reveal',
      cluesLog: [],
      giverId: null,
      activeTeam: null
    });
  };

  const startPlaying = () => {
    updateGame({
      phase: 'playing',
      startTime: Date.now(),
      cluesLog: []
    });
  };

  const becomeGiver = () => {
    if (!user) return;
    updateGame({ giverId: user.uid });
  };

  const submitRound = (success) => {
    const points = 250;
    let newScores = { ...gameState.scores };
    
    if (success) {
      newScores[gameState.activeTeam] += points;
    } else {
      const otherTeam = gameState.activeTeam === 'red' ? 'blue' : 'red';
      newScores[otherTeam] += points;
    }
    
    updateGame({
      scores: newScores,
      phase: 'roundSummary'
    });
  };

  const handleLeave = () => {
    setJoined(false);
    setRoomCode("");
  };

  // Router
  if (!joined) {
    return (
      <JoinScreen
        localPlayer={localPlayer}
        setLocalPlayer={setLocalPlayer}
        roomCode={roomCode}
        setRoomCode={setRoomCode}
        onJoin={() => setJoined(true)}
      />
    );
  }

  switch(gameState.phase) {
    case 'lobby':
      return <Lobby roomCode={roomCode} gameState={gameState} onStartGame={startGame} />;
    case 'reveal':
      return (
        <RevealPhase
          roomCode={roomCode}
          gameState={gameState}
          user={user}
          onBecomeGiver={becomeGiver}
          onProceed={() => updateGame({ phase: 'bidding' })}
        />
      );
    case 'bidding':
      return (
        <BiddingPhase
          roomCode={roomCode}
          gameState={gameState}
          user={user}
          updateGame={updateGame}
          onStartPlaying={startPlaying}
        />
      );
    case 'playing':
      return (
        <PlayingPhase
          gameState={gameState}
          user={user}
          updateGame={updateGame}
          onSubmitRound={submitRound}
        />
      );
    case 'roundSummary':
      return (
        <RoundSummary
          gameState={gameState}
          onNextRound={nextRound}
          onLeave={handleLeave}
        />
      );
    default:
      return <Lobby roomCode={roomCode} gameState={gameState} onStartGame={startGame} />;
  }
}

export default App;
