import React from 'react';
import { Image, StyleSheet, Platform, FlatList, Text, View, Button, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

import { ThemedText } from '@/components/ThemedText';

import { AES, enc } from 'crypto-ts';
// Encrypt
var ciphertext = AES.encrypt('my message', 'secret key 123'); 
// Decrypt
var bytes  = AES.decrypt(ciphertext.toString(), 'secret key 123');
var plaintext = bytes.toString(enc.Utf8); 
console.log(plaintext);

export default function HomeScreen() {  
  const [facing, setFacing] = React.useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  let camera: CameraView;

  const [showCamera, setShowCamera] = React.useState<boolean>(false);
  const [showPhoto, setShowPhoto] = React.useState<boolean>(true);
  const [photoUri, setPhotoUri] = React.useState<string>(FileSystem.documentDirectory + 'saved_picture.jpg');  

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

  // // Use useEffect to call loadPhotos once on component mount
  // React.useEffect(() => {
  //   loadPhotos();
  // }, []); // Empty dependency array ensures this runs only once

  async function loadPhotos() {
    // THIS WORKS BUT IS VERY SLOW!
    const fileUri = FileSystem.documentDirectory + 'saved_picture.jpg';
    const b64uri = AES.decrypt(await FileSystem.readAsStringAsync(fileUri), 'secret key 123').toString(enc.Utf8);
    setPhotoUri(b64uri);
  }

  function toggleCameraFacing() {
    //setFacing(current => (current === 'back' ? 'front' : 'back'));
    setShowCamera(false);
    setShowPhoto(true);
    setPhotoUri('https://images.ctfassets.net/m8onsx4mm13s/3q4f3fcX4cvluunwltGX9L/18a9702a54d7eda8df728786dd4b3207/__static.gibson.com_product-images_Custom_CUSU36573_Ebony_LPC68ULEBGH1_front.jpg?w=1200&h=1200');
  }

  function showIt() {
    setShowPhoto(false);
    setShowCamera(true);
  }

  function doit() {
    //camera.takePictureAsync({ onPictureSaved: savePicture})
    camera.takePictureAsync({ onPictureSaved: savePicture, base64: true})
  }

  async function savePicture(picture: CameraCapturedPicture) {
    const fileUri = FileSystem.documentDirectory + 'saved_picture.jpg';
    await FileSystem.copyAsync({
      from: picture.uri,
      to: fileUri,
    });
    setPhotoUri(fileUri);
        
    // THIS WORKS BUT IS VERY SLOW!
    // const b64uri = 'data:image/jpeg;base64,' + picture.base64;
    // setPhotoUri(b64uri);
    // var ecnrypted = AES.encrypt(b64uri, 'secret key 123');
    // await FileSystem.writeAsStringAsync(fileUri, ecnrypted.toString());
    
    setShowCamera(false);
    setShowPhoto(true);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        { showCamera &&
          <CameraView style={styles.camera} facing={facing} ref={(ref) => { camera = ref }}>
            
          </CameraView>
        }

        { showPhoto && 
          <Image source={{uri: photoUri}} style={styles.photo} />
        }        

        <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip</Text>
            </TouchableOpacity>               */}
            
            { showPhoto && 
              <TouchableOpacity style={styles.button} onPress={showIt}>
                <Text style={styles.text}>Show It!</Text>
              </TouchableOpacity>
            }            

            { showCamera &&
              <TouchableOpacity style={styles.button} onPress={doit}>
                <Text style={styles.text}>Doit!</Text>
              </TouchableOpacity>
            }

            <TouchableOpacity style={styles.button} onPress={loadPhotos}>
                <Text style={styles.text}>Load It!</Text>
              </TouchableOpacity>
          </View>                

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