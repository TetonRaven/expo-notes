import React from 'react';
import { Image, StyleSheet, Platform, FlatList, Text, View, Button, TextInput } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import { ThemedText } from '@/components/ThemedText';

export class Note {
  id: number;
  title: string;
  collectionId: number;
  content: string;
  dateCreated: Date;
  dateModified: Date;  
}

export class NoteProps {
  note: Note;
  onSubmit;
}

export function NoteEditor({ note, onSubmit }: NoteProps) {
  // can I use this?
  const [editorNote, setEditorNote] = React.useState<Note>(note);

  const [facing, setFacing] = React.useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  
  function updateNote(text: string) {
    const updatedNote = { ...editorNote, title: text };
    setEditorNote(updatedNote);
  }

  function submitNote() {
    onSubmit(editorNote);
  }

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
    setFacing(current => (current === 'back' ? 'front' : 'back'));
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

export default function HomeScreen() {  
  const [notes, setNotes] = React.useState<Note[]>([ { ...new Note(), title: 'Uno' }, { ...new Note(), title: 'Dos' }, { ...new Note(), title: 'Tres' }]);  

  const [editingNote, setEditingNote] = React.useState<Note>(new Note());
  const [editingNoteIndex, setEditingNoteIndex] = React.useState<number>(-1);

  const [newNote, setNewNote] = React.useState<Note>(new Note());
  const [showNew, setShowNew] = React.useState(false);

  function showNewNote() {    
    setNewNote(new Note());
    setShowNew(true);    
  }
  
  function saveNewNote(note: Note) {
    setShowNew(false);

    const modifiedNotes = notes.slice();
    modifiedNotes.push(note);
    setNotes(modifiedNotes);
  }

  function editNote(note: Note) {
    setEditingNoteIndex(notes.indexOf(note));
    setEditingNote({ ...note });
  }

  function saveNote(note: Note) {
    if (editingNoteIndex < 0) {
      return;
    }

    const modifiedNotes = notes.slice();
    modifiedNotes[editingNoteIndex] = note;
    setNotes(modifiedNotes);    
    setEditingNoteIndex(-1);
  }    

  // todo: add photo, redux, local persistence, api

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ThemedText type="title">Notes</ThemedText>

        <Button title="Add Note" onPress={() => showNewNote()} />

        {showNew && (<NoteEditor note={newNote} onSubmit={saveNewNote} />)}

        <FlatList 
          data={notes} 
          renderItem={({item, index}) => 
            index === editingNoteIndex
            ? <NoteEditor key={editingNoteIndex} note={editingNote} onSubmit={saveNote} />
            : <Text onPress={() => editNote(item)}>{item.title}</Text>} 
        />  

        
            
            {/* <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
              <ThemedText>
                When you're ready, run{' '}
                <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
                <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
                <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
                <ThemedText type="defaultSemiBold">app-example</ThemedText>.
              </ThemedText>
            </ThemedView> */}
          </SafeAreaView>
    </SafeAreaProvider>    
  );
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
