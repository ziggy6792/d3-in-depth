import { FC, memo, useMemo, useState } from 'react';
import { alpha, Box, Grid, styled } from '@mui/material';

import { NodeInterface } from 'src/components/ForceGraph';

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

const StyledTimelineRow = styled(Box, {
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
  timelineEvents: NodeInterface[];
}

const columns = [
  { name: 'Time', template: '1fr' },
  { name: 'Name', template: '1fr' },
  { name: 'Bla', template: '1fr' },
];

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
          onSelectEvent={(event) => {
            //
          }}
        />
      </Grid>
    </Grid>
  );
};

interface ISegmentDetailProps {
  timelineEvents: NodeInterface[];
  currentPlayTime: number;
  onSelectEvent: (event: NodeInterface) => void;
}

const TimelineTableRows: FC<ISegmentDetailProps> = (props) => {
  const { timelineEvents, currentPlayTime, onSelectEvent: onSelectSegment } = props;

  const gridTemplateColumns = useMemo(() => columns.map(({ template }) => template).join(' '), []);

  return (
    <Box sx={{ width: 1 }}>
      <Box
        display='grid'
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={`40px repeat(${timelineEvents.length}, 50px) auto`}
        columnGap={0.4}
        rowGap={1}
      >
        {columns.map(({ name }, index) => (
          <StyledBox gridColumn={index + 1} gridRow='1/ -1' padding={1}>
            {name}
          </StyledBox>
        ))}

        {timelineEvents.map((timelineEvent, index) => (
          <StyledTimelineRow
            key={timelineEvent.id}
            gridColumn='1/ -1'
            gridRow={index + 2}
            index={index}
            playing={false}
            onClick={() => onSelectSegment(timelineEvent)}
          >
            <Box display='grid' gridTemplateColumns={gridTemplateColumns}>
              <Box padding={1}>{timelineEvent.details.name}</Box>
              <Box padding={1}>{timelineEvent.details.name}</Box>
            </Box>
          </StyledTimelineRow>
        ))}
      </Box>
    </Box>
  );
};

export default memo(TimelineTable);
