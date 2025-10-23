import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useVideo } from '../../context/VideoContext';
import { useAuth } from '../../context/AuthContext';
import { createThumbnail } from 'react-native-create-thumbnail';
import styles from './styles';
import { getAllUsers } from '../../services/userServices';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_MARGIN = 4;
const ITEM_SIZE = (width - ITEM_MARGIN * 4) / 3;

const SavedVideos: React.FC = () => {
  const { videos } = useVideo();
  const { currentUserEmail } = useAuth();
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [videosWithAvatar, setVideosWithAvatar] = useState<
    (typeof videos[number] & { avatar?: string })[]
  >([]);

  const navigation = useNavigation<any>();

  const savedVideos = useMemo(
    () => videos.filter((v) => v.savedBy.includes(currentUserEmail || '')),
    [videos, currentUserEmail]
  );

  // Solicita permisos en Android
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

  //Genera miniaturas solo para videos SUBIDOS por el usuario (con `uri`)
  useEffect(() => {
    const generateThumbnails = async () => {
      const newThumbs: Record<string, string> = {};

      for (const video of savedVideos) {
        // saltar si ya tiene miniatura o si ya la generamos antes
        if (thumbnails[video.id]) continue;

        try {
          if (video.uri) {
            //Solo genera para videos con `uri` (subidos por usuario)
            const result = await createThumbnail({
              url: video.uri,
              timeStamp: 1000,
            });
            newThumbs[video.id] = result.path;
          }
        } catch (error) {
          console.warn('Error generando miniatura:', error);
        }
      }

      if (Object.keys(newThumbs).length > 0) {
        setThumbnails((prev) => ({ ...prev, ...newThumbs }));
      }
    };

    if (savedVideos.length > 0) generateThumbnails();
  }, [savedVideos]);

  // Obtener avatar de cada uploader
  useEffect(() => {
    const fetchAvatars = async () => {
      const allUsers = await getAllUsers();
      const mapped = savedVideos.map((v) => {
        const uploader = allUsers.find(
          (u) => u.user === v.uploader || u.email === v.uploader
        );
        return { ...v, avatar: uploader?.avatar || '' };
      });
      setVideosWithAvatar(mapped);
    };
    fetchAvatars();
  }, [savedVideos]);

  return (
    <View style={styles.container}>
      {videosWithAvatar.length > 0 ? (
        <FlatList
          data={videosWithAvatar}
          numColumns={3}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: ITEM_MARGIN }}
          columnWrapperStyle={{ gap: ITEM_MARGIN }}
          renderItem={({ item }) => {
            const isLocal = !item.uri; //detecta si es local o subido
            const imageSource = isLocal
              ? item.thumbnail // usa la miniatura local del contexto
              : { uri: thumbnails[item.id] || 'https://via.placeholder.com/150/000000/FFFFFF/?text=Video' };

            return (
              <TouchableOpacity
                style={[
                  styles.card,
                  { width: ITEM_SIZE * 0.94, height: ITEM_SIZE * 1.3 },
                ]}
                onPress={() => navigation.navigate('FullVideo', { video: item })}
              >
                <Image
                  source={imageSource}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />

                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: 0,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={{
                      uri:
                        item.avatar ||
                        'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                    }}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: 'white',
                    }}
                  />
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    ❤️ {item.likes.length}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Text style={styles.noSaved}>No tienes videos guardados.</Text>
      )}
    </View>
  );
};

export default SavedVideos;