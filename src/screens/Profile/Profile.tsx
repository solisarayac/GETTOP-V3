import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import ProfileHeader from '../../components/profileHeader/ProfileHeader';
import ProfileMenu from '../../components/profileMenu/ProfileMenu';
import EventList from '../../components/eventList/EventList';
import SavedVideos from '../../components/savedVideos/SavedVideos';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'eventos' | 'guardados'>('eventos');
  const [streak, setStreak] = useState(0);
  const incrementStreak = () => setStreak(prev => prev + 1);

  return (
    <SafeAreaView style={[styles.container,{backgroundColor: '#f3f3f3ff'}]} edges={['top']}>
      <ScrollView>
        <ProfileHeader streakBoo={true} follow={true} streak={streak}/>
        <ProfileMenu options='Guardados' activeTab={activeTab} setActiveTab={setActiveTab} />
        <View style={styles.content}>
          {activeTab === 'eventos' ? <EventList incrementStreak={incrementStreak}/> : <SavedVideos />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
