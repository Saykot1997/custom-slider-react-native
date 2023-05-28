import React, { useRef, useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Dimensions, Text } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const MyImageList = () => {
  const scrollViewRef = useRef(null);
  const totalImageLength = 3
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleScrollLeft = (currentImageIndex) => {
    if ((currentImageIndex) > 0) {
      setCurrentImageIndex(current => current - 1)
      scrollViewRef.current?.scrollTo({ x: (currentImageIndex - 1) * screenWidth, animated: true });
    }
  };

  const handleScrollRight = (currentImageIndex) => {
    if ((currentImageIndex + 1) < totalImageLength) {
      setCurrentImageIndex(current => current + 1)
      scrollViewRef.current?.scrollTo({ x: (currentImageIndex + 1) * screenWidth, animated: true });
    }
  };

  const handleScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.ceil(contentOffset / screenWidth);
    setCurrentImageIndex(currentIndex)
  }
  console.log('Current Image Index:', currentImageIndex);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      >
        <Image
          source={require('./images/image1.jpg')}
          style={{ width: screenWidth, height: '100%' }}
          resizeMode="cover"
        />
        <Image
          source={require('./images/image2.jpg')}
          style={{ width: screenWidth, height: '100%' }}
          resizeMode="cover"
        />
        <Image
          source={require('./images/image3.jpg')}
          style={{ width: screenWidth, height: '100%' }}
          resizeMode="cover"
        />
      </ScrollView>

      <TouchableOpacity className=" absolute top-1/2 left-2 bg-blue-500 px-2 py-1 rounded" onPress={() => handleScrollLeft(currentImageIndex)}>
        <Text className="text-white">Left</Text>
      </TouchableOpacity>
      <TouchableOpacity className=" absolute top-1/2 right-2 bg-blue-500 px-2 py-1 rounded" onPress={() => handleScrollRight(currentImageIndex)}>
        <Text className="text-white">Right</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyImageList;