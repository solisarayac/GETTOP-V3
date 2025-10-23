import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Monkey from '../../assets/svg/monkey1.svg'
import MonkeyB from '../../assets/svg/monkey2.svg'
import MonkeyC from '../../assets/svg/monkey3.svg'

interface StreakCounterProps {
  streak: number;
}

const StreakCounter: React.FC<{ streak: number }> = ({ streak }) => {
  let MonkeyIcon = null;

  if (streak >= 7) {
    MonkeyIcon = <MonkeyC height={30} width={30} />;
  } else if (streak >= 4) {
    MonkeyIcon = <Monkey height={30} width={30} />;
  } else if (streak >= 1) {
    MonkeyIcon = <MonkeyB height={30} width={30} />;
  }

  return (
    <View style={styles.container}>
      {MonkeyIcon}
      {streak >= 0 && (
        <Text style={styles.text}>
          Racha de <Text style={styles.marcador}>{streak}</Text> días
        </Text>
      )}
    </View>
  );
};

export default StreakCounter;