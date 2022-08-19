import { memo, useMemo } from 'react';
import { alpha, Box, Grid, Typography } from '@mui/material';
import { makeStyles } from 'src/makeStyles';

type SegmentRowProp = {
  playing: boolean;
  showHighlight: boolean;
  isClickable?: boolean;
};

const useTableStyles = makeStyles()((theme) => ({
  boxBase: {
    backgroundColor: theme.palette.common.darkCloudyBlue,
    backgroundBlendMode: 'multiply',
    borderRadius: theme.spacing(1),
    zIndex: 0,
  },
}));

const useRowStyles = makeStyles<SegmentRowProp>()((theme, { showHighlight, playing, isClickable }) => ({
  tableRow: {
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
  },
}));

// ToDo pass as props
const columns = [
  { name: 'Time', template: '1fr' },
  { name: 'Name', template: '2fr' },
];

interface ITimelineBaseProps<RowType> {
  rowHeight?: string;
  selectedRow?: RowType;
  onRowSelected?: (selectedRow: RowType) => void;
  renderRow?: (rowData: RowType) => React.ReactNode;
}

interface ITimelineProps<RowType> extends ITimelineBaseProps<RowType> {
  rows: RowType[];
}

const TimelineTable = <RowType,>({ rows, rowHeight = '1fr', ...rest }: ITimelineProps<RowType>) => {
  return (
    <Grid container direction='column' rowSpacing={2} marginBottom={2}>
      <Grid item container>
        <TimelineTableRows rows={rows} rowHeight={rowHeight} {...rest} />
      </Grid>
    </Grid>
  );
};

interface ISegmentDetailProps<RowType> extends ITimelineBaseProps<RowType> {
  rows: RowType[];
}

const TimelineTableRows = <RowType,>({ rows, rowHeight, ...rest }: ISegmentDetailProps<RowType>) => {
  const gridTemplateColumns = useMemo(() => columns.map(({ template }) => template).join(' '), []);

  const { classes } = useTableStyles();
  const { classes: rowClasses } = useRowStyles({ showHighlight: false, playing: false, isClickable: false });

  return (
    <Box sx={{ width: 1 }}>
      <Box
        display='grid'
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={`1fr repeat(${rows.length}, ${rowHeight}) auto`}
        columnGap={0.4}
        rowGap={1}
      >
        {/* Column highlights */}
        {columns.map(({ name }, index) => (
          <Box className={classes.boxBase} key={name} gridColumn={index + 1} gridRow='1/ -1' padding={1}></Box>
        ))}

        <Box className={rowClasses.tableRow} gridColumn='1/ -1' gridRow={1}>
          <Box display='grid' gridTemplateColumns={gridTemplateColumns}>
            {columns.map(({ name }) => (
              <Box key={name} padding={1}>
                <Typography color='white'> {name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {rows.map((row, index) => (
          <TimelineTableRow index={index} key={index} row={row} gridTemplateColumns={gridTemplateColumns} {...rest} />
        ))}
      </Box>
    </Box>
  );
};

interface TimelineTableRowProps<RowType> extends ITimelineBaseProps<RowType> {
  row: RowType;
  index: number;
  gridTemplateColumns: string;
}

const TimelineTableRow = <RowType,>({ row, index, gridTemplateColumns, selectedRow, renderRow }: TimelineTableRowProps<RowType>) => {
  const { classes: rowClasses } = useRowStyles({ showHighlight: index % 2 === 0, playing: row === selectedRow, isClickable: true });

  return (
    <Box className={rowClasses.tableRow} gridColumn='1/ -1' gridRow={index + 2} onClick={() => null}>
      <Box display='grid' gridTemplateColumns={gridTemplateColumns}>
        <Box padding={1}>
          <Typography color='white'>bla </Typography>
        </Box>
        <Box padding={1}>
          <Typography color='white'>bla </Typography>
        </Box>
        {renderRow && renderRow(row)}
      </Box>
    </Box>
  );
};

export default memo(TimelineTable);
