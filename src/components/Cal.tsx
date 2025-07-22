import { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  Button,
  Paper,
  MobileStepper,
} from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import detektiv from "../assets/detektiv.png";

const questions = [
  { label: 'Jak moc důvěřujete tradičním médiím?', weight: 25 },
  { label: 'Jak dobře si myslíte, že poznáte dezinformace?', weight: 30 },
  { label: 'Jak často se setkáváte s podezřelými zprávami?', weight: 20 },
  { label: 'Jak často používáte AI při konzumaci obsahu?', weight: 25 },
];

const blue = '#1b1c3a';
const gray = '#f5f5f5';
const yellow = '#ffcd06';

const getProfile = (score: number) => {
  if (score >= 80)
    return 'Jste detektiv informací. Vaše schopnost rozpoznávat dezinformace je vysoká.';
  if (score >= 60)
    return 'Jste obezřetný konzumátor. Máte slušné mediální dovednosti, ale stále je prostor pro zlepšení.';
  if (score >= 40)
    return 'Jste běžný uživatel. Můžete být snadno ovlivněn dezinformacemi.';
  return 'Jste zranitelný vůči dezinformacím. Doporučujeme ověřovat informace a zlepšit mediální gramotnost.';
};

const buttonStyles = {
  bgcolor: blue,
  color: gray,
  px: 3,
  py: 1,
  borderRadius: 2,
  fontWeight: 'bold',
  '&:hover': {
    bgcolor: yellow,
    color: blue,
  },
  '&.Mui-disabled': {
    bgcolor: '#bdbdbd',
    color: '#ffffff',
    opacity: 0.7,
  },
};


const AICalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(4)
  );
  const [score, setScore] = useState<number | null>(null);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateScore();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const calculateScore = () => {
    const total = questions.reduce(
      (acc, q, i) => acc + answers[i] * q.weight,
      0
    );
    const result = total / 7;
    setScore(parseFloat(result.toFixed(1)));
  };

  const handleSliderChange = (value: number) => {
    const updated = [...answers];
    updated[currentStep] = value;
    setAnswers(updated);
  };

  const pieData =
    score !== null
      ? [
          { id: 'score', label: 'Tvůj výsledek', value: score, color: yellow },
          { id: 'zbytek', label: 'Do 100%', value: 100 - score, color: blue },
        ]
      : [];

  return (
    <Box mt={6} display="flex" justifyContent="center">
      <Paper
        sx={{
          width: '100%',
          maxWidth: '1200px',
          p: 4,
          bgcolor: gray,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" mb={3} sx={{ color: blue }}>
          <strong>Kalkulačka: Spočítej si svůj CEDMO Index</strong>
        </Typography>

        {score === null ? (
          <>
            <Typography variant="body1" mb={2} sx={{ color: blue }}>
              {questions[currentStep].label}
            </Typography>
            <Slider
              value={answers[currentStep]}
              onChange={(_, value) => handleSliderChange(value as number)}
              step={1}
              min={1}
              max={7}
              marks
              valueLabelDisplay="auto"
              sx={{
                color: blue,
              }}
            />
            <MobileStepper
              variant="progress"
              steps={questions.length}
              position="static"
              activeStep={currentStep}
              nextButton={
                <Button onClick={handleNext} sx={buttonStyles}>
                  {currentStep === questions.length - 1
                    ? 'Vyhodnotit'
                    : 'Další'}
                </Button>
              }
              backButton={
                <Button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  sx={buttonStyles}
                >
                  Zpět
                </Button>
              }
              sx={{
                mt: 4,
                px: 2,
                bgcolor: '#e0e0e0',
                borderRadius: 2,
                '& .MuiMobileStepper-progress': {
                  bgcolor: '#d0d0d0',
                },
                '& .MuiLinearProgress-root': {
                  height: 10,
                  borderRadius: 5,
                },
                '& .MuiLinearProgress-bar': {
                  bgcolor: yellow,
                },
              }}
            />
          </>
        ) : (
          <Box display="flex" gap={4} flexWrap="wrap" alignItems="center">
            {/* Obrázek vlevo */}
            <Box
              width={400}
              height={300}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <img src={detektiv} alt="sherlock" style={{ maxHeight: 300 }} />
                
            </Box>

            {/* Graf vpravo */}
            <Box flex={1} height={300}>
              <ResponsivePie
                data={pieData}
                innerRadius={0.6}
                enableArcLabels={false}
                colors={({ data }) => data.color}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                tooltip={({ datum }) => (
                  <strong style={{ color: blue }}>
                    {datum.label}: {datum.value} %
                  </strong>
                )}
              />
            </Box>

            <Box width="100%" mt={3}>
              <Typography variant="h6" sx={{ color: blue }}>
                Tvůj CEDMO index: <strong>{score}%</strong>
              </Typography>
              <Typography mt={2} sx={{ color: blue }}>
                {getProfile(score)}
              </Typography>
              <Button
                onClick={() => {
                  setScore(null);
                  setCurrentStep(0);
                }}
                sx={buttonStyles}
              >
                Zkusit znovu
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AICalculator;
