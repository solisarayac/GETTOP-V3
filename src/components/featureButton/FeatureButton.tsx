import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

interface FeatureButtonProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color:string;
  onPress?: () => void;
}

const FeatureButton: React.FC<FeatureButtonProps> = ({ icon, title, subtitle, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <View style={[styles.iconWrapper,{backgroundColor: color}]}>{icon}</View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeatureButton;
