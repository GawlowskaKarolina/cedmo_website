import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import BookIcon from '@mui/icons-material/Book';

const publications = [
  {
    title: 'Nová zpráva o informační bezpečnosti (2025)',
    description: 'Přehled nejnovějších zjištění v oblasti informační gramotnosti.',
    year: '2025',
    url: '/brief.pdf',
  },
  {
    title: 'Zpráva o stavu informační gramotnosti v ČR (2024)',
    description: 'Výzkumná zpráva z dat CEDMO Trends – mediální gramotnost a její vývoj.',
    year: '2024',
    url: '/brief.pdf',
  },
  {
    title: 'Akademická studie: Dopady dezinformací na rozhodování voličů (2023)',
    description: 'Studie publikovaná ve spolupráci s Univerzitou Karlovou.',
    year: '2023',
    url: '/brief.pdf',
  },
  {
    title: 'Shrnutí poznatků z období pandemie COVID-19 (2023)',
    description: 'Analytická zpráva o šíření misinformací v letech 2020–2023.',
    year: '2023',
    url: '/brief.pdf',
  },
];

const groupedByYear = publications.reduce((acc: Record<string, typeof publications>, pub) => {
  acc[pub.year] = acc[pub.year] || [];
  acc[pub.year].push(pub);
  return acc;
}, {});

const Publications: React.FC = () => {
  const [activePreview, setActivePreview] = useState<string | null>(null);

  const togglePreview = (url: string) => {
    setActivePreview((prev) => (prev === url ? null : url));
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
          <BookIcon sx={{ fontSize: 30, color: '#1b1c3a' }} />
          <Typography variant="h4" component="h2">
            <strong>Publikace vědeckých článků</strong>
          </Typography>
        </Box>

        {/* Úvodní text */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          gap={3}
        >
          <Box flex={1}>
            <Typography paragraph>
              Publikování vědeckých a akademických článků představuje klíčový nástroj pro sdílení nových poznatků, podporu odborné diskuse a rozvoj dané oblasti výzkumu. Kvalitní publikace nejen přispívají k prohlubování teoretického rámce oboru, ale zároveň nabízejí praktické implikace pro společnost, politiku či vzdělávání.
            </Typography>
            <Typography paragraph>
              Současné výzvy spojené s proměnou informačního prostředí, nárůstem digitálních médií a šířením informačních poruch vytvářejí nové oblasti zkoumání a kladou zvýšené nároky na mezioborovou spolupráci. Právě akademické publikace hrají v tomto kontextu zásadní roli – umožňují systematickou reflexi aktuálních trendů, testování hypotéz a formulaci doporučení, která mohou napomoci efektivněji reagovat na komplexní společenské změny.
            </Typography>
          </Box>
        </Box>
      </Box>

      {Object.entries(groupedByYear)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, pubs]) => (
          <Accordion
            key={year}
            defaultExpanded
            sx={{
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: 3,
              mb: 2,
              '&::before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">
                <strong>{year}</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {pubs.map((pub, index) => (
                <Box key={index} mb={4}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {pub.title}
                  </Typography>
                  <Typography variant="body2" mb={1}>
                    {pub.description}
                  </Typography>

                  <Box display="flex" gap={2} mb={1}>
                    <Button
                      variant="contained"
                      startIcon={<PictureAsPdfIcon />}
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: '#1b1c3a',
                        color: '#ffcd06',
                        '&:hover': {
                          bgcolor: '#ffcd06',
                          color: '#1b1c3a',
                        },
                      }}
                    >
                      Otevřít PDF
                    </Button>

                    <Button
                      variant="contained"
                      startIcon={activePreview === pub.url ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      onClick={() => togglePreview(pub.url)}
                      sx={{
                        bgcolor: '#1b1c3a',
                        color: '#ffcd06',
                        '&:hover': {
                          bgcolor: '#ffcd06',
                          color: '#1b1c3a',
                        },
                      }}
                    >
                      {activePreview === pub.url ? 'Skrýt náhled' : 'Zobrazit náhled'}
                    </Button>
                  </Box>

                  {activePreview === pub.url && (
                    <Box
                      mt={2}
                      sx={{
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 1,
                      }}
                    >
                      <iframe
                        src={pub.url}
                        width="100%"
                        height="500px"
                        style={{ border: 'none' }}
                        title={`Náhled ${pub.title}`}
                      ></iframe>
                    </Box>
                  )}

                  <Divider sx={{ my: 3 }} />
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
};

export default Publications;
