import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface VideoData {
  id: string;
  source?: any; // solo para videos locales (require)
  uri?: string; // para videos de usuario o remotos
  thumbnail?: any; // miniatura para videos locales (require o uri)
  uploader: string;
  approved: boolean;
  likes: string[];
  comments: {
    userName: string;
    user: string;
    comment: string;
    avatar?: string;
  }[];
  savedBy: string[];
}

interface VideoContextType {
  videos: VideoData[];
  addVideo: (uri: string, uploader: string) => void;
  toggleLike: (videoId: string, userEmail: string) => void;
  addComment: (
    videoId: string,
    userName: string,
    userEmail: string,
    comment: string,
    avatar?: string
  ) => void;
  toggleSaveVideo: (videoId: string, userEmail: string) => void;
  getVideoData: (videoId: string) => VideoData | undefined;
  approveVideo: (videoId: string) => void;
}

const generateId = (): string =>
  Date.now().toString() + Math.random().toString(36).substring(2, 9);

// Mapeo fijo de videos locales (deja estos archivos en assets/videos y assets/thumbnails)
const localVideosMap: Record<string, { source: any; thumbnail: any }> = {
  '1': {
    source: require('../assets/videos/video1.mp4'),
    thumbnail: require('../assets/thumbnails/thumb1.png'),
  },
  '2': {
    source: require('../assets/videos/video2.mp4'),
    thumbnail: require('../assets/thumbnails/thumb2.png'),
  },
  '3': {
    source: require('../assets/videos/video3.mp4'),
    thumbnail: require('../assets/thumbnails/thumb3.png'),
  },
  '4': {
    source: require('../assets/videos/video4.mp4'),
    thumbnail: require('../assets/thumbnails/thumb4.png'),
  },
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<VideoData[]>([]);

  // Cargar videos al inicio
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const stored = await AsyncStorage.getItem('@videos');
        if (stored) {
          const parsed: VideoData[] = JSON.parse(stored);
          // Reinyectar source/thumbnail para los locales
          const videosWithSource = parsed.map((v) =>
            !v.uri
              ? {
                  ...v,
                  source: localVideosMap[v.id]?.source ?? null,
                  thumbnail: localVideosMap[v.id]?.thumbnail ?? null,
                }
              : v
          );
          setVideos(videosWithSource);
        } else {
          // Inicializar con los 4 locales
          setVideos([
            {
              id: '1',
              source: localVideosMap['1'].source,
              thumbnail: localVideosMap['1'].thumbnail,
              uploader: 'Cliente',
              approved: true,
              likes: [],
              comments: [],
              savedBy: [],
            },
            {
              id: '2',
              source: localVideosMap['2'].source,
              thumbnail: localVideosMap['2'].thumbnail,
              uploader: 'Cliente',
              approved: true,
              likes: [],
              comments: [],
              savedBy: [],
            },
            {
              id: '3',
              source: localVideosMap['3'].source,
              thumbnail: localVideosMap['3'].thumbnail,
              uploader: 'Cliente',
              approved: true,
              likes: [],
              comments: [],
              savedBy: [],
            },
            {
              id: '4',
              source: localVideosMap['4'].source,
              thumbnail: localVideosMap['4'].thumbnail,
              uploader: 'Cliente',
              approved: true,
              likes: [],
              comments: [],
              savedBy: [],
            },
          ]);
        }
      } catch (error) {
        console.log('Error cargando videos:', error);
      }
    };
    loadVideos();
  }, []);

  // Guardar cambios en AsyncStorage
  useEffect(() => {
    const saveVideos = async () => {
      try {
        // No guardamos los "require", solo metadatos
        const videosToStore = videos.map((v) => ({
          id: v.id,
          uploader: v.uploader,
          approved: v.approved,
          likes: v.likes,
          comments: v.comments,
          savedBy: v.savedBy,
          uri: v.uri ?? null, // null si es local
        }));
        await AsyncStorage.setItem('@videos', JSON.stringify(videosToStore));
      } catch (error) {
        console.log('Error guardando videos:', error);
      }
    };
    if (videos.length > 0) saveVideos();
  }, [videos]);

  const addVideo = (uri: string, uploader: string) => {
    setVideos((prev) => [
      ...prev,
      {
        id: generateId(),
        uri,
        uploader,
        approved: false,
        likes: [],
        comments: [],
        savedBy: [],
      },
    ]);
  };

  const toggleLike = (videoId: string, userEmail: string) => {
    setVideos((prev) =>
      prev.map((v) => {
        if (v.id === videoId) {
          const hasLiked = v.likes.includes(userEmail);
          return {
            ...v,
            likes: hasLiked ? v.likes.filter((u) => u !== userEmail) : [...v.likes, userEmail],
          };
        }
        return v;
      })
    );
  };

  const addComment = (
    videoId: string,
    userName: string,
    userEmail: string,
    comment: string,
    avatar?: string
  ) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === videoId
          ? {
              ...v,
              comments: [...v.comments, { userName, user: userEmail, comment, avatar }],
            }
          : v
      )
    );
  };

  const toggleSaveVideo = (videoId: string, userEmail: string) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === videoId
          ? {
              ...v,
              savedBy: v.savedBy.includes(userEmail)
                ? v.savedBy.filter((u) => u !== userEmail)
                : [...v.savedBy, userEmail],
            }
          : v
      )
    );
  };

  const approveVideo = (videoId: string) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === videoId ? { ...v, approved: true } : v))
    );
  };

  const getVideoData = (videoId: string) => videos.find((v) => v.id === videoId);

  return (
    <VideoContext.Provider
      value={{
        videos,
        addVideo,
        toggleLike,
        addComment,
        toggleSaveVideo,
        getVideoData,
        approveVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) throw new Error('useVideo must be used within a VideoProvider');
  return context;
};