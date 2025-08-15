import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';

type Category = 'all' | 'gender' | 'education' | 'age';

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

const answerKeys = [
  'Zcela spokojen/a',
  'Spíše spokojen/a',
  'Ani spokojen/a, ani nespokojen/a',
  'Spíše nespokojen/a',
  'Zcela nespokojen/a',
];

const COLORS = ['#4caf50', '#81c784', '#e0e0e0', '#ef5350', '#b71c1c'];

const DEM01: React.FC = () => {
  const [category, setCategory] = useState<Category>('gender');
  const [selectedWave, setSelectedWave] = useState<string>('');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/data/DEM01.json')
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

  const prepareChartData = () => {
    if (!selectedWaveData) return [];

    const chartData = categoryGroups[category].map((groupKey) => {
      const groupDataObject: Record<string, any> = {
        group: displayLabels[groupKey],
      };
      answerKeys.forEach((answer) => {
        const raw = selectedWaveData.Odpovědi?.[answer]?.[groupKey];
        const num = typeof raw === 'string'
          ? parseFloat(raw.replace(',', '.').replace(/[^\d.]/g, ''))
          : raw;
        groupDataObject[answer] = isNaN(num) ? 0 : num;
      });
      return groupDataObject;
    });

    return chartData;
  };

  const chartData = prepareChartData();

  return (
    <Box bgcolor="#ffffffff" borderRadius={1} p={2} boxShadow={2}>
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mb={3}>
        <FormControl sx={{ flexGrow: 1 }}>
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
        <FormControl sx={{ flexGrow: 1 }}>
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
      <Box height={400}>
        <ResponsiveBar
          data={chartData}
          keys={answerKeys}
          indexBy="group"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={COLORS}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Kategorie',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Procento respondentů',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 20,
              itemsSpacing: 2,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
        />
      </Box>
    </Box>
  );
};
export default DEM01;