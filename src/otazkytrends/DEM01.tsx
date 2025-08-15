import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { ResponsivePie } from '@nivo/pie';

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

const COLORS = ['#1b1c3a', '#525FA6', '#9B9B9B', '#E89038', '#EDB047'];

const allGroups: string[] = [
  ...categoryGroups.all,
  ...categoryGroups.gender,
  ...categoryGroups.education,
  ...categoryGroups.age
];

const DEM01: React.FC = () => {
  const [selectedWave, setSelectedWave] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>(['Celkem']);

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

  const preparePieChartData = (groupKey: string) => {
  if (!selectedWaveData) return [];

  const pieData = answerKeys.map((answer, index) => {
    const rawValue = selectedWaveData?.[answer]?.[groupKey]; // změna tady
    const num = typeof rawValue === 'string'
      ? parseFloat(
          rawValue
            .replace(',', '.')
            .replace(/[^\d.]/g, '') // odstraní písmena A–F apod.
        )
      : rawValue;

    return {
      id: answer,
      value: isNaN(num) ? 0 : num,
      color: COLORS[index],
    };
  });

  const hasData = pieData.some(item => item.value > 0);
  return hasData ? pieData : [];
};

  const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedGroups(prev =>
      checked ? [...prev, value] : prev.filter(group => group !== value)
    );
  };
  return (
    <Box bgcolor="#ffffffff" borderRadius={1} p={2} boxShadow={2}>
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mb={1}>
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

      <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
        {allGroups.map((groupKey) => (
          <FormControlLabel
            key={groupKey}
            control={
              <Checkbox
                value={groupKey}
                checked={selectedGroups.includes(groupKey)}
                onChange={handleGroupChange}
              />
            }
            label={displayLabels[groupKey]}
          />
        ))}
      </Box>
      

      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {selectedGroups.length > 0 ? (
          selectedGroups.map((groupKey) => {
            const chartData = preparePieChartData(groupKey);
            return (
              <Box
                key={groupKey}
                flex="1 1 300px"
                minWidth={300}
                sx={{
                  height: {
                    xs: 180,
                    sm: 250,
                  },
                }}
              >
                <Typography variant="h5" align="center" mb={1}>
                  {displayLabels[groupKey]}
                </Typography>
                {chartData.length > 0 ? (
                  <ResponsivePie
                    data={chartData}
                    margin={{ top: 0, right: 10, bottom: 40, left: 10 }}
                    innerRadius={0}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    colors={{ datum: 'data.color' }}
                    borderColor={{
                      from: 'color',
                      modifiers: [['darker', 0.2]],
                    }}
                    enableArcLinkLabels={false}
                    arcLabelsSkipAngle={5}
                    arcLabelsTextColor={({ data }) =>
                      ['#525FA6', '#1b1c3a'].includes(data.color as string)
                        ? '#fff'
                        : '#000'
                    }
                    arcLabel={({ value }) =>
                      value >= 5 ? `${Math.round(value)} %` : ''
                    }
                    theme={{
                      labels: {
                        text: {
                          fontSize: 14,
                        },
                      },
                    }}
                    legends={[]}
                  />
                ) : (
                  <Typography align="center" mt={4}>
                    Data nejsou k dispozici.
                  </Typography>
                )}
              </Box>
            );
          })
        ) : (
          <Typography align="center" mt={4}>
            Vyberte alespoň jednu skupinu pro zobrazení grafu.
          </Typography>
        )}
      </Box>
      <hr />

      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mb={1}>
        {answerKeys
          .map((answer, index) => (
            <Box key={answer} display="flex" alignItems="center">
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: COLORS[index],
                  borderRadius: '50%',
                  mr: 1,
                }}
              />
              <Typography variant="body2">{answer}</Typography>
            </Box>
          ))}
      </Box>
      <hr />
    </Box>
  );
}

export default DEM01;
