import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { styled } from '@mui/material/styles';
import { ResponsiveBar } from '@nivo/bar';

const MEDIA_TYPES = [
  { key: 'chain_emails', label: 'Řetězové e-maily', icon: <EmailIcon /> },
] as const;

type MediaKey = typeof MEDIA_TYPES[number]['key'];
type GroupByKey = 'all' | 'gender' | 'education' | 'age';

const groupOptions: Record<GroupByKey, string[]> = {
  all: ['celkem'],
  gender: ['MužA', 'ŽenaB'],
  education: ['ZŠA', 'SŠ bez maturityB', 'SŠ s maturitouC', 'VŠD'],
  age: ['16-24A', '25-34B', '35-44C', '45-54D', '55-64E', '65+F'],
};

const displayLabels: Record<string, string> = {
  celkem: 'Celkem',
  MužA: 'Muži',
  ŽenaB: 'Ženy',
  ZŠA: 'ZŠ',
  'SŠ bez maturityB': 'SŠ bez mat.',
  'SŠ s maturitouC': 'SŠ s mat.',
  VŠD: 'VŠ',
  '16-24A': '16–24',
  '25-34B': '25–34',
  '35-44C': '35–44',
  '45-54D': '45–54',
  '55-64E': '55–64',
  '65+F': '65+',
};

const usageLabels = [
  'Vícekrát za den',
  'Jednou denně',
  'Vícekrát v různé dny (2-6x týdně)',
  'Jednou týdně',
  'Ani jednou',
];

const colors = ['#525FA6', '#1b1c3a', '#E89038', '#EDB047', '#9B9B9B'];

const StyledToggleButton = styled(ToggleButton)(() => ({
  color: '#1b1c3a',
  width: 48,
  height: 48,
  '& svg': { fontSize: 32 },
  '&:hover': { borderColor: '#1b1c3a', backgroundColor: 'transparent' },
  '&.Mui-selected': { borderColor: '#1b1c3a', color: '#1b1c3a' },
  '&.Mui-selected:hover': { backgroundColor: 'transparent' },
}));

const IP03: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaKey>('chain_emails');
  const [groupBy, setGroupBy] = useState<GroupByKey>('all');
  const [selectedWave, setSelectedWave] = useState<string>('');

  useEffect(() => {
    fetch('/data/IP03.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        if (jsonData.length > 0) setSelectedWave(jsonData[0].Vlna);
      })
      .catch((err) => console.error('Chyba načtení JSON:', err));
  }, []);

  const currentWaveData = data.find((d) => d.Vlna === selectedWave);
  const mediaData = currentWaveData?.media_usage?.[selectedMedia];

  const chartData = groupOptions[groupBy].map((groupKey) => {
    const values: Record<string, string | number> = { group: displayLabels[groupKey] ?? groupKey };
    usageLabels.forEach((label) => {
      const raw = mediaData?.frekvence?.[label]?.[groupKey];
      values[label] = typeof raw === 'number' ? raw : 0;
    });
    return values;
  });

  return (
    <Box bgcolor="#f9f9f9" color="black" borderRadius={1} p={2} boxShadow={2}>
      <Typography variant="h6" gutterBottom>
        Frekvence využití – {MEDIA_TYPES.find((m) => m.key === selectedMedia)?.label}
      </Typography>

      <Box display="flex" gap={2} alignItems="center" mb={3} flexWrap="wrap">
        <ToggleButtonGroup
          value={selectedMedia}
          exclusive
          onChange={(_, newMedia) => newMedia && setSelectedMedia(newMedia)}
        >
          {MEDIA_TYPES.map((media) => (
            <StyledToggleButton key={media.key} value={media.key}>
              {media.icon}
            </StyledToggleButton>
          ))}
        </ToggleButtonGroup>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Skupina</InputLabel>
          <Select value={groupBy} label="Skupina" onChange={(e) => setGroupBy(e.target.value as GroupByKey)}>
            <MenuItem value="all">Celkem</MenuItem>
            <MenuItem value="gender">Pohlaví</MenuItem>
            <MenuItem value="education">Vzdělání</MenuItem>
            <MenuItem value="age">Věk</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Vlna</InputLabel>
          <Select value={selectedWave} label="Vlna" onChange={(e) => setSelectedWave(e.target.value)}>
            {data.map((item) => (
              <MenuItem key={item.Vlna} value={item.Vlna}>
                {item.Vlna}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box height={400}>
        {chartData.some((d) => Object.values(d).some((v) => typeof v === 'number' && v > 0)) ? (
          <ResponsiveBar
            data={chartData}
            keys={usageLabels}
            indexBy="group"
            margin={{ top: 30, right: 160, bottom: 50, left: 30 }}
            padding={0.3}
            colors={({ id }) => colors[usageLabels.indexOf(id as string)]}
            borderRadius={2}
            label={({ value }) => (value !== null && value !== undefined ? `${Math.round(value)} %` : '')}
            labelSkipWidth={16}
            labelSkipHeight={12}
            labelTextColor={({ data }) => (['Vícekrát za den', 'Jednou denně'].includes(data.id as string) ? '#fff' : '#000')}
            theme={{ labels: { text: { fontSize: '14px' } }, axis: { ticks: { text: { fontSize: '12px' } } } }}
            enableGridY
            axisBottom={{ tickRotation: -25 }}
            tooltip={({ id, value, indexValue, color }) => {
              const darkBlueColors = ['#525FA6', '#1b1c3a'];
              const textColor = darkBlueColors.includes(color) ? '#fff' : '#000';
              return (
                <Box p={2} minWidth={240} bgcolor={color} color={textColor} borderRadius={2} fontSize={14} boxShadow="0 4px 8px rgba(0,0,0,0.15)" whiteSpace="normal">
                  <strong>{indexValue}</strong>: {id} – {Math.round(value as number)} %
                </Box>
              );
            }}
            legends={[{ dataFrom: 'keys', anchor: 'right', direction: 'column', translateX: 140, itemWidth: 140, itemHeight: 10, itemsSpacing: 10, symbolSize: 12, symbolShape: 'circle' }]}
          />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="h6" color="text.secondary">
              Pro vybranou kombinaci nejsou k dispozici žádná data.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default IP03;
