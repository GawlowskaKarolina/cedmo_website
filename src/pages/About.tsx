import React from 'react';
import { Box, Typography, Avatar, Card, CardContent } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

// Definice rozhraní (interface) pro člena týmu
interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

const mainTeam: TeamMember[] = [
  {
    name: 'Václav Moravec',
    role: 'Hlavní koordinátor',
    avatar: '/images/anna.jpg',
  },
  {
    name: 'Beáta Gavurová',
    role: 'Vedoucí výzkumu',
    avatar: '/images/tomas.jpg',
  },
];

const analyticsTeam: TeamMember[] = [
  {
    name: 'Ivan Ruta Cuker',
    role: 'Datový analytik/sociolog',
    avatar: '/images/jan.jpg',
  },
  {
    name: 'Lukáš Kutil',
    role: 'Datový analytik',
    avatar: '/images/karolina.jpg',
  },
  {
    name: 'Karolína Gawlowská',
    role: 'IT, grafická a webová specialistka',
    avatar: '/images/michal.jpg',
  },
  
];

const communicationsTeam: TeamMember[] = [
  {
    name: 'Táňa Abrahámová',
    role: 'Projektová a komunikační ředitelka',
    avatar: '/images/eliska.jpg',
  },
  {
    name: 'Veronika Šimůnková',
    role: 'Projektová manažerka',
    avatar: '/images/martin.jpg',
  },
  {
    name: 'Monika Balcová',
    role: 'Manažerka digitálních médií',
    avatar: '/images/tereza.jpg',
  },
  {
    name: 'Vojtěch Kupka',
    role: 'Komunikační specialista',
    avatar: '/images/vojtech.jpg',
  },
  {
    name: 'Llucie Šťastná',
    role: 'Mediální gramotnost',
    avatar: '/images/vojtech.jpg',
  },
];

const academicTeam: TeamMember[] = [
  {
    name: 'Vanda Boštíkova',
    role: 'Výzkum v oblasti dezinformací spojených s biomedicínou',
    avatar: '/images/eliska.jpg',
  },
  {
    name: 'Aleš Macela',
    role: 'Výzkum v oblasti dezinformací spojených se zdravotní péčí a infekčními chorobami',
    avatar: '/images/martin.jpg',
  },
  {
    name: 'Petr Gongala',
    role: 'Ověřování faktů',
    avatar: '/images/tereza.jpg',
  },
  {
    name: 'Joyce Zablit',
    role: 'Ověřování faktů',
    avatar: '/images/vojtech.jpg',
  },
  {
    name: 'Karina Stasiuk-Krajewska',
    role: 'Výzkum dopadu dezinformací na společnost',
    avatar: '/images/tereza.jpg',
  },
  {
    name: 'Mária Bieliková',
    role: 'AI ověřování faktů',
    avatar: '/images/vojtech.jpg',
  },
];

const AboutUs: React.FC = () => {
  // Přidání typů pro parametry teamMembers a title
  const renderTeamSection = (teamMembers: TeamMember[], title: string) => (
    <Box>
      <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4, mt: 4 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        {teamMembers.map((member: TeamMember) => (
          <Card
            key={member.name}
            sx={{
              width: 260,
              textAlign: 'center',
              borderRadius: 1,
              boxShadow: 3,
              bgcolor: '#ffffff',
              p: 2,
            }}
          >
            <Avatar
              src={member.avatar}
              alt={member.name}
              sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
            />
            <CardContent>
              <Typography variant="h6">{member.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {member.role}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box p={4} sx={{ maxWidth: 1200, mx: 'auto', fontFamily: 'Roboto, sans-serif' }}>
      <Box
        bgcolor="#ffffff"
        p={3}
        borderRadius={1}
        boxShadow={3}
        mb={4}
      >
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <PeopleIcon sx={{ fontSize: 30, color: '#1b1c3a' }} />
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

      {renderTeamSection(mainTeam, 'Meet the Team')}
      {renderTeamSection(analyticsTeam, 'Analytics-tech Team')}
      {renderTeamSection(communicationsTeam, 'Communications Team')}
      {renderTeamSection(academicTeam, 'Academic Team')}

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
              icon: <EmojiObjectsIcon sx={{ fontSize: 40, color: '#1b1c3a' }} />,
              title: 'Our Mission',
              desc: 'Uncovering and understanding public discourse and how it evolves.',
            },
            {
              icon: <InsightsIcon sx={{ fontSize: 40, color: '#1b1c3a' }} />,
              title: 'Our Research',
              desc: 'We apply AI and linguistics to study political narratives at scale.',
            },
            {
              icon: <PeopleIcon sx={{ fontSize: 40, color: '#1b1c3a' }} />,
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

export default AboutUs;