import React, { useState, useRef } from 'react';
import { FlatList } from 'react-native';
import VideoItem from '../videoItems/VideoItem';
import { useVideo } from '../../context/VideoContext';

const VideoFeed: React.FC = () => {
  const { videos } = useVideo();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = { viewAreaCoveragePercentThreshold: 80 };

  return (
    <FlatList
      data={videos.filter(v => v.approved)}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <VideoItem perso={35} video={item} isActive={currentIndex === index} />
      )}
      pagingEnabled
      snapToAlignment="start"
      decelerationRate="fast"
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewConfigRef}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default VideoFeed;