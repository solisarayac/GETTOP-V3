import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Platform, PermissionsAndroid } from 'react-native';
import { useVideo, VideoData } from '../../context/VideoContext';
import { createThumbnail } from 'react-native-create-thumbnail';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '../../components/profileHeader/ProfileHeader';
import ProfileMenu from '../../components/profileMenu/ProfileMenu';
import CreateEventForm from '../../components/createForm/CreateEventForm';

const AdminScreen: React.FC = () => {
  const { videos, approveVideo } = useVideo();
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const pendingVideos = videos.filter(video => video.approved === false);
  const [activeTab, setActiveTab] = useState<'eventos' | 'guardados'>('eventos');

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO ||
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
      }
    };
    requestPermission();
  }, []);

  useEffect(() => {
    const generateThumbnails = async () => {
      const newThumbs: Record<string, string> = {};

      for (const video of pendingVideos) {
        if (thumbnails[video.id]) continue;

        try {
          let videoUri = '';
          if (video.source) {
            const assetInfo = Image.resolveAssetSource(video.source);
            videoUri = assetInfo?.uri || '';
          } else if (video.uri) {
            videoUri = video.uri;
          }

          if (!videoUri) continue;

          const result = await createThumbnail({
            url: videoUri,
            timeStamp: 1000,
          });

          newThumbs[video.id] = result.path;
        } catch (error) {
          console.warn('Error generando miniatura:', error);
        }
      }

      if (Object.keys(newThumbs).length > 0) {
        setThumbnails(prev => ({ ...prev, ...newThumbs }));
      }
    };

    if (pendingVideos.length > 0) generateThumbnails();
  }, [pendingVideos]);

  const renderItem = ({ item }: { item: VideoData }) => (
    <View style={styles.adminCard}>
      <Image
        source={{
          uri: thumbnails[item.id] || 'https://via.placeholder.com/150/000000/FFFFFF/?text=Video',
        }}
        style={styles.adminThumbnail}
        resizeMode="cover"
      />
      <View style={styles.adminInfo}>
        <Text style={styles.adminText}>ID: <Text style={styles.adminBand}>{item.id}</Text></Text>
        <Text style={styles.adminText}>Usuario: <Text style={styles.adminBand}>{item.uploader}</Text></Text>
        <TouchableOpacity style={styles.approveButton} onPress={() => approveVideo(item.id)}>
          <Text style={styles.approveText}>Aprobar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.adminContainer} edges={['top']}>
      <ProfileHeader streak={0} streakBoo={false} follow={false} />
      <View style={{marginTop:25}}></View>
      <ProfileMenu options='Videos' activeTab={activeTab} setActiveTab={setActiveTab} />
      <View style={[styles.content, activeTab === 'eventos' && { justifyContent: 'center' }]}>
        {activeTab === 'eventos' ? (
          <CreateEventForm />
        ) : pendingVideos.length > 0 ? (
          <FlatList
            data={pendingVideos}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <Text style={styles.adminEmpty}>No hay videos pendientes</Text>
        )}
      </View>

    </SafeAreaView>
  );
};

export default AdminScreen;