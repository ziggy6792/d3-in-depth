import { FC, memo, useEffect, useState } from 'react';
import { alpha, Box, Chip, Grid, styled, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import _ from 'lodash';

type SegmentRowProp = {
  index: number;
  playing: boolean;
};

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.darkCloudyBlue,
  backgroundBlendMode: 'multiply',
  borderRadius: theme.spacing(1),
  zIndex: 0,
}));

const StyledSegmentRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'index' && prop !== 'playing',
})<SegmentRowProp>(({ theme, index, playing }) => ({
  backgroundColor: index % 2 === 0 ? theme.palette.common.darkCloudyBlue : undefined,
  borderRadius: theme.spacing(1),
  backgroundBlendMode: 'multiply',
  zIndex: 0,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  border: playing ? '3px solid' : '',
  borderColor: playing ? theme.palette.primary.main : '',
  '&:hover': {
    color: theme.palette.common.bhaBlue,
    backgroundColor: alpha(theme.palette.primary.main, 0.5),
  },
}));

const defaultCurrentTime = null;
const defaultSelectedTime = null;

interface ICallSegmentsProps {
  timelineEvents: ITimelineEvent[];
}

const TimelineTable: FC<ICallSegmentsProps> = (props) => {
  const { timelineEvents } = props;
  const [currentTime, setCurrentTime] = useState<number>(defaultCurrentTime);
  const [selectedTime, setSelectedTime] = useState<number>(defaultSelectedTime);

  return (
    <Grid container direction='column' rowSpacing={2} marginBottom={2}>
      <Grid item container>
        <TimelineTableRows
          timelineEvents={timelineEvents}
          currentPlayTime={currentTime}
          onSelectSegment={(segment) => {
            setSelectedTime(segment.timecodeInSeconds);
          }}
        />
      </Grid>
    </Grid>
  );
};

export interface ITimelineEvent {
  conversationId: string;
  segmentId: string;
  timecode: string;
  timecodeInSeconds: number;
  iconSource: string;
  transcript: string;
  dialogSequence: number;
  notes: string;
}

interface ISegmentDetailProps {
  timelineEvents: ITimelineEvent[];
  currentPlayTime: number;
  onSelectSegment: (segment: ITimelineEvent) => void;
}

const TimelineTableRows: FC<ISegmentDetailProps> = (props) => {
  const { timelineEvents, currentPlayTime, onSelectSegment } = props;
  const isPlayingSegment = (currentSegment: ITimelineEvent, currentIndex: number): boolean => {
    if (!currentPlayTime) {
      return false;
    }

    let nextSegment = null;
    let isPlaying = false;

    // Not last segment
    if (currentIndex + 1 < timelineEvents.length) {
      nextSegment = timelineEvents[currentIndex + 1];
      isPlaying = currentPlayTime >= currentSegment.timecodeInSeconds && currentPlayTime < nextSegment.timecodeInSeconds;
    }
    // Last segment
    else {
      isPlaying = currentPlayTime >= currentSegment.timecodeInSeconds;
    }

    return isPlaying;
  };

  const gridTemplateColumns = '1fr 2fr';

  return (
    <Box sx={{ width: 1 }}>
      <Box
        display='grid'
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={`40px repeat(${timelineEvents.length}, 50px) auto`}
        columnGap={0.4}
        rowGap={1}
      >
        <StyledBox gridColumn='1' gridRow='1/ -1' padding={1}>
          column 1
        </StyledBox>
        <StyledBox gridColumn='2' gridRow='1/ -1' padding={1}>
          column 2
        </StyledBox>

        {timelineEvents.map((segment, index) => (
          <>
            <StyledSegmentRow
              key={segment.segmentId}
              gridColumn='1/ -1'
              gridRow={index + 2}
              index={index}
              playing={isPlayingSegment(segment, index)}
              onClick={() => onSelectSegment(segment)}
            >
              <Box display='grid' gridTemplateColumns={gridTemplateColumns}>
                <Box gridColumn='1' padding={1}>
                  hi
                </Box>
                <Box gridColumn='2' padding={1}>
                  bye
                </Box>
              </Box>
            </StyledSegmentRow>
          </>
        ))}
      </Box>
    </Box>
  );
};

export default memo(TimelineTable);
