import { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';

const GROUPS = [
  'Celkem',
  'MužA',
  'ŽenaB',
  '16-24A',
  '25-34B',
  '35-44C',
  '45-54D',
  '55-64E',
  '65+F',
  'ZŠA',
  'SŠ bez maturityB',
  'SŠ s maturitouC',
  'VŠD',
];

const DISPLAY_LABELS: Record<string, string> = {
  'Celkem': 'Celkem',
  'MužA': 'Muži',
  'ŽenaB': 'Ženy',
  '16-24A': '16–24',
  '25-34B': '25–34',
  '35-44C': '35–44',
  '45-54D': '45–54',
  '55-64E': '55–64',
  '65+F': '65+',
  'ZŠA': 'ZŠ',
  'SŠ bez maturityB': 'SŠ bez mat.',
  'SŠ s maturitouC': 'SŠ s mat.',
  'VŠD': 'VŠ',
};

const ANSWER_KEYS = [
  'Velmi vystaven/a',
  'Spíše vystaven/a',
  'Spíše nevystaven/a',
  'Vůbec nevystaven/a',
];

const parseValue = (raw: string | undefined): number => {
  if (!raw) return 0;
  const cleaned = raw.replace(/\s/g, '').replace(',', '.');
  const match = cleaned.match(/^-?[\d.]+/);
  if (!match) return 0;

  const value = parseFloat(match[0]);
  return isNaN(value) ? 0 : value;
};

const IP02 = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedWave, setSelectedWave] = useState<string>('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>(['Celkem']);

  useEffect(() => {
    fetch('/data/IP02.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        if (json.length > 0) setSelectedWave(json[0].Vlna);
      });
  }, []);

  const current = data.find((d) => d.Vlna === selectedWave);

  const prepareChartData = () => {
    if (!current) return [];

    return selectedGroups.map((group) => {
      const entry: any = { group: DISPLAY_LABELS[group] || group };
      for (const key of ANSWER_KEYS) {
        const val = current[key]?.[group];
        entry[key] = parseValue(val);
      }
      return entry;
    });
  };

  const handleGroupChange = (group: string) => {
    setSelectedGroups((prev) =>
      prev.includes(group)
        ? prev.filter((g) => g !== group)
        : [...prev, group]
    );
  };

  const colors = {
    'Velmi vystaven/a': '#E89038',
    'Spíše vystaven/a': '#EDB047',
    'Spíše nevystaven/a': '#525FA6',
    'Vůbec nevystaven/a': '#1b1c3a',
  };

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
        borderRadius: 1,
        color: 'black',
        boxShadow: 3,
        maxHeight: '90vh',
      }}
    >
      {/* Ovládací prvky zůstávají nahoře */}
      <Box mb={2} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} flexWrap="wrap">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Vlna</InputLabel>
          <Select
            value={selectedWave}
            label="Vlna"
            onChange={(e) => setSelectedWave(e.target.value)}
          >
            {data.map((d) => (
              <MenuItem key={d.Vlna} value={d.Vlna}>
                {d.Vlna}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormGroup
          row
          sx={{
            maxWidth: '100%',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          {GROUPS.map((group) => (
            <FormControlLabel
              key={group}
              control={
                <Checkbox
                  checked={selectedGroups.includes(group)}
                  onChange={() => handleGroupChange(group)}
                  sx={{
                    color: '#1b1c3a',
                    '&.Mui-checked': {
                      color: '#ffcd06',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(27, 28, 58, 0.04)',
                    },
                  }}
                />
              }
              label={DISPLAY_LABELS[group]}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Grafová část bez posuvníku */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 300,
          overflow: 'visible',
        }}
      >
        <ResponsiveBar
          data={prepareChartData()}
          keys={ANSWER_KEYS}
          indexBy="group"
          layout="horizontal"
          margin={{ top: 0, right: 50, bottom: 70, left: 80 }}
          padding={0.3}
          colors={({ id }) => colors[id as keyof typeof colors] ?? '#ccc'}
          label={({ value }) => (value !== null && value !== undefined ? `${Math.round(value)} %` : '')}
          borderRadius={1}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={({ data }) =>
            (data.id === 'Spíše nevystaven/a' || data.id === 'Vůbec nevystaven/a') ? 'white' : 'black'
          }
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
          tooltip={({ id, value, indexValue, color, }) => {
  const darkBlueColors = ['#525FA6', '#1b1c3a'];
  const textColor = darkBlueColors.includes(color) ? '#fff' : '#000';

            return (
              <Box
                sx={{
                  backgroundColor: color,
                  padding: '6px 12px',
                  borderRadius: 1,
                  color: textColor,
                  fontWeight: 600,
                  fontSize: 14,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {indexValue}: {id} – {value !== null && value !== undefined ? value.toFixed(1) : '–'} %
              </Box>
            );
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateY: 70,
              itemsSpacing: 8,
              itemWidth: 135,
              itemHeight: 20,
              itemTextColor: 'black',
              symbolSize: 12,
              symbolShape: 'circle',
            },
          ]}
          theme={{
            labels: {
              text: {
                fontSize: 14,
                fontWeight: 200,
              },
            },
            axis: {
              ticks: {
                text: {
                  fontSize: 13,
                  fill: '#333',
                },
              },
              legend: {
                text: {
                  fontSize: 14,
                  fontWeight: 500,
                },
              },
            },
            legends: {
              text: {
                fontSize: 13,
              },
            },
            tooltip: {
              container: {
                fontSize: 14,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default IP02;