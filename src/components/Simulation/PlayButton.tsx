/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@mui/material';
import _ from 'lodash';
import React, { useState } from 'react';
import useInterval from 'src/hooks/useInterval';

interface IPlayButtonProps {
  value: number;
  onValueChanged: (value: number) => void;
  rangeMax: number;
  step: () => boolean;
}

export const PlayButton: React.FC<IPlayButtonProps> = ({ onValueChanged, rangeMax, value, step }) => {
  const [moving, setMoving] = useState(false);

  useInterval(() => {
    if (moving) {
      // let newSliderValue: number = value + rangeMax / 100;
      // if (newSliderValue > rangeMax) {
      //   setMoving(false);
      //   newSliderValue = 0;
      // }
      // onValueChanged(newSliderValue);
      setMoving(step());
    }
  }, 100);

  return (
    <Button
      variant='contained'
      sx={{ width: 80 }}
      onClick={() => {
        setMoving((prevValue) => !prevValue);
      }}
    >
      {moving ? 'Pause' : 'Play'}
    </Button>
  );
};
