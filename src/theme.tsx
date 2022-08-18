import { createTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

type MyType = typeof palette['common'];

declare module '@mui/material/styles/createPalette' {
  interface CommonColors extends MyType {}
}

const primaryBlue = '#00639D';
const secondaryGrey = '#7A8696';

const palette = {
  background: {
    paper: 'rgba(255, 255, 255, 1)',
    default: 'rgba(243, 247, 253, 1)',
  },
  primary: {
    main: primaryBlue,
  },
  secondary: {
    main: secondaryGrey,
    contrastText: 'rgba(255, 255, 255, 1)',
  },
  error: {
    light: '#e57373',
    main: 'rgba(235, 87, 87, 1)',
    dark: '#d32f2f',
    contrastText: 'rgba(83, 83, 83, 1)',
  },
  text: {
    primary: 'rgba(83, 83, 83, 1)',
    secondary: 'rgba(113, 113, 113, 1)',
    disabled: 'rgba(189, 189, 189, 1)',
  },
  common: {
    black: 'rgba(113, 113, 113, 1)',
    white: 'rgba(255, 255, 255, 1)',
    chetwodeBlue: '#7a89dd',
    lavender: '#A06AB4',
    lightLavender: 'rgba(202, 220, 255, 0.2)',
    sanmarino: '#414EA4',
    red: '#E84D4D',
    lightRed: '#FFF0F0',
    silver: '#C0C0C0',
    bhaBlue: '#00639D',
    linkWater: '#C6CCD6',
    aliceBlue: '#F6F8FC',
    cloudyBlue: '#DDE7F6',
    lightCloudyBlue: '#E7EEF6',
    darkCloudyBlue: 'rgba(202, 220, 255, 0.3)',
    lightGreen: '#F2FCF1',
    aquaGreen: '#D2E4E6',
    green: '#3EC336',
    matisse: '#1E75A8',
    boulder: '#757575',
    pastelBlue: '#5f9dc2',
    softBlue: '#628AF1',
    signalWhite: '#FAFBFC',
    grey: '#7A8696',
    lightGrey: '#F8F8F8',
    lightBlue: '#E4F6F8',
    turquoise: '#009D94',
    doveGray: '#6F6F6F',
    squeeze: '#E8F1F6',
    started: '#fffb00',
    stopped: '#c87e00',
    cornflowerBlue: '#5F9DC28C',
    malibu: '#7190FF',
    ceruleanBlue: '#2348C9',
    astrolableReef: '#2B91CD',
    mediumPersianBlue: '#166492',
  },
  tonalOffset: { light: 0.7, dark: 0.2 },
};

const createMuiTheme = () => {
  let theme = createTheme({
    palette,
    typography: {
      fontFamily: 'Roboto',
      fontSize: 14,
      h5: {
        fontWeight: 'bold',
      },
      h1: {
        fontSize: 110,
      },
    },
  });

  theme = createTheme(theme, {
    palette: {
      text: {
        hint: 'rgba(16, 153, 255, 1)',
      },
    },
  });

  // Override components styles
  theme = createTheme(theme, {
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '&:focus': { outline: 'none' },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            backgroundColor: theme.palette.common.bhaBlue,
          },
          containedSecondary: {
            color: theme.palette.common.white,
          },
        },
      },
      MuiTablePagination: {
        root: {
          styleOverrides: {
            display: 'flex',
            justifyContent: 'center',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            color: 'white',
            backgroundColor: alpha(theme.palette.common.black, 0.6),
          },
        },
      },
    },
  });
  return theme;
};

const theme = createMuiTheme();

export type Theme = typeof theme;

export default theme;
