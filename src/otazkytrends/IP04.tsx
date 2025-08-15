import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ResponsivePie } from '@nivo/pie';

type Category = 'all' | 'gender' | 'education' | 'age';
type AnswerKey =
  | 'Velmi závažný problém'
  | 'Dosti závažný problém'
  | 'Málo závažný problém'
  | 'Vůbec to není problém'
  | 'Nevím / nedokážu posoudit';

const categoryGroups: Record<Category, string[]> = {
  all: ['Celkem'],
  gender: ['MužA', 'ŽenaB'],
  education: ['ZŠA', 'SŠ bez maturityB', 'SŠ s maturitouC', 'VŠD'],
  age: ['16-24A', '25-34B', '35-44C', '45-54D', '55-64E', '65+F'],
};

const displayLabels: Record<string, string> = {
  'Celkem': 'Celkem',
  'MužA': 'Muži',
  'ŽenaB': 'Ženy',
  'ZŠA': 'ZŠ',
  'SŠ bez maturityB': 'SŠ bez mat.',
  'SŠ s maturitouC': 'SŠ s mat.',
  'VŠD': 'VŠ',
  '16-24A': '16–24',
  '25-34B': '25–34',
  '35-44C': '35–44',
  '45-54D': '45–54',
  '55-64E': '55–64',
  '65+F': '65+',
};

const COLORS = ['#525FA6', '#1b1c3a', '#E89038', '#EDB047', '#9B9B9B'];

const answerKeys: AnswerKey[] = [
  'Velmi závažný problém',
  'Dosti závažný problém',
  'Málo závažný problém',
  'Vůbec to není problém',
  'Nevím / nedokážu posoudit',
];

const IP04: React.FC = () => {
  const [category, setCategory] = useState<Category>('all');
  const [selectedWave, setSelectedWave] = useState<string>('');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/data/IP04.json')
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
        if (jsonData.length > 0) {
          setSelectedWave(jsonData[0].Vlna);
        }
      })
      .catch((err) => console.error('Chyba načtení JSON:', err));
  }, []);

  const selectedWaveData = data.find((w) => w.Vlna === selectedWave);

  const renderPie = (groupKey: string) => {
    const groupData = answerKeys.map((key, idx) => {
      const raw = selectedWaveData?.Odpovědi?.[key]?.[groupKey];
      const num = typeof raw === 'string'
        ? parseFloat(raw.replace(',', '.').replace(/[^\d.]/g, ''))
        : raw;

      return {
        id: key,
        label: key,
        value: isNaN(num) ? 0 : num,
        color: COLORS[idx % COLORS.length],
      };
    });

    return (
      <Box key={groupKey} >
        <Typography variant="h5" fontWeight={200} mb={1} >
          {displayLabels[groupKey]}
        </Typography>
        <Box height={300}>
         <ResponsivePie
  data={groupData}
  margin={{ top: 30, right: 160, bottom: 30, left: 60 }}
  innerRadius={0.5}
  padAngle={1}
  cornerRadius={5}
  colors={{ datum: 'data.color' }}
  borderWidth={1}
  borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
  arcLabelsSkipAngle={10}
  arcLabelsTextColor={(d) => {
    const darkBlueColors = ['#525FA6', '#1b1c3a'];
    return darkBlueColors.includes(d.color) ? '#fff' : '#000';
  }}
  arcLabelsRadiusOffset={0.55}
  arcLabel={(d) => Math.round(d.value).toString() + ' %'}
  theme={{
    labels: {
      text: {
        fontSize: 14,
        fontWeight: 500,
      },
    },
  }}
  enableArcLinkLabels={false}
 
  legends={[
    {
      anchor: 'right',
      direction: 'column',
      justify: false,
      translateX: 130,
      itemWidth: 120,
      itemHeight: 20,
      itemsSpacing: 6,
      symbolSize: 12,
      symbolShape: 'circle',
      itemTextColor: '#444',
      effects: [
        {
          on: 'hover',
          style: {
            itemTextColor: '#000',
          },
        },
      ],
    },
  ]}
/>

        </Box>
      </Box>
    );
  };

  return (
    <Box bgcolor="#f9f9f9" borderRadius={1} p={2} boxShadow={2}>

      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mb={3}>
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Kategorie</InputLabel>
          <Select
            value={category}
            label="Kategorie"
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            <MenuItem value="all">Celkem</MenuItem>
            <MenuItem value="gender">Pohlaví</MenuItem>
            <MenuItem value="education">Vzdělání</MenuItem>
            <MenuItem value="age">Věk</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Vlna</InputLabel>
          <Select
            value={selectedWave}
            label="Vlna"
            onChange={(e) => setSelectedWave(e.target.value)}
          >
            {data.map((item) => (
              <MenuItem key={item.Vlna} value={item.Vlna}>
                {item.Vlna}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
        gap={3}
      >
        {selectedWaveData &&
          categoryGroups[category].map((groupKey) => renderPie(groupKey))}
      </Box>
    </Box>
  );
};
export default IP04;
