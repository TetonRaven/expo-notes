import React from 'react';
import { Image, StyleSheet, Platform, FlatList, Text, View, Button, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';

import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {  
  const [facing, setFacing] = React.useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  let camera: CameraView;

  const [showCamera, setShowCamera] = React.useState<boolean>(true);
  const [showPhoto, setShowPhoto] = React.useState<boolean>(false);
  const [photoUri, setPhotoUri] = React.useState<string>('');  

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    //setFacing(current => (current === 'back' ? 'front' : 'back'));
    setShowCamera(false);
  setShowPhoto(true);
  setPhotoUri('https://images.ctfassets.net/m8onsx4mm13s/3q4f3fcX4cvluunwltGX9L/18a9702a54d7eda8df728786dd4b3207/__static.gibson.com_product-images_Custom_CUSU36573_Ebony_LPC68ULEBGH1_front.jpg?w=1200&h=1200');
  }

  function doit() {
    camera.takePictureAsync({ onPictureSaved: onPictureSaved})
  }

  function onPictureSaved(picture: CameraCapturedPicture) {
    console.log('Picture saved');
    setPhotoUri(picture.uri);    
    setShowCamera(false);
    setShowPhoto(true);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        { showCamera &&
          <CameraView style={styles.camera} facing={facing} ref={(ref) => { camera = ref }}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={doit}>
                <Text style={styles.text}>Doit!</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        }

        { showPhoto && 
          <Image source={{uri: photoUri}} style={styles.photo} />
        }        
      </SafeAreaView>
    </SafeAreaProvider>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: 400,
    height: 600,
  }
});