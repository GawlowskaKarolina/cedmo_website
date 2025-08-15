import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Category = 'all' | 'gender' | 'education' | 'age';
type Answer = '1' | '2' | '3' | '4' | '5' | '6';


const categoryGroups: Record<Category, string[]> = {
  all: ['Celkem'],
  gender: ['MužA', 'ŽenaB'],
  education: ['ZŠA', 'SŠ bez maturityB', 'SŠ s maturitouC', 'VŠD'],
  age: ['16-24A', '25-34B', '35-44C', '45-54D', '55-64E', '65+F'],
};

const displayLabels: Record<string, string> = {
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
  'Celkem': 'Celkem',
};

const answerLabels: Record<Answer, string> = {
  '1': 'Určitě vítězstvím Ukrajiny',
  '2': 'Spíše vítězstvím Ukrajiny',
  '3': 'Dočasným mírem, aniž by zvítězila jedna strana',
  '4': 'Spíše vítězstvím Ruska',
  '5': 'Určitě vítězstvím Ruska',
  '6': 'Nevím/je mi to jedno',
};

const COLORS = ['#1b1c3a', '#E89038', '#009912ff', '#e23fffff', '#ff454fff', '#794937ff'];

const D01: React.FC = () => {
  const [category, setCategory] = useState<Category>('all');
  const [answer, setAnswer] = useState<Answer>('1');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/data/D01.json')
      .then(res => res.json())
      .then((jsonData) => {
        const odpovedLabel = answerLabels[answer];  // např. "Určitě vítězstvím Ukrajiny"

        const preparedData = jsonData.map((wave: any) => {
          const odpovedData = wave.Odpovědi[odpovedLabel];
          if (!odpovedData) return null;

          const entry: any = { name: wave.Vlna };

          Object.entries(odpovedData).forEach(([key, value]) => {
            // pokud je hodnota číslo, použij přímo
            if (typeof value === 'number') {
              entry[key] = value;
            } else if (typeof value === 'string') {
              // odstranění písmen za čísly a převedení čárky na tečku
              const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.');
              const num = parseFloat(cleaned);
              if (!isNaN(num)) {
                entry[key] = num;
              }
            }
          });

          return entry;
        }).filter(Boolean);

        setData(preparedData);
      })
      .catch(err => console.error('Chyba načtení JSON:', err));
  }, [answer]);


  const groups = categoryGroups[category];

  return (
    <Box
      p={1}
      display="flex"
      gap={1}
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box
        flex={1}
        bgcolor="#ffffff"
        p={2}
        borderRadius={1}
        boxShadow={3}
        height={520}
        display="flex"
        flexDirection="column"
      >

        <Box display="flex" flexDirection="column" gap={1} mb={1}>
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
            <InputLabel>Odpověď</InputLabel>
            <Select
              value={answer}
              label="Odpověď"
              onChange={(e) => setAnswer(e.target.value as Answer)}
            >
              <MenuItem value="1">1 – Určitě vítězstvím Ukrajiny</MenuItem>
              <MenuItem value="2">2 – Spíše vítězstvím Ukrajiny</MenuItem>
              <MenuItem value="3">3 – Dočasným mírem</MenuItem>
              <MenuItem value="4">4 – Spíše vítězstvím Ruska</MenuItem>
              <MenuItem value="5">5 – Určitě vítězstvím Ruska</MenuItem>
              <MenuItem value="6">6 – Nevím</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: '100%', overflowX: 'auto', flexGrow: 1 }}>
          <Box sx={{ minWidth: '900px', height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 14 }}
                  interval={0}
                  padding={{ right: 20 }}
                />
                <YAxis
                  width={30}
                  tickFormatter={(value) => `${Math.round(value)}%`}
                  tick={{ fontSize: 14 }}

                />
                <Tooltip
                  formatter={(value: number) => `${Math.round(value)} %`}
                  labelStyle={{ color: '#1b1c3a', fontWeight: 600 }}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #dcdcdc',
                    borderRadius: 12,
                    padding: 12,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14,
                    color: '#1b1c3a',
                  }}
                  cursor={{ stroke: '#1b1c3a', strokeWidth: 1, strokeDasharray: '3 3' }}
                />
               <Legend
                  wrapperStyle={{ paddingTop: 20 }}
                  iconType="circle" 
                  iconSize={12} 
                />
                {groups.map((label, idx) => (
                  <Line
                    key={label}
                    type="monotone"
                    dataKey={label}
                    stroke={COLORS[idx % COLORS.length]}
                    dot={true}
                    strokeWidth={7}
                    activeDot={{ r: 8 }}
                    name={displayLabels[label] || label}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default D01;
