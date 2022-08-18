import { FC, memo, useMemo, useState } from 'react';
import { alpha, Box, Grid, styled } from '@mui/material';

import { NodeInterface } from 'src/components/ForceGraph';

type SegmentRowProp = {
  playing: boolean;
  showHighlight: boolean;
  isClickable?: boolean;
};

const StyledColumn = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.darkCloudyBlue,
  backgroundBlendMode: 'multiply',
  borderRadius: theme.spacing(1),
  zIndex: 0,
}));

const StyledRow = styled(Box, {
  shouldForwardProp: (prop) => !['playing', 'showHighlight', 'isClickable'].includes(prop.toString()),
})<SegmentRowProp>(({ theme, showHighlight, playing, isClickable }) => ({
  backgroundColor: showHighlight ? theme.palette.common.darkCloudyBlue : undefined,
  borderRadius: theme.spacing(1),
  backgroundBlendMode: 'multiply',
  zIndex: 0,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  border: playing ? '3px solid' : '',
  borderColor: playing ? theme.palette.primary.main : '',
  '&:hover': isClickable
    ? {
        color: theme.palette.common.bhaBlue,
        backgroundColor: alpha(theme.palette.primary.main, 0.5),
      }
    : undefined,
}));

const defaultCurrentTime = null;
const defaultSelectedTime = null;

// ToDo pass as props
const columns = [
  { name: 'Time', template: '1fr' },
  { name: 'Name', template: '2fr' },
];

interface ITimelineBaseProps {
  rowHeight?: string;
}

interface ITimelineProps extends ITimelineBaseProps {
  timelineEvents: NodeInterface[];
}

const TimelineTable: FC<ITimelineProps> = ({ timelineEvents, rowHeight = '1fr' }) => {
  const [currentTime, setCurrentTime] = useState<number>(defaultCurrentTime);
  const [selectedTime, setSelectedTime] = useState<number>(defaultSelectedTime);

  return (
    <Grid container direction='column' rowSpacing={2} marginBottom={2}>
      <Grid item container>
        <TimelineTableRows
          timelineEvents={timelineEvents}
          currentPlayTime={currentTime}
          rowHeight={rowHeight}
          onSelectEvent={(event) => {
            //
          }}
        />
      </Grid>
    </Grid>
  );
};

interface ISegmentDetailProps extends ITimelineBaseProps {
  timelineEvents: NodeInterface[];
  currentPlayTime: number;
  onSelectEvent: (event: NodeInterface) => void;
}

const TimelineTableRows: FC<ISegmentDetailProps> = ({ timelineEvents, currentPlayTime, onSelectEvent: onSelectSegment, rowHeight }) => {
  const gridTemplateColumns = useMemo(() => columns.map(({ template }) => template).join(' '), []);

  return (
    <Box sx={{ width: 1 }}>
      <Box
        display='grid'
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={`1fr repeat(${timelineEvents.length}, ${rowHeight}) auto`}
        columnGap={0.4}
        rowGap={1}
      >
        {/* Column highlights */}
        {columns.map(({ name }, index) => (
          <StyledColumn key={name} gridColumn={index + 1} gridRow='1/ -1' padding={1}></StyledColumn>
        ))}

        <StyledRow gridColumn='1/ -1' gridRow={1} showHighlight={false} playing={false}>
          <Box display='grid' gridTemplateColumns={gridTemplateColumns}>
            {columns.map(({ name }) => (
              <Box key={name} padding={1}>
                {name}
              </Box>
            ))}
          </Box>
        </StyledRow>

        {timelineEvents.map((timelineEvent, index) => (
          <StyledRow
            isClickable
            key={timelineEvent.id}
            gridColumn='1/ -1'
            gridRow={index + 2}
            showHighlight={index % 2 === 0}
            playing={false}
            onClick={() => onSelectSegment(timelineEvent)}
          >
            <Box display='grid' gridTemplateColumns={gridTemplateColumns}>
              <Box padding={1}>{timelineEvent.details.name}</Box>
              <Box padding={1}>{timelineEvent.details.name}</Box>
            </Box>
          </StyledRow>
        ))}
      </Box>
    </Box>
  );
};

export default memo(TimelineTable);
