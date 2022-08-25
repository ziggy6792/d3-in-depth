import { createTheme } from '@mui/material';

type MyType = typeof palette['common'];

declare module '@mui/material/styles/createPalette' {
  interface CommonColors extends MyType {}
}

const palette = {
  common: {
    bhaBlue: '#00639D',
    lightCloudyBlue: '#E7EEF6',
    darkCloudyBlue: 'rgba(202, 220, 255, 0.3)',
  },
};

const theme = createTheme({
  palette,
});

export type Theme = typeof theme;

export default theme;
