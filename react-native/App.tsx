import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { GameBoard } from './components/GameBoard';

export default function Root() {
  return (
    <ErrorBoundary>
      <GameBoard />
    </ErrorBoundary>
  );
}
