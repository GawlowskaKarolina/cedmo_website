import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useState } from 'react';
import D01 from '../otazkytrends/D01';
import DEM02 from '../otazkytrends/DEM02';
import InsertChartIcon from '@mui/icons-material/InsertChart';


const Trends = () => {
  const [visibleCharts, setVisibleCharts] = useState({
    d01: true,
    dem02: true,
  });

  const handleToggle = (chart: keyof typeof visibleCharts) => {
    setVisibleCharts((prev) => ({
      ...prev,
      [chart]: !prev[chart],
    }));
  };

  return (
    <Box p={4} sx={{ maxWidth: 1200, mx: 'auto', fontFamily: 'Roboto, sans-serif' }}>
      {/* Úvodní box včetně nadpisu */}
      <Box
        bgcolor="#ffffff"
        p={3}
        borderRadius={3}
        boxShadow={3}
        mb={4}
      >
        {/* Nadpis */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
  <InsertChartIcon sx={{ fontSize: 30, color: '#1b1c3a'}} />
  <Typography variant="h4" component="h2">
    <strong>Vizualizace dat</strong>
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
                <a
                  href="https://cedmohub.eu/cs/cedmo-trends/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#1b1c3a',
                    textDecoration: 'none',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#ffcd06')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#1b1c3a')}
                >
                  CEDMO Trends ČR
                </a>
              </strong>{' '}
              Grafy zobrazují vývoj jendotlivých odpovědí v čase podle různých sociodemografické kategorií. Sledujeme, jak často tuto odpověď vybírají různé skupiny – např. muži vs. ženy,
          nebo různé věkové kategorie – v průběhu jednotlivých měsíců. Data jsou simulována pro účely vizualizace a ilustrují trendy od března 2023 do července 2025.
            </Typography>
          </Box>

          
        </Box>
      </Box>

      <Typography variant="h5" gutterBottom>
            <strong>Přehled trendů jednotlivých zkoumaných otázky:</strong>
          </Typography>
      {/* Ovládací panel - stylované checkboxy */}
      <FormGroup row sx={{ mb: 4 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleCharts.d01}
              onChange={() => handleToggle('d01')}
              sx={{
                color: '#1b1c3a',
                '&.Mui-checked': {
                  color: '#ffcd06',
                },
                '&:hover': {
                  backgroundColor: 'rgba(27, 28, 58, 0.04)',
                },
              }}
            />
          }
          label="Zobrazit: Konec konfliktu na Ukrajině"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleCharts.dem02}
              onChange={() => handleToggle('dem02')}
              sx={{
                color: '#1b1c3a',
                '&.Mui-checked': {
                  color: '#ffcd06',
                },
                '&:hover': {
                  backgroundColor: 'rgba(27, 28, 58, 0.04)',
                },
              }}
            />
          }
          label="Zobrazit: Vnímání situace v ČR"
        />
      </FormGroup>

      {/* Grafy */}
      {visibleCharts.d01 && (
        <Box

        
        bgcolor='#1b1c3a'
        color='#ffffff'
        p={3}
        borderRadius={3}
        boxShadow={3}
        mb={4}
      >
        {/* Nadpis */}
        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
          <strong>Konec konfliktu na Ukrajině</strong>
        </Typography>
          <Typography paragraph>
            Tento graf zkoumá, jak různé demografické skupiny (např. pohlaví, věk nebo vzdělání) vnímají možné scénáře
            konce války na Ukrajině.
          </Typography>
          <D01 />
        </Box>
      )}

      {visibleCharts.dem02 && (
        <Box 

        bgcolor="#f5f5f5"
       
        p={3}
        borderRadius={3}
        boxShadow={3}
        mb={4}
      >
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            <strong>Vnímání situace v České republice</strong>
          </Typography>
          <Typography paragraph>
            Tento graf umožňuje sledovat postoje veřejnosti k různým společenským tématům, jako je důvěra v instituce,
            pocit bezpečí, korupce nebo víra v demokratický proces.
          </Typography>
          <DEM02 />
        </Box>
      )}


      <Box
  bgcolor="#ffffff"
  p={3}
  borderRadius={3}
  boxShadow={3}
  mb={4}
>
  <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
    <strong>Spokojenost s demokracií</strong>
  </Typography>
  <Typography paragraph>
    Tato vizualizace ukazuje, jak respondenti hodnotí fungování demokracie v České republice.
    Každá část postavy odpovídá jedné kategorii odpovědi.
  </Typography>
</Box>
    </Box>
  );
};

export default Trends;
