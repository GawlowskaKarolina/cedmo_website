// src/theme.ts
import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#1b1c3a', // vaše modrá 💙
    },
  },
  typography: {
    fontFamily: '"Inter", "Arial", sans-serif',
    h1: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, fontSize: '3rem' },
    h2: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, fontSize: '2.25rem' },
    h3: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, fontSize: '1.75rem' },
    h4: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 500, fontSize: '1.5rem' },
    h5: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 500, fontSize: '1.25rem' },
    h6: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 500, fontSize: '1rem' },
    body1: { fontFamily: '"Inter", sans-serif', fontSize: '1rem' },
    body2: { fontFamily: '"Inter", sans-serif', fontSize: '0.875rem' },
    caption: { fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem' },
  },
});

export default Theme;
