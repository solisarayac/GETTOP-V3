import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TextInput, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { useVideo, VideoData } from '../../context/VideoContext';
import { useAuth } from '../../context/AuthContext';
import { useFollow } from '../../context/FollowContext';
import styles from './styles';
import modalStyles from './modalStyles';
import { Palette } from '../../constants/Colors';
import Like from '../../assets/svg/likeWhite.svg';
import LikeAct from '../../assets/svg/like.svg';
import Plus from '../../assets/svg/plus.svg';
import Comment from '../../assets/svg/comment.svg';
import Favorite from '../../assets/svg/favorite.svg';
import FavoriteAct from '../../assets/svg/favoriteAct.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllUsers, User } from '../../services/userServices';

interface VideoItemProps {
  video: VideoData;
  isActive: boolean;
  perso: number;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, isActive, perso }) => {
  const { currentUserName, currentUserEmail, currentUserAvatar } = useAuth();
  const { toggleLike, addComment, toggleSaveVideo, getVideoData } = useVideo();
  const { followUser, unfollowUser, getFollowing } = useFollow();
  const { height } = Dimensions.get('window');
  const [paused, setPaused] = useState(!isActive);
  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [uploaderData, setUploaderData] = useState<User | null>(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const data = getVideoData(video.id) || video;

  useEffect(() => {
    setPaused(!isActive);
  }, [isActive]);

  useEffect(() => {
    const fetchUploader = async () => {
      try {
        const allUsers = await getAllUsers();
        const matched = allUsers.find(u => u.user === data.uploader || u.email === data.uploader);
        setUploaderData(matched || null);
      } catch (e) {
        console.log('Error obteniendo avatar del uploader:', e);
      }
    };
    fetchUploader();
  }, [data.uploader]);

  useEffect(() => {
    if (currentUserEmail && uploaderData?.email) {
      const following = getFollowing(currentUserEmail);
      setIsFollowed(following.includes(uploaderData.email));
    }
  }, [currentUserEmail, uploaderData, getFollowing]);

  const handleLike = () => {
    if (!currentUserEmail) return;
    toggleLike(video.id, currentUserEmail);
  };

  const handleAddComment = () => {
    if (!currentUserEmail || !currentUserName || newComment.trim() === '') return;
    addComment(video.id, currentUserName, currentUserEmail, newComment.trim(), currentUserAvatar || undefined);
    setNewComment('');
  };

  const handleSave = () => {
    if (!currentUserEmail) return;
    toggleSaveVideo(video.id, currentUserEmail);
  };

  const handleFollow = () => {
    if (!currentUserEmail || !uploaderData?.email) return;
    if (isFollowed) {
      unfollowUser(currentUserEmail, uploaderData.email);
      setIsFollowed(false);
    } else {
      followUser(currentUserEmail, uploaderData.email);
      setIsFollowed(true);
    }
  };

  return (
    <SafeAreaView style={[styles.videoContainer, { height: height - perso }]}>
      <Video
        source={data.source ? data.source : { uri: data.uri }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        paused={paused}
        repeat
      />
      <Pressable style={StyleSheet.absoluteFill} onPress={() => setPaused(!paused)} />

      <View style={styles.overlay}>
        <View style={styles.userContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: uploaderData?.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
              }}
              style={styles.avatar}
              resizeMode="cover"
            />
            {data.uploader !== currentUserName && (
              <TouchableOpacity
                style={[styles.followButton, isFollowed && { backgroundColor: Palette.gray }]}
                onPress={handleFollow}
              >
                {!isFollowed ? (
                  <Plus width={12} height={12} />
                ) : (
                  <Text style={{ color: Palette.white, fontSize: 10 }}>✓</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Like */}
        <TouchableOpacity onPress={handleLike} style={styles.button}>
          {currentUserEmail && data.likes.includes(currentUserEmail) ? (
            <LikeAct width={24} height={24} />
          ) : (
            <Like width={24} height={24} />
          )}
          <Text style={styles.actionText}>{data.likes.length}</Text>
        </TouchableOpacity>

        {/* Comentarios */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
          <Comment width={24} height={24} />
          <Text style={styles.actionText}>{data.comments.length}</Text>
        </TouchableOpacity>

        {/* Favorito */}
        <TouchableOpacity onPress={handleSave} style={styles.button}>
          {currentUserEmail && data.savedBy.includes(currentUserEmail) ? (
            <FavoriteAct width={24} height={24} />
          ) : (
            <Favorite width={24} height={24} />
          )}
          <Text style={styles.actionText}>{data.savedBy.length}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de comentarios */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <Pressable style={modalStyles.backdrop} onPress={() => setModalVisible(false)} />
        <View style={modalStyles.container}>
          <Text style={modalStyles.title}>Comentarios</Text>
          <FlatList
            data={data.comments}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={modalStyles.containerComment}>
                <View style={modalStyles.imgContainer}>
                  <Image
                    source={{ uri: item.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                    style={modalStyles.img}
                    resizeMode="cover"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={modalStyles.commentUser}>{item.userName}</Text>
                  <Text style={modalStyles.comment}>{item.comment}</Text>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={modalStyles.empty}>No hay comentarios aún</Text>}
          />
          <View style={modalStyles.inputContainer}>
            <TextInput
              style={modalStyles.input}
              placeholder="Escribe un comentario..."
              placeholderTextColor={Palette.darkGray}
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity onPress={handleAddComment} style={modalStyles.addButton}>
              <Text style={{ color: Palette.white }}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default VideoItem;