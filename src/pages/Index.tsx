import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import mapImage from '../assets/eu.jpg';
import Calculator from '../components/Cal';
import CalculateIcon from '@mui/icons-material/Calculate';

// Typy
type Country = {
  code: string;
  name: string;
  flag: string;
  area: string;
  population: string;
  index: number;
};

type Explanation = {
  label: string;
  weight: number;
};

// Data států
const countries: Country[] = [
  {
    code: 'CZ',
    name: 'Česko',
    flag: 'https://flagcdn.com/w80/cz.png',
    area: '78 866 km²',
    population: '10.5 mil.',
    index: 72.5,
  },
  {
    code: 'SK',
    name: 'Slovensko',
    flag: 'https://flagcdn.com/w80/sk.png',
    area: '49 035 km²',
    population: '5.4 mil.',
    index: 68.3,
  },
  {
    code: 'HU',
    name: 'Maďarsko',
    flag: 'https://flagcdn.com/w80/hu.png',
    area: '93 028 km²',
    population: '9.6 mil.',
    index: 65.7,
  },
  {
    code: 'FI',
    name: 'Finsko',
    flag: 'https://flagcdn.com/w80/fi.png',
    area: '338 455 km²',
    population: '5.5 mil.',
    index: 78.9,
  },
  {
    code: 'FR',
    name: 'Francie',
    flag: 'https://flagcdn.com/w80/fr.png',
    area: '643 801 km²',
    population: '67 mil.',
    index: 70.1,
  },
  {
    code: 'PL',
    name: 'Polsko',
    flag: 'https://flagcdn.com/w80/pl.png',
    area: '312 696 km²',
    population: '38 mil.',
    index: 66.8,
  },
  {
    code: 'EE',
    name: 'Estonsko',
    flag: 'https://flagcdn.com/w80/ee.png',
    area: '45 227 km²',
    population: '1.3 mil.',
    index: 74.2,
  },
  {
    code: 'DE',
    name: 'Německo (SRN)',
    flag: 'https://flagcdn.com/w80/de.png',
    area: '357 022 km²',
    population: '83 mil.',
    index: 69.4,
  },
  {
    code: 'SI',
    name: 'Slovinsko',
    flag: 'https://flagcdn.com/w80/si.png',
    area: '20 273 km²',
    population: '2.1 mil.',
    index: 67.5,
  },
];

// Pozice teček
const countryPositions: Record<string, { x: string; y: string }> = {
  CZ: { x: '44%', y: '60.5%' },
  SK: { x: '50%', y: '63%' },
  HU: { x: '50%', y: '68%' },
  FI: { x: '55%', y: '28%' },
  FR: { x: '27%', y: '66%' },
  PL: { x: '50%', y: '55%' },
  EE: { x: '56%', y: '38%' },
  DE: { x: '38%', y: '57%' },
  SI: { x: '44%', y: '70%' },
};

// Komponenty indexu
const explanations: Explanation[] = [
  { label: 'Důvěra v média', weight: 25 },
  { label: 'Schopnost rozpoznat dezinformace', weight: 30 },
  { label: 'Vystavení informačním poruchám', weight: 20 },
  { label: 'Používání AI při konzumaci obsahu', weight: 25 },
];

// Barvy
const blue = '#1b1c3a';
const yellow = '#ffcd06';

const Index: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const country = countries.find((c) => c.code === selectedCountry);

  const toggleCountrySelection = (code: string) => {
    setSelectedCountry((prev) => (prev === code ? null : code));
  };

  return (
    <Box p={4} sx={{ maxWidth: 1200, mx: 'auto', fontFamily: 'Roboto, sans-serif' }}>
      <Box
        bgcolor="#ffffff"
        p={3}
        borderRadius={3}
        boxShadow={3}
        mb={4}
      >
        {/* Nadpis */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <CalculateIcon sx={{ fontSize: 30, color: '#1b1c3a' }} />
          <Typography variant="h4" component="h2">
            <strong>CEDMO Index</strong>
          </Typography>
        </Box>

        {/* Úvodní text + logo */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          gap={3}
        >
          <Box flex={1}>
            <Typography paragraph>
              <strong>
                CEDMO Index
              </strong>{' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis justo ut augue efficitur, nec luctus mi feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis justo ut augue efficitur, nec luctus mi feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis justo ut augue efficitur, nec luctus mi feugiat.
            </Typography>
          </Box>


        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Levá část: mapa */}
        <Box sx={{ flex: '1 1 450px', position: 'relative', minWidth: 300 }}>
          <img
            src={mapImage}
            alt="Mapa Evropy"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
          />

          {/* Tečky */}
          {Object.entries(countryPositions).map(([code, pos]) => (
            <Box
              key={code}
              onClick={() => toggleCountrySelection(code)}
              sx={{
                position: 'absolute',
                top: pos.y,
                left: pos.x,
                transform: 'translate(-50%, -50%)',
                width: 10,
                height: 10,
                bgcolor: selectedCountry === code ? yellow : blue,
                borderRadius: '50%',
                border: `3px solid ${selectedCountry === code ? blue : yellow}`,
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
              }}
            />
          ))}
        </Box>

        {/* Pravá část: info panel a komponenty indexu */}
        <Box
          sx={{
            flex: '1 1 400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            minWidth: 300,
          }}
        >
          {/* Info o zemi */}
          <Box>
            {country ? (
              <Paper
                sx={{
                  p: 3,
                  bgcolor: '#f5f5f5',
                  color: blue,
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                <Box
                  component="img"
                  src={country.flag}
                  alt={`${country.name} vlajka`}
                  sx={{ width: 100, borderRadius: 1, mb: 2, border: `2px solid ${blue}` }}
                />
                <Typography variant="h5" mb={1}>
                  {country.name}
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>Index:</strong> {country.index}
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>Rozloha:</strong> {country.area}
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>Počet obyvatel:</strong> {country.population}
                </Typography>
              </Paper>
            ) : (
              <Paper sx={{ p: 3, borderRadius: 2, bgcolor: '#f5f5f5', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  Klikni na zemi na mapě pro více informací o indexu.
                </Typography>
              </Paper>
            )}
          </Box>

          {/* Komponenty indexu */}
          <Paper sx={{ p: 2, bgcolor: blue, color: '#e5e5e5', borderRadius: 2 }}>
            <Typography variant="h5" mb={1} color='#ffcd06'>
              <strong>Komponenty indexu:</strong>
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
              {explanations.map(({ label, weight }) => (
                <li key={label}>
                  {label} (váha {weight}%)
                </li>
              ))}
            </ul>
          </Paper>
        </Box>
      </Box>
      {/* DOTAZNÍK / KALKULAČKA */}
      <Box mt={6}>
        <Calculator />
      </Box>
    </Box>
  );
};


export default Index;