import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Link,
    Checkbox,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

type ConsentTypes = {
    necessary: boolean; // vždy aktivní, nepřepínatelný
    analytics: boolean;
    marketing: boolean;
};

const defaultConsent: ConsentTypes = {
    necessary: true,
    analytics: true,
    marketing: true,
};

const COOKIE_STORAGE_KEY = 'cookieConsentPreferences';

const CookieConsent: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const [consent, setConsent] = useState<ConsentTypes>(defaultConsent);

    useEffect(() => {
        const savedConsent = localStorage.getItem(COOKIE_STORAGE_KEY);
        if (savedConsent) {
            setConsent(JSON.parse(savedConsent));
        } else {
            setShowBanner(true);
        }
    }, []);

    const saveConsent = (newConsent: ConsentTypes) => {
        localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(newConsent));
        setConsent(newConsent);
        setShowBanner(false);
        setOpenSettings(false);
    };

    const handleAcceptAll = () => {
        saveConsent({ necessary: true, analytics: true, marketing: true });
    };

    const handleAcceptSelected = () => {
        saveConsent(consent);
    };

    const handleCheckboxChange = (key: keyof ConsentTypes) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConsent((prev) => ({ ...prev, [key]: event.target.checked }));
    };

    if (!showBanner) return null;

    // Styl tlačítek podle požadavku
    const buttonSx = {
        bgcolor: '#1b1c3a',
        color: '#ffcd06',
        '&:hover': {
            bgcolor: '#ffcd06',
            color: '#1b1c3a',
        },
    };

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                    bgcolor: 'background.paper',
                    p: 2,
                    boxShadow: '0 -2px 8px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1300,
                    gap: 2,
                }}
            >
                <Typography variant="body2" sx={{ maxWidth: { xs: '100%', md: '70%' } }}>
                    Tento web používá cookies pro zlepšení uživatelského zážitku. Více informací najdete v{' '}
                    <Link
                        href="/cookies"
                        underline="hover"
                        color="inherit"
                        sx={{ color: '#ffcd06' }}
                        target="_blank"
                        rel="noopener"
                    >
                        Politice cookies
                    </Link>
                    .
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button variant="contained" sx={buttonSx} onClick={handleAcceptAll}>
                        Přijmout vše
                    </Button>
                    <Button variant="outlined" sx={buttonSx} onClick={() => setOpenSettings(true)}>
                        Nastavení cookies
                    </Button>
                </Box>
            </Box>

            <Dialog open={openSettings} onClose={() => setOpenSettings(false)}>
                <DialogTitle>Nastavení cookies</DialogTitle>
                <DialogContent dividers>
                    <FormControlLabel
                        control={<Checkbox checked disabled />}
                        label="Nezbytné cookies (vždy aktivní)"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={consent.analytics}
                                onChange={handleCheckboxChange('analytics')}
                            />
                        }
                        label="Analytické cookies"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={consent.marketing}
                                onChange={handleCheckboxChange('marketing')}
                            />
                        }
                        label="Marketingové cookies"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSettings(false)}>Zrušit</Button>
                    <Button variant="contained" sx={buttonSx} onClick={handleAcceptSelected}>
                        Uložit nastavení
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CookieConsent;
