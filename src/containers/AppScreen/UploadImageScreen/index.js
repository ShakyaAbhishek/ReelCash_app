import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
  ImageBackground,
} from "react-native";
import Constants from "../../../constants";
import { HeaderWithTitle, FloatRoundButton } from "../../../components";
import styles from "./style";
import ImagePicker, { openCropper } from "react-native-image-crop-picker";
import Toast from "react-native-toast-message";
import { openDatabase } from "react-native-sqlite-storage";
import ImageView from "react-native-image-viewing";
import CarouselImagesView from "../../../components/CarouselImagesView";

var db = openDatabase({ name: "UserDatabase.db" });

type props = {
  navigation: Object,
};

const dummydata = [
  {
    id: 2,
    path:
      "https://www.peta.org/wp-content/uploads/2014/01/goldfish-sxc.hu_.jpg",
  },
  {
    id: 3,
    path:
      "https://www.peta.org/wp-content/uploads/2014/01/goldfish-sxc.hu_.jpg",
  },
  {
    id: 4,
    path:
      "https://www.peta.org/wp-content/uploads/2014/01/goldfish-sxc.hu_.jpg",
  },
  {
    id: 5,
    path:
      "https://www.peta.org/wp-content/uploads/2014/01/goldfish-sxc.hu_.jpg",
  },
  {
    id: 6,
    path:
      "https://www.peta.org/wp-content/uploads/2014/01/goldfish-sxc.hu_.jpg",
  },
  {
    id: 7,
    path:
      "https://www.peta.org/wp-content/uploads/2014/01/goldfish-sxc.hu_.jpg",
  },
  {
    id: 8,
    path:
      "https://www.peta.org/wp-content/uploads/2014/01/goldfish-sxc.hu_.jpg",
  },
  {
    id: 9,
    path:
      "https://www.peta.org/wp-content/uploads/2014/01/goldfish-sxc.hu_.jpg",
  },
  {
    id: 10,
    path:
      "https://www.peta.org/wp-content/uploads/2014/01/goldfish-sxc.hu_.jpg",
  },
  {
    id: 11,
    path:
      "https://www.peta.org/wp-content/uploads/2014/01/goldfish-sxc.hu_.jpg",
  },
  {
    id: 12,
    path:
      "https://www.peta.org/wp-content/uploads/2014/01/goldfish-sxc.hu_.jpg",
  },
];

const UploadImageScreen = ({ navigation }: props) => {
  const [imagesArray, setImagesArray] = useState([]);
  const [updateData, setUpdateData] = useState(0);
  const [imageId, setImageId] = useState(1);
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [imageViewIndex, setImageViewIndex] = useState(0);
  const [imageSelection, setImageSelection] = useState(false);

  useEffect(() => {
    searchTableData();
    // setImagesArray(dummydata);
  }, []);

  const searchTableData = () => {
    const data = [];
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM clicked_images where type = ?",
        ["Image"],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              const x = JSON.parse(row.imageData);
              data.push(x);
              setImageId(x.id + 1);
            }
            // console.warn('images data is this==>',JSON.stringify(data,undefined,2));
            setImagesArray(data);
            setCheckUpdate(true);
          } else {
            setCheckUpdate(false);
          }
        }
      );
    });
  };

  const backPress = () => {
    navigation.goBack();
  };
  const forwardPress = () => {
    const data = imagesArray;
    const selectedImage = [];
    data.map((i) => {
      if (i.imageSelected === true) {
        selectedImage.push(i);
      }
    });
    if (selectedImage.length >= 1 && selectedImage.length <= 2) {
      navigation.navigate("FishDetailFormScreen", {
        clickedImage: selectedImage,
      });
    } else {
      Toast.show({
        type: "info",
        text1: "Info message",
        text2: `Tap your 2 best images to select them. You can tap "Edit " if you want to edit them first`,
      });
    }
  };

  const onCameraPress = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      compressImageQuality: Platform.OS === 'android' ? 0.7 : 0.8,
      cropping: false,
      // includeBase64: true,
    }).then((image) => {
      console.log(image);
      const data = imagesArray;
      const obj = {
        ...image,
        uri: image.path,
        imageSelected: false,
        id: imageId,
      };
      data.push(obj);
      // openCropper(obj);
      setImageId(imageId + 1);
      setImagesArray(data);
      addDatainDB(obj);
      setUpdateData(updateData + 3);
      // onCameraPress();
    });
  };

  const addDatainDB = (obj) => {
    // console.warn("in the Db function", JSON.stringify(obj, undefined, 2));
    const typeData = JSON.stringify(obj);
    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO clicked_images (id, type, imageData) VALUES (?,?,?)",
        [imageId, "Image", typeData],
        (tx, results) => {
          // console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.warn("add success");
          } else {
            console.warn("Registration Failed");
          }
        }
      );
    });
  };

  const onPressCancelButton = () => {
    const data = imagesArray;
    data.map(i => {
      i.imageSelected = false;
    })
    setImagesArray(data);
    setImageSelection(false);
  }

  const selectedImages = (index) => {
    const data = imagesArray;
    // console.warn('this is the index',  data[index].imageSelected)
    data[index].imageSelected = !data[index].imageSelected;
    setImagesArray(data);
    // console.warn(data);
  };

  const onNormalImagePress = (index) => {
    // selectedImages(index);
    if (imageSelection === true) {
      onLongImagePress(index);
    }
    else {
      setUpdateData(updateData + 4);
      setImageViewIndex(index);
      setIsVisible(true);
    }
  };

  const onLongImagePress = (index) => {
    selectedImages(index);
    setImageSelection(true);
    setUpdateData(updateData + 4);

  }

  const selectedImageEdit = (item, index) => {

    ImagePicker.openCropper({
      path: item.path,
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const obj = {
        ...image,
        uri: image.path,
        imageSelected: false,
        id: imageId,
      };
      // alert(JSON.stringify(image, undefined,2));
      const data = imagesArray;
      data[index] = { ...obj };
      setImagesArray(data);
      setUpdateData(updateData + 4);
      // data.map(i=>{
      //   if(i.id === item.id){

      //   }
      // })
    });
  }

  const onPressDeleteImage = (item, index) => {
    // console.warn('dfsadf', item);

    db.transaction(function (tx) {
      tx.executeSql(
        "DELETE FROM clicked_images where id=?",
        [item.id],
        (tx, results) => {
          // console.warn('Results', results);
          if (results.rowsAffected > 0) {
            const data = [...imagesArray];
            data.splice(index, 1);
            // console.warn("dfasfsafdashfhsadiufhiadsh",data);
            setImagesArray(data);
            setUpdateData(updateData + 3);
          } else {
            console.warn("Registration Failed");
          }
        }
      );
    });
  };

  const imageRenderItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        // onPress={() => onNormalImagePress(index)}
        onPress={() => onLongImagePress(index)}
        onLongPress={() => onLongImagePress(index)}
        style={{}}
      >
        <ImageBackground
          source={{ uri: item.path }}
          imageStyle={{ height: '100%', width: '100%' }}
          style={[
            styles.smallImageBoxStyle1,
            item.imageSelected && { borderWidth: 3, borderColor: "blue" },
          ]}
        >
          {imageSelection === false && <>
            <TouchableOpacity onPress={() => selectedImageEdit(item, index)} style={{ height: 35, paddingHorizontal: 10, position: 'absolute', alignItems: 'center', justifyContent: 'center', top: 0, left: 0, backgroundColor: 'transparent' }}>
              <Text style={styles.imageEditText} >{`Edit`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressDeleteImage(item, index)}
              style={{ position: "absolute", top: 2, right: 2 }}
            >
              <Image
                style={{ tintColor: "red" }}
                source={Constants.Images.CrossWhiteIcon}
              />
            </TouchableOpacity>
          </>}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const listHeaderItems = ({ item, index }) => {
    return (
      <View>
        <View style={styles.infoBoxWrapper}>
          <View style={styles.infoTextWrapper}>
            <Text style={styles.infoTextStyle}>
              {
                "Select two pictures of your catch 1) on an acceptable measuring device (ex: bump board), and 2) a clear photograph of you holding the fish up against the background. Be sure to hold the fish showing the same side that is showing on the measuring device."
              }
            </Text>
          </View>
          <View style={styles.infoIconWrapper}>
            <Image source={Constants.Images.InfoWhiteIcon} />
          </View>
        </View>
        <CarouselImagesView images={[Constants.Images.UploadScreenImage2, Constants.Images.UploadScreenImage2]} />

        {/* <TouchableOpacity
          activeOpacity={0.8}
          // onPress={onPressImage}
          style={styles.headerImageWrapper}>
          <Image
            source={Constants.Images.UploadScreenImage2}
            style={styles.imageStyle}
          />
        </TouchableOpacity> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={"Upload Images"}
        backArrow={true}
        forwardArrow={true}
        crossIcon={true}
        backPress={backPress}
        forwardPress={forwardPress}
      />
      <SafeAreaView style={styles.container1}>
        <View style={styles.scrollWrapper}>
          <FlatList
            data={imagesArray}
            renderItem={imageRenderItems}
            numColumns={2}
            ListHeaderComponent={listHeaderItems}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ width: "100%", marginTop: 2 }}
            extraData={updateData}
          />
        </View>
        {imageSelection === false ? <FloatRoundButton onFloatButtonPress={onCameraPress} /> :
          <TouchableOpacity activeOpacity={0.8} onPress={onPressCancelButton} style={{ alignSelf: 'center', borderRadius: 20, height: 50, width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
            <Text style={styles.canceltextStyle}>Cancel</Text>
          </TouchableOpacity>}
        <ImageView
          images={imagesArray}
          imageIndex={imageViewIndex}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </SafeAreaView>
    </View>
  );
};

export default UploadImageScreen;
