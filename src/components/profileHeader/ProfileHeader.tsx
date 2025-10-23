import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Modal, FlatList } from 'react-native';
import styles from './styles';
import Logout from '../../assets/svg/logout.svg';
import { useAuth } from '../../context/AuthContext';
import StreakCounter from '../streakCounter/StreakCounter';
import { useFollow } from '../../context/FollowContext';
import { getAllUsers } from '../../services/userServices';
import { Palette } from '../../constants/Colors';

interface ProfileHeaderProps {
  streak: number;
  follow: boolean;
  streakBoo: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ streak, follow, streakBoo }) => {
  const { currentUserEmail, currentUserName, currentUserAvatar, logout, updateAvatar } = useAuth();
  const { getFollowers, getFollowing, unfollowUser } = useFollow();
  const [avatarUri, setAvatarUri] = useState(
    currentUserAvatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  );
  const [followersModal, setFollowersModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [usersData, setUsersData] = useState<any[]>([]);

  useEffect(() => {
    if (currentUserAvatar) setAvatarUri(currentUserAvatar);
    getAllUsers().then(setUsersData);
  }, [currentUserAvatar]);

  const followers = getFollowers(currentUserEmail || '');
  const following = getFollowing(currentUserEmail || '');

  const handleSelectAvatar = () => {
    Alert.alert('Seleccionar foto', 'Elige una opción', [
      { text: 'Cámara', onPress: async () => await updateAvatar(true) },
      { text: 'Galería', onPress: async () => await updateAvatar(false) },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const renderUserItem = (userEmail: string, showUnfollow?: boolean) => {
    const user = usersData.find(u => u.email === userEmail);
    const avatar = user?.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    const name = user?.user || userEmail.split('@')[0];
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: avatar }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} />
          <Text style={{ color: Palette.black, fontSize: 16 }}>{name}</Text>
        </View>
        {showUnfollow && (
          <TouchableOpacity
            onPress={() => unfollowUser(currentUserEmail || '', userEmail)}
            style={{
              backgroundColor: Palette.third,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: Palette.white, fontWeight: 'bold' }}>Dejar de seguir</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.topRow} onPress={logout}>
        <Logout width={28} height={28} />
      </TouchableOpacity>

      <View style={styles.userContainer}>
        <TouchableOpacity onPress={handleSelectAvatar}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.username}>
          {currentUserName || currentUserEmail?.split('@')[0] || 'Usuario'}
        </Text>
      </View>

      {follow && (
        <>
          <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.statBox} onPress={() => setFollowersModal(true)}>
              <Text style={styles.statNumber}>{followers.length}</Text>
              <Text style={[styles.statLabel]}>Seguidores</Text>
            </TouchableOpacity>

            <View style={styles.separatorLeft} />

            <TouchableOpacity style={styles.statBox} onPress={() => setFollowingModal(true)}>
              <Text style={styles.statNumber}>{following.length}</Text>
              <Text style={styles.statLabel}>Seguidos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separatorBottom} />
        </>
      )}

      {streakBoo && <StreakCounter streak={streak} />}

      {/* MODAL Seguidores */}
      <Modal visible={followersModal} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={{
              backgroundColor: Palette.white,
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: '60%', // evita que ocupe toda la pantalla
            }}
          >
            <Text style={{ color: Palette.third, fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Seguidores</Text>
            <FlatList
              data={followers}
              keyExtractor={(item) => item}
              renderItem={({ item }) => renderUserItem(item, false)}
            />
            <TouchableOpacity onPress={() => setFollowersModal(false)} style={{ marginTop: 20 }}>
              <Text style={{ color: Palette.black, textAlign: 'center' }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL Seguidos */}
      <Modal visible={followingModal} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={{
              backgroundColor: Palette.white,
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: '60%',
            }}
          >
            <Text style={{ color: Palette.third, fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Seguidos</Text>
            <FlatList
              data={following}
              keyExtractor={(item) => item}
              renderItem={({ item }) => renderUserItem(item, true)}
            />
            <TouchableOpacity onPress={() => setFollowingModal(false)} style={{ marginTop: 20 }}>
              <Text style={{ color: Palette.black, textAlign: 'center' }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default ProfileHeader;