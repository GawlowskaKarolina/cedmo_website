import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import Papa from 'papaparse';

const statements = [
  'Volení zástupci naslouchají obyčejným lidem',
  'Soudní systém jedná spravedlivě',
  'Většina politiků je zkorumpovaná',
  'Ve městech je nebezpečné chodit v noci',
  'Volby nic nemění',
  'Práva na vyjádření názoru jsou chráněna',
  'Lidé mají šanci si zlepšit životní úroveň',
];

const responseLabels = [
  'Velmi dobře',
  'Docela dobře',
  'Špatně',
  'Vůbec',
  'Nevím / nedokážu posoudit',
];

type Category = 'all' | 'gender' | 'education' | 'age';

const categoryMappers = {
  gender: (val: string) => (val === '1' ? 'Muži' : 'Ženy'),
  education: (val: string) =>
    ({ '1': 'ZŠ', '2': 'SŠ bez maturity', '3': 'SŠ s maturitou', '4': 'VŠ' }[val]),
  age: (val: string) =>
  ({
    '1': '16–24',
    '2': '25–34',
    '3': '35–44',
    '4': '45–54',
    '5': '55–64',
    '6': '65+',
  }[val]),
};

const DEM02: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statementIndex, setStatementIndex] = useState(0);
  const [category, setCategory] = useState<Category>('gender');
  const [wave, setWave] = useState('26');

  // Načtení dat
  useEffect(() => {
    Papa.parse('/public/DEM02/26.csv', {
      header: true,
      download: true,
      complete: (results) => {
        setData(results.data as any[]);
        setLoading(false);
      },
    });
  }, []);

  const computeChartData = () => {
    const key = `DEM02${String.fromCharCode(65 + statementIndex)}`;

    if (category === 'all') {
      const totals: Record<string, number> = {};

      data.forEach((row) => {
        if (row.vlna !== wave) return;
        const answerIndex = parseInt(row[key]) - 1;
        if (isNaN(answerIndex) || answerIndex < 0 || answerIndex > 4) return;

        const label = responseLabels[answerIndex];
        totals[label] = (totals[label] || 0) + 1;
      });

      const sum = Object.values(totals).reduce((a, b) => a + b, 0);
      const row: Record<string, string | number> = { group: 'Celkem' };
      responseLabels.forEach((label) => {
        const count = totals[label] || 0;
        row[label] = parseFloat(((count / sum) * 100).toFixed(1));
      });

      return [row];
    }

    const mapper = categoryMappers[category];
    const grouped: Record<string, Record<string, number>> = {};

    data.forEach((row) => {
      if (row.vlna !== wave) return;
      const group = mapper(
        row[category === 'gender' ? 'SEX' : category === 'age' ? 'AGER' : 'EDUR']
      ) || 'Neznámé';

      const answerIndex = parseInt(row[key]) - 1;
      if (isNaN(answerIndex) || answerIndex < 0 || answerIndex > 4) return;

      const label = responseLabels[answerIndex];
      if (!grouped[group]) grouped[group] = {};
      grouped[group][label] = (grouped[group][label] || 0) + 1;
    });

    return Object.entries(grouped).map(([group, responses]) => {
      const sum = Object.values(responses).reduce((a, b) => a + b, 0);
      const row: Record<string, string | number> = { group };
      responseLabels.forEach((label) => {
        const count = responses[label] || 0;
        row[label] = parseFloat(((count / sum) * 100).toFixed(1));
      });
      return row;
    });
  };

  const chartData = computeChartData();

  const uniqueWaves = [...new Set(data.map((row) => row.vlna))].sort().reverse();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        overflow: 'hidden',
        bgcolor: '#ffffff',
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Box display="flex" flexWrap="wrap" gap={2}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Tvrzení</InputLabel>
          <Select
            value={statementIndex}
            label="Tvrzení"
            onChange={(e) => setStatementIndex(Number(e.target.value))}
          >
            {statements.map((s, idx) => (
              <MenuItem key={s} value={idx}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
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

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Vlna</InputLabel>
          <Select
            value={wave}
            label="Vlna"
            onChange={(e) => setWave(e.target.value)}
          >
            {uniqueWaves.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ minHeight: 400, overflow: 'visible' }}>
          <ResponsiveBar
            data={chartData}
            keys={responseLabels}
            indexBy="group"
            layout="vertical"
            margin={{ top: 10, right: 50, bottom: 70, left: 70 }}
            padding={0.3}
            colors={{ scheme: 'nivo' }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="#000"
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '% odpovědí',
              legendPosition: 'middle',
              legendOffset: 40,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            tooltip={({ id, value, indexValue }) => (
              <Box p={1} bgcolor="white" color="#333" borderRadius={1}>
                <strong>{indexValue}: {id} – {value}%</strong>
              </Box>
            )}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateY: 70,
                itemsSpacing: 0,
                itemWidth: 90,
                itemHeight: 20,
                itemTextColor: 'black',
                symbolSize: 12,
                symbolShape: 'circle',
              },
            ]}
          />
        </Box>
      )}
    </Box>
  );
};

export default DEM02;
