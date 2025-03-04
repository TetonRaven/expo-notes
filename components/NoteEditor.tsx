import React from 'react';
import { Image, StyleSheet, Platform, FlatList, Text, View, Button, TextInput } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import { Note } from '@/models/note';

export class NoteProps {
    note: Note;
    onSubmit;
  }
  
export default function NoteEditor({ note, onSubmit }: NoteProps) {
    // TODO: Just do state on editable props (title, etc.)
    const [editorNote, setEditorNote] = React.useState<Note>(note);

    // const [facing, setFacing] = React.useState<CameraType>('back');
    // const [permission, requestPermission] = useCameraPermissions(); // THIS causes parent component/screen tests to blow up. Lame.

    function updateNote(text: string) {
        const updatedNote = { ...editorNote, id: editorNote.id, title: text };
        setEditorNote(updatedNote);
    }

    function submitNote() {
        onSubmit(editorNote);
    }

    return ((
        <>
        <TextInput
            style={styles.input}
            editable
            multiline
            numberOfLines={4}
            blurOnSubmit={true}
            returnKeyType="send"
            placeholder='Do it up!'
            value={editorNote.title}
            onChangeText={(text) => updateNote(text)}
            onSubmitEditing={() => submitNote()}
        />
        </>
    ));
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    input: {
      marginTop: 12,
      borderWidth: 1,
      padding: 10,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  });