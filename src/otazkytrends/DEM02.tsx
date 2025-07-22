import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
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

type Category = 'gender' | 'education' | 'age';


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
    const mapper = categoryMappers[category];

    const result: Record<string, Record<string, number>> = {};

    data.forEach((row) => {
      if (row.vlna !== '26') return;

      const group = mapper(
        row[category === 'gender' ? 'SEX' : category === 'age' ? 'AGER' : 'EDUR']
      );
      const answerIndex = parseInt(row[key]) - 1;

      if (group == null || isNaN(answerIndex) || answerIndex < 0 || answerIndex > 4) return;

      if (!result[group]) result[group] = {};
      const label = responseLabels[answerIndex];
      result[group][label] = (result[group][label] || 0) + 1;
    });

    return Object.entries(result).map(([group, responses]) => {
      const sum = Object.values(responses).reduce((a, b) => a + b, 0);
      const normalized: Record<string, string | number> = { group };

      responseLabels.forEach((label) => {
        const count = responses[label] || 0;
        normalized[label] = parseFloat(((count / sum) * 100).toFixed(1));
      });

      return normalized;
    });
  };

  const chartData = computeChartData();

  return (
    <Box p={4} display="flex" flexDirection="column" gap={4}>
      <Typography variant="h4">
        Rozdělení odpovědí – {category} – Vlna 26
      </Typography>

      <Box display="flex" gap={3} flexWrap="wrap">
        <FormControl sx={{ minWidth: 240 }}>
          <InputLabel>Tvrzení</InputLabel>
          <Select value={statementIndex} onChange={(e) => setStatementIndex(Number(e.target.value))}>
            {statements.map((s, idx) => (
              <MenuItem key={s} value={idx}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Kategorie</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
            <MenuItem value="gender">Pohlaví</MenuItem>
            <MenuItem value="education">Vzdělání</MenuItem>
            <MenuItem value="age">Věk</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box height={500}>
          <ResponsiveBar
            data={chartData}
            keys={responseLabels}
            indexBy="group"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ scheme: 'nivo' }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="#fff"
            tooltip={({ id, value, indexValue }) => (
              <Box p={1} bgcolor="white" color="#333" borderRadius={1}>
                <strong>{id}</strong>: {value}%<br />
                <small>{indexValue}</small>
              </Box>
            )}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom',
                direction: 'row',
                translateY: 50,
                itemsSpacing: 4,
                itemWidth: 150,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 18,
              },
            ]}
          />
        </Box>
      )}
    </Box>
  );
};

export default DEM02;
