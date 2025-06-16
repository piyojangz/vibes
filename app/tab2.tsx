import { useImagesStore } from '@/app/store';
import { Center } from '@/components/ui/center';
import React, { useRef } from 'react';
import { View, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, Image, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const { height } = Dimensions.get('window');

const images = useImagesStore((state) => state.images);

const ReelFeed: React.FC = () => {
  const viewableIndex = useRef(0);
  const videoRefs = useRef<Array<Video | null>>([]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / height);
    if (viewableIndex.current !== index) {
      viewableIndex.current = index;
      videoRefs.current.forEach((ref, i) => {
        if (ref) {
          if (i === index) ref.seek(0);
        }
      });
    }
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        // keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={{ height, backgroundColor: 'black' }}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

export default ReelFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#000',
  },
  contentContainer: {
    gap: 0,
  },
  image: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});