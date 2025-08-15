import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useState } from 'react';
import D01 from '../otazkytrends/D01';
import DEM02 from '../otazkytrends/DEM02';
import DEM01 from '../otazkytrends/DEM01';
import IP04 from '../otazkytrends/IP04';
import IP05 from '../otazkytrends/IP05';
import IP07 from '../otazkytrends/IP07';
import IP03 from '../otazkytrends/IP03';
import IP02 from '../otazkytrends/IP02';
import IPP01 from '../otazkytrends/IPP01';
import InsertChartIcon from '@mui/icons-material/InsertChart';

const Trends = () => {
  const [visibleCharts, setVisibleCharts] = useState({
    d01: true,
    dem02: false,
    dem01: true,
    ip04: true,
    ip03: true,
    ip05: true,
    ip07: true,
    ip02: true,
    ipp01: true,
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
      <Box bgcolor="#ffffff" p={3} borderRadius={1} boxShadow={3} mb={4}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <InsertChartIcon sx={{ fontSize: 30, color: '#1b1c3a' }} />
          <Typography variant="h4" component="h2">
            <strong>Vizualizace dat</strong>
          </Typography>
        </Box>

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
              Grafy zobrazují vývoj jednotlivých odpovědí v čase podle různých sociodemografických kategorií. Sledujeme,
              jak často tuto odpověď vybírají různé skupiny – např. muži vs. ženy, nebo různé věkové kategorie – v
              průběhu jednotlivých měsíců. Data jsou simulována pro účely vizualizace a ilustrují trendy od března 2023
              do července 2025.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography variant="h5" gutterBottom>
        <strong>Přehled jednotlivých kmenových zkoumaných otázek:</strong>
      </Typography>

      {/* Ovládací panel */}
      <FormGroup row sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleCharts.ipp01}
              onChange={() => handleToggle('ipp01')}
              sx={{
                color: '#1b1c3a',
                '&.Mui-checked': {
                  color: '#1b1c3a',
                },
                '&:hover': {
                  backgroundColor: 'rgba(27, 28, 58, 0.04)',
                },
              }}
            />
          }
          label="Sledovanost médií"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={visibleCharts.ip02}
              onChange={() => handleToggle('ip02')}
              sx={{
                color: '#1b1c3a',
                '&.Mui-checked': {
                  color: '#eac991ff',
                },
                '&:hover': {
                  backgroundColor: 'rgba(27, 28, 58, 0.04)',
                },
              }}
            />
          }
          label="Vystavení dezinformacím"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleCharts.ip03}
              onChange={() => handleToggle('ip03')}
              sx={{
                color: '#1b1c3a',
                '&.Mui-checked': {
                  color: '#eac991ff',
                },
                '&:hover': {
                  backgroundColor: 'rgba(27, 28, 58, 0.04)',
                },
              }}
            />
          }
          label="Vystavení dezinformacím"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleCharts.ip04}
              onChange={() => handleToggle('ip04')}
              sx={{
                color: '#1b1c3a',
                '&.Mui-checked': {
                  color: '#eac991ff',
                },
                '&:hover': {
                  backgroundColor: 'rgba(27, 28, 58, 0.04)',
                },
              }}
            />
          }
          label="Závažnost šíření dezinformací"
        />


        <FormControlLabel
          control={
            <Checkbox
              checked={visibleCharts.ip05}
              onChange={() => handleToggle('ip05')}
              sx={{
                color: '#1b1c3a',
                '&.Mui-checked': {
                  color: '#eac991ff',
                },
                '&:hover': {
                  backgroundColor: 'rgba(27, 28, 58, 0.04)',
                },
              }}
            />
          }
          label="Šíření dezinformací a ohrožení bezpečnosti Čr"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleCharts.ip07}
              onChange={() => handleToggle('ip07')}
              sx={{
                color: '#1b1c3a',
                '&.Mui-checked': {
                  color: '#eac991ff',
                },
                '&:hover': {
                  backgroundColor: 'rgba(27, 28, 58, 0.04)',
                },
              }}
            />
          }
          label="IP07"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleCharts.d01}
              onChange={() => handleToggle('d01')}
              sx={{
                color: '#1b1c3a',
                '&.Mui-checked': {
                  color: '#b7b7b7ff',
                },
                '&:hover': {
                  backgroundColor: 'rgba(27, 28, 58, 0.04)',
                },
                
              }}
            />
          }
          label="Konec konfliktu na Ukrajině"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleCharts.dem01}
              onChange={() => handleToggle('dem01')}
              sx={{
                color: '#1b1c3a',
                '&.Mui-checked': {
                  color: '#b7b7b7ff',
                },
                '&:hover': {
                  backgroundColor: 'rgba(27, 28, 58, 0.04)',
                },
              }}
            />
          }
          label="Spokojenost s demokracií"
        />
        
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleCharts.dem02}
              onChange={() => handleToggle('dem02')}
              sx={{
                color: '#1b1c3a',
                '&.Mui-checked': {
                  color: '#b7b7b7ff',
                },
                '&:hover': {
                  backgroundColor: 'rgba(27, 28, 58, 0.04)',
                },
              }}
            />
          }
          label="Vnímání situace v ČR"
        />
      </FormGroup>
      {/* IPP01 */}
      {visibleCharts.ipp01 && (
        <Box bgcolor='#1b1c3a' color="#ffffff" p={3} borderRadius={1} boxShadow={3} mb={4}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            <strong>Sledovanost médií</strong>
          </Typography>
          <Typography paragraph>
            Když se zamyslíte nad uplynulým měsícem, jak často jste v běžném týdnu sledoval/a nebo poslouchal/a zpravodajství:
          </Typography>
          <IPP01 />
        </Box>
      )}


      {/* IP02 */}
      {visibleCharts.ip02 && (
        <Box bgcolor='#eac991ff' p={3} borderRadius={1} boxShadow={3} mb={4}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            <strong>Vystavení dezinformacím</strong>
          </Typography>
          <Typography paragraph>
            Do jaké míry jste v uplynulém měsíci podle Vašeho názoru byl/a, anebo nebyl/a vystaven/a účelově šířeným nepravdivým či manipulativním informacím (někdy též označovaným jako „dezinformace“) v médiích?
          </Typography>
          <IP02 />
        </Box>
      )}

 {/* IP03 */}
      {visibleCharts.ip03 && (
        <Box bgcolor='#eac991ff' p={3} borderRadius={1} boxShadow={3} mb={4}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            <strong>Vystavení dezinformacím</strong>
          </Typography>
          <Typography paragraph>
            Do jaké míry jste v uplynulém měsíci podle Vašeho názoru byl/a, anebo nebyl/a vystaven/a účelově šířeným nepravdivým či manipulativním informacím (někdy též označovaným jako „dezinformace“) v médiích?
          </Typography>
          <IP03 />
        </Box>
      )}

      {/* IP04 */}
      {visibleCharts.ip04 && (
        <Box bgcolor='#eac991ff' p={3} borderRadius={1} boxShadow={3} mb={4}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            <strong>Závažnost šíření dezinformací</strong>
          </Typography>
          <Typography paragraph>
            Jak závažným problémem je podle Vás šíření nepravdivých a manipulativních informací (někdy též označovaných jako „dezinformace“) po internetu?
          </Typography>
          <IP04 />
        </Box>
      )}

      {/* IP05 */}
      {visibleCharts.ip05 && (
        <Box>
          {(() => {
            try {
              return (
                <Box bgcolor='#eac991ff' p={3} borderRadius={1} boxShadow={3} mb={4}>
                  <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
                    <strong>Šíření dezinformací a ohrožení bezpečnosti Čr</strong>
                  </Typography>
                  <Typography paragraph>
                    Myslíte si, že šíření nepravdivých a manipulativních informací (někdy též označovaných jako „dezinformace“) ohrožuje bezpečnost České republiky?
                  </Typography>
                  <IP05 />
                </Box>
              );
            } catch (err) {
              console.error('Chyba při renderu IP05:', err);
              return <Typography color="error">Chyba při načítání grafu IP05.</Typography>;
            }
          })()}
        </Box>
      )}
      {/* IP07 */}
      {visibleCharts.ip07 && (
        <Box bgcolor='#eac991ff' p={3} borderRadius={1} boxShadow={3} mb={4}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            <strong>Závažnost šíření dezinformací</strong>
          </Typography>
          <Typography paragraph>
            Jak závažným problémem je podle Vás šíření nepravdivých a manipulativních informací (někdy též označovaných jako „dezinformace“) po internetu?
          </Typography>
          <IP07 />
        </Box>
      )}
      {/* D01 */}
      {visibleCharts.d01 && (
        <Box bgcolor='#b7b7b7ff'  p={3} borderRadius={1} boxShadow={3} mb={4}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            <strong>Konec konfliktu na Ukrajině</strong>
          </Typography>
          <Typography paragraph>
            Jak byste si přál(a), aby skončil konflikt na Ukrajině?
          </Typography>
          <D01 />
        </Box>
      )}
     
      {/* DEM01 */}
      {visibleCharts.dem01 && (
        <Box bgcolor="#b7b7b7ff" p={3} borderRadius={1} boxShadow={3} mb={4}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            <strong>Spokojenost s demokracií</strong>
          </Typography>
          <Typography paragraph>
            Jak jste spokojen/a s fungováním demokracie v České republice?
          </Typography>
          <DEM01 />
        </Box>
      )}
      {/* DEM02 */}
      {visibleCharts.dem02 && (
        <Box bgcolor="#b7b7b7ff" p={3} borderRadius={1} boxShadow={3} mb={4}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            <strong>Vnímání situace v České republice</strong>
          </Typography>
          <Typography paragraph>
            Do jaké míry podle Vás popisují následující tvrzení situaci v České republice?
          </Typography>
          <DEM02 />
        </Box>
      )}


    </Box>
  );
};

export default Trends;
