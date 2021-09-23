import { useEffect, useState } from 'react';
// const { addToast } = useToasts();
// import useTimer from '../../../Hooks/useDelayTimer';
// useEffect(() => {
//   if (isTimerCompleted) {
//     addToast('Saved Successfully', { appearance: 'success' });
//   }
// }, [isTimerCompleted]);
// const [setTimerConfig, isTimerCompleted] = useTimer();
// import { useToasts } from 'react-toast-notifications';
const useDelayTimer = () => {
  const [isCounterRunOver, setIsCounterRunOver] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (!timer) return;

    setTimeout(() => {
      console.log('END');
      setIsCounterRunOver(true);
    }, timer);
  }, [timer]);

  const getTimerConfigs = config => {
    const { timer } = config;

    setTimer(timer);
  };
  return [getTimerConfigs, isCounterRunOver];
};

export default useDelayTimer;
