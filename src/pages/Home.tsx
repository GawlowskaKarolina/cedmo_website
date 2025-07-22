import React from "react";
import { Box, Typography } from '@mui/material';
import mapImage from "../assets/eu2.jpg";
import calculator from "../assets/calculator.jpg";
import Ipsos from "../assets/Ipsos.jpg";
import CZ from "../assets/cz.png";
import SK from "../assets/sk.png";
import LP from "../assets/LogoProjekt.jpg";
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Home: React.FC = () => {
  return (
    <Box p={4} sx={{ maxWidth: 1200, mx: 'auto', fontFamily: 'Roboto, sans-serif' }}>
      {/* Úvodní box */}
      <Box>
        <Box
          bgcolor="#ffffff"
          p={3}
          borderRadius={3}
          boxShadow={3}
          mb={4}
        >
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <HelpOutlineIcon sx={{ fontSize: 30, color: '#1b1c3a' }} />
            <Typography variant="h4" component="h2">
              <strong>Co je CEDMO?</strong>
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
                    href="https://cedmohub.eu/cs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#1b1c3a',
                      textDecoration: 'none',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#ffcd06')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#1b1c3a')}
                  >
                    CEDMO
                  </a>
                </strong>{' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis justo ut augue efficitur, nec luctus mi feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis justo ut augue efficitur, nec luctus mi feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis justo ut augue efficitur, nec luctus mi feugiat.
              </Typography>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis justo ut augue efficitur, nec luctus mi feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis justo ut augue efficitur, nec luctus mi feugiat.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* CEDMO Trends hlavní modrý box */}
        <Box
          bgcolor="#1b1c3a"
          color="#ffffff"
          p={4}
          borderRadius={3}
          boxShadow={3}
          mb={4}
        >
          {/* Nadpis a popis */}
          <Typography variant="h5" component="h4" gutterBottom color='#ffcd06'>
            <strong>CEDMO Trends – Longitudinální výzkum</strong>
          </Typography>
          <Typography paragraph>
            je unikátní longitudinální panelový výzkum realizovaný po dobu 30 měsíců. Výzkum nabízí výjimečný vhled do vývoje chování populace v oblasti konzumace různých druhů mediálních obsahů se zaměřením na jednotlivé typy informačních poruch jako jsou misinformace či dezinformace. Ty nejen oslabují důvěru veřejnosti v instituce nezbytné pro fungování pluralitní demokracie, ale také mohou zesilovat jednotlivé infodemie, jak jsme ostatně mohli pozorovat při epidemii onemocnění COVID-19.
          </Typography>

          {/* Dva sloupce uvnitř */}
          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            gap={3}
            mt={3}
          >
            {/* Sloupec 1 – CZ */}
            <Box
              flex={1}
              bgcolor="#ffffff"
              color="#000000"
              p={3}
              borderRadius={3}
              boxShadow={3}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h5"><strong>TRENDS CZ</strong></Typography>
                <img src={CZ} alt="Česká vlajka" style={{ width: 30, height: 20, objectFit: 'cover' }} />
              </Box>
              <Typography paragraph>
                CEDMO Trends ČR je unikátní longitudinální panelový výzkum realizovaný po dobu 28 měsíců od března 2023 do října 2025.
              </Typography>
              <Typography paragraph>
                Odkaz na hlavní stránku Cedmo Trends CZ s dalšími výstupy:{" "}
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
                    ZDE
                  </a>
                </strong>
              </Typography>
              <img src={LP} alt="LP" style={{ maxHeight: 80 }} />
            </Box>

            {/* Sloupec 2 – SK */}
            <Box
              flex={1}
              bgcolor="#ffffff"
              color="#000000"
              p={3}
              borderRadius={3}
              boxShadow={3}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h5"><strong>TRENDS SK</strong></Typography>
                <img src={SK} alt="Slovenská vlajka" style={{ width: 30, height: 20, objectFit: 'cover' }} />
              </Box>
              <Typography paragraph>
                CEDMO Trends SR je jedinečný panelový longitudinálny výskum, ktorý prebieha od septembra 2023 počas 24 mesiacov.
              </Typography>
              <Typography paragraph>
                Odkaz na hlavní stránku Cedmo Trends SK s dalšími výstupy:{" "}
                <strong>
                  <a
                    href="https://cedmohub.eu/sk/cedmo-trends-2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#1b1c3a',
                      textDecoration: 'none',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#ffcd06')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#1b1c3a')}
                  >
                    ZDE
                  </a>
                </strong>
              </Typography>
              <img src={Ipsos} alt="Ipsos logo" style={{ maxHeight: 60 }} />
            </Box>
          </Box>
        </Box>



<Box
  bgcolor="#ffffffff"
  borderRadius={3}
  p={4}
  mt={2}
>
  <Box
    display="flex"
    flexDirection={{ xs: 'column', md: 'row' }}
    alignItems="center"
    gap={4}
    mt={2}
  >
    {/* Mapa vlevo */}
    <Box flex={1} textAlign="center">
      <img
        src={calculator}
        alt="calculator"
        style={{ maxWidth: '100%', height: 'auto', borderRadius: 10 }}
      />
    </Box>

    {/* Text vpravo */}
    <Box flex={1}>
      <Typography variant="h4" gutterBottom textAlign="left">
        <strong>CEDMO Index</strong>
      </Typography>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        euismod, nisi vel consectetur interdum, nisl nisi aliquam nisl, eget
        aliquam nisl nisi eu nisl. Fusce nec nisl nisl. Praesent id nisl nisi.
      </Typography>
      <Typography paragraph>
        Integer in ante quis arcu fermentum cursus. Curabitur ac nunc quis
        libero malesuada fermentum. Nullam sagittis bibendum mauris, sed
        scelerisque sapien sodales ut.
      </Typography>
    </Box>
  </Box>
</Box>




        <Box
          bgcolor="#ffffffff"
          borderRadius={3}
          p={4}
          mt={2}
        >
          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            alignItems="center"
            gap={4}
            mt={2}
          >
            {/* Levý sloupec – text */}
            <Box flex={1}>
              <Typography variant="h4" gutterBottom textAlign="left">
                <strong>CEDMO Tracking</strong>
              </Typography>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                euismod, nisi vel consectetur interdum, nisl nisi aliquam nisl, eget
                aliquam nisl nisi eu nisl. Fusce nec nisl nisl. Praesent id nisl nisi.
              </Typography>
              <Typography paragraph>
                Integer in ante quis arcu fermentum cursus. Curabitur ac nunc quis
                libero malesuada fermentum. Nullam sagittis bibendum mauris, sed
                scelerisque sapien sodales ut.
              </Typography>
              <Typography paragraph>
                Integer in ante quis arcu fermentum cursus. Curabitur ac nunc quis
                libero malesuada fermentum. Nullam sagittis bibendum mauris, sed
                scelerisque sapien sodales ut. Integer in ante quis arcu fermentum cursus. Curabitur ac nunc quis
                libero malesuada fermentum. Nullam sagittis bibendum mauris, sed
                scelerisque sapien sodales ut.
              </Typography>
            </Box>

            {/* Pravý sloupec – mapa */}
            <Box flex={1} textAlign="center">
              <img
                src={mapImage}
                alt="Mapa Evropy"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: 10 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

{/* Sekce ikon v modrém boxu */}
<Box
  bgcolor="#1b1c3a"
  color="#ffffff"
  p={4}
  borderRadius={3}
  boxShadow={3}
  mt={4}
>
  <Typography
    variant="h3"
    align="center"
    gutterBottom
    sx={{ color: '#ffcd06', fontWeight: 'bold' }}
  >
    What We Do
  </Typography>

  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 4,
      mt: 3,
    }}
  >
    {[
      {
        icon: <EmojiObjectsIcon sx={{ fontSize: 40, color: "#1b1c3a" }} />,
        title: 'Our Mission',
        desc: 'Uncovering and understanding public discourse and how it evolves.',
      },
      {
        icon: <InsightsIcon sx={{ fontSize: 40, color: "#1b1c3a" }} />,
        title: 'Our Research',
        desc: 'We apply AI and linguistics to study political narratives at scale.',
      },
      {
        icon: <PeopleIcon sx={{ fontSize: 40, color: "#1b1c3a" }} />,
        title: 'Our Team',
        desc: 'We are interdisciplinary – data scientists, linguists, designers.',
      },
    ].map(({ icon, title, desc }) => (
      <Box
        key={title}
        sx={{
          flex: { xs: '1 1 100%', sm: '1 1 250px', md: '1 1 300px' },
          textAlign: 'center',
          px: 2,
        }}
      >
        {/* Ikona v kolečku */}
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            bgcolor: '#ffcd06',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            boxShadow: 2,
          }}
        >
          {icon}
        </Box>

        <Typography variant="h5" sx={{ mt: 2, color: '#ffffff' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: '#cccccc' }}>
          {desc}
        </Typography>
      </Box>
    ))}
  </Box>
</Box>

    </Box>
  );
};

export default Home;
