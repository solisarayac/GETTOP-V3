import React from 'react';
import { View, Text } from 'react-native';
import Location from '../../assets/svg/location.svg';
import Futbol from '../../assets/svg/futbol.svg';
import Baloncesto from '../../assets/svg/baloncesto.svg';
import Voleibol from '../../assets/svg/voleibol.svg';
import styles from './styles';
import FeatureButton from '../featureButton/FeatureButton';
import { Palette } from '../../constants/Colors';

interface WelcomeSectionProps {
  onSelectFilter: (filter: 'todos' | 'futbol' | 'baloncesto' | 'voleibol') => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onSelectFilter }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>¡Bienvenido a GETTOP!</Text>
      <Text style={styles.subtitle}>¿Estás listo para un nuevo entrenamiento?</Text>

      <FeatureButton
        icon={<Location width={25} height={25} />}
        title="Mapa Interactivo"
        subtitle="Encuentra canchas cerca de ti"
        color={Palette.third}
        onPress={() => onSelectFilter('todos')}
      />
      <FeatureButton
        icon={<Futbol width={25} height={25} />}
        title="Fútbol"
        subtitle="Encuentra canchas cerca de fútbol"
        color={Palette.green}
        onPress={() => onSelectFilter('futbol')}
      />
      <FeatureButton
        icon={<Baloncesto width={25} height={25} />}
        title="Baloncesto"
        subtitle="Encuentra canchas cerca de baloncesto"
        color={Palette.thirdAux}
        onPress={() => onSelectFilter('baloncesto')}
      />
      <FeatureButton
        icon={<Voleibol width={25} height={25} />}
        title="Voleibol"
        subtitle="Encuentra canchas de voleibol"
        color={Palette.blue}
        onPress={() => onSelectFilter('voleibol')}
      />
    </View>
  );
};

export default WelcomeSection;
