/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@mui/material';
import React from 'react';
import useInterval from 'src/hooks/useInterval';

interface IPlayButtonProps {
  onStep: () => boolean;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  stepsPerSecond: number
}

export const PlayButton: React.FC<IPlayButtonProps> = ({ onStep, playing, setPlaying, stepsPerSecond }) => {
  useInterval(() => {
    if (playing) {
      setPlaying(onStep());
    }
  }, 100);

  return (
    <Button
      variant='contained'
      sx={{ width: 80 }}
      onClick={() => {
        setPlaying(!playing);
      }}
    >
      {playing ? 'Pause' : 'Play'}
    </Button>
  );
};
