import React from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter'; // jako Bluesky
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1b1c3a',
        color: '#e5e5e5',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Žlutá lišta na vrchu footeru */}
      <Box sx={{ bgcolor: '#ffcd06', height: '8px' }} />

      {/* Hlavní kontejner pro omezení šířky a centrování */}
      <Box
        sx={{
          py: 2.5,
          px: 2,
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* Sociální ikony vystředěné absolutně (jen na sm a víc) */}
        <Box
          sx={{
            position: { xs: 'static', sm: 'absolute' },
            top: { sm: '50%' },
            left: { sm: '50%' },
            transform: { sm: 'translate(-50%, -50%)' },
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mb: { xs: 2, sm: 0 },
            zIndex: 1,
          }}
        >
          {[
            {
              href: 'https://www.facebook.com',
              icon: <FacebookIcon />,
              label: 'Facebook',
            },
            {
              href: 'https://www.instagram.com',
              icon: <InstagramIcon />,
              label: 'Instagram',
            },
            {
              href: 'https://blueskyweb.xyz',
              icon: <TwitterIcon />,
              label: 'Bluesky',
            },
            {
              href: 'https://www.linkedin.com',
              icon: <LinkedInIcon />,
              label: 'LinkedIn',
            },
          ].map(({ href, icon, label }) => (
            <IconButton
              key={label}
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              sx={{
                color: '#e5e5e5',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#ffcd06',
                },
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Box>

        {/* Obsah kolem – stacked responsivně */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{
            position: 'relative',
          }}
        >
          {/* Levá část */}
          <Typography variant="body2" textAlign={{ xs: 'center', sm: 'left' }}>
            &copy; Cedmo MFF 2025
          </Typography>

          {/* Pravá část – odkazy */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
            flexWrap="wrap"
          >
            {[
              { label: 'Privacy', path: '/privacy' },
              { label: 'Terms', path: '/terms' },
              { label: 'Cookies', path: '/cookies' },
            ].map(({ label, path }) => (
              <Link
                key={label}
                component={RouterLink}
                to={path}
                underline="hover"
                sx={{
                  color: '#e5e5e5',
                  '&:hover': { color: '#ffcd06' },
                }}
              >
                {label}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;