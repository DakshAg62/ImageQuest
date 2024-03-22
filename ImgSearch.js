import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import GestureRecognizer from 'react-native-swipe-gestures';

const access_key = '35w6xW7KDQKhZo2CLXhjqOcf8JGalY0OewgjSeTWg0g';
const Img_per_page = 24;

const ImgSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [flatListKey, setFlatListKey] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectindex, setselectindex] = useState(null);
  const searchInputRef = useRef(null);
  const imageDimension = Dimensions.get('window').width / numColumns - 10;

  const fetchImages = async () => {
    try {
      setLoading(true);

      if (searchQuery) {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${searchQuery}&page=${page}&per_page=${Img_per_page}&client_id=${access_key}`,
        );
        const { data } = response;

        if (data.results) {
          if (page === 1) {
            setImages(data.results);
          } else {
            setImages([...images, ...data.results]);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const handleSearch = () => {
    searchInputRef.current.blur();
    setPage(1);
    setImages([]);
    fetchImages();
  };

  const loadMoreData = () => {
    if (!loading && !loadingMore) {
      setPage(page + 1);
      setLoadingMore(true);
    }
  };

  const handleImageClick = (item, index) => {
    setSelectedImage(item);
    setselectindex(index);
  };

  const nextImage = () => {
    const nextindex = selectindex + 1;
    if (nextindex < images.length) {
      setSelectedImage(images[nextindex]);
      setselectindex(nextindex);
    }
  };

  const previousImage = () => {
    const previousindex = selectindex - 1;
    if (previousindex >= 0) {
      setSelectedImage(images[previousindex]);
      setselectindex(previousindex);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const onSwipeLeft = () => {
    nextImage();
  };

  const onSwipeRight = () => {
    previousImage();
  };

  const swipeConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => handleImageClick(item, index)}>
        <Image
          key={item.id}
          source={{ uri: item.urls.small }}
          style={[styles.image, { width: imageDimension, height: imageDimension }]}
        />
      </TouchableOpacity>
    );
  };

  const handleDropdownChange = value => {
    setNumColumns(value);
    setFlatListKey(prevKey => prevKey + 1);
  };

  const rangeOptions = Array.from({ length: 15 }, (_, index) => ({
    label: `${index + 1} Column${index !== 0 ? 's' : ''}`,
    value: index + 1,
  }));

  const renderFooter = () =>
    loadingMore ? (
      <View style={styles.footerloader}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    ) : null;

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={swipeConfig}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Search Images</Text>
        <TextInput
          ref={searchInputRef}
          style={styles.searchbar}
          placeholder="Type Something"
          placeholderTextColor="black"
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <RNPickerSelect
          onValueChange={handleDropdownChange}
          items={rangeOptions}
          style={styles.dropdown}
        />
        <View style={styles.list}>
          <FlatList
            key={flatListKey}
            data={images}
            keyExtractor={(item, index) => item.id.toString() + index}
            numColumns={numColumns}
            renderItem={renderItem}
            contentContainerStyle={styles.gridContainer}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0}
            ListFooterComponent={renderFooter}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={selectedImage !== null}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage ? selectedImage.urls.full : '' }}
                style={styles.modalimage}
                resizeMode="contain"
              />
            )}
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalbutton} onPress={closeModal}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    margin: 5,
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: 'green',
  },
  searchbar: {
    color: 'black',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'green',
    width: 330,
    height: 60,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  dropdown:{
    inputAndroid: {
      color: 'black',
    },
    inputIOS: {
      color: 'black',
    },
    placeholder: {
      color: 'gray',
    },
  },
  image: {
    margin: 3,
    borderRadius: 8,
  },
  gridContainer: {
    padding: 10,
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: 200,
    alignSelf: 'center',
    color: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  modalContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  modalbutton: {
    flex: 1,
    margin: 5,
    backgroundColor: 'orange',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150,
    alignItems: 'center',
  },
  modalimage:{
    width: '80%',
    height: '80%',
  },
  footerloader: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default ImgSearch;
