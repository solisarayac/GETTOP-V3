import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoFeed from "../../components/videoFeed/VideoFeed";
import styles from "./styles";

const VideoScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <VideoFeed />
    </SafeAreaView>
  );
};

export default VideoScreen;