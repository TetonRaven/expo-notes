import React from 'react';
import { StyleSheet, FlatList, Text, View, Button } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, updateNote, showNewNote, editNote } from '../../store/notesSlice';

import { ThemedText } from '@/components/ThemedText';

import { Note } from '@/models/note';
import NoteEditor, { NoteProps } from '@/components/NoteEditor';

export default function HomeScreen() {  
  const notes: Note[] = useSelector((state: any) => state.notes.notes);
  const showNew: boolean = useSelector((state: any) => state.notes.showNew);
  const newNote: Note = useSelector((state: any) => state.notes.newNote);
  const editingNote: Note = useSelector((state: any) => state.notes.editingNote);
  const editingNoteIndex: number = useSelector((state: any) => state.notes.editingNoteIndex);

  const dispatch = useDispatch();

  function handlAddNotePress()  {
    dispatch(showNewNote());
  }
  
  function saveNewNote(note: Note) {
    dispatch(addNote(note));
  }

  function handleEditNote(note: Note) {
    dispatch(editNote(note));    
  }

  function saveNote(note: Note) {
    dispatch(updateNote(note));
  }    

  // todo: add photo, redux, local persistence, api

  return (    

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ThemedText type="title">Notes</ThemedText>

        <Button title="Add Note" onPress={() => handlAddNotePress()} />

        {showNew && (<NoteEditor note={newNote} onSubmit={saveNewNote} />)}

        <FlatList 
          data={notes} 
          renderItem={({item, index}) => 
            index === editingNoteIndex
            ? <NoteEditor key={editingNoteIndex} note={editingNote} onSubmit={saveNote} />
            : <Text onPress={() => handleEditNote(item)}>{item.title}</Text>} 
        />

      </SafeAreaView>
    </SafeAreaProvider>  
    
    // <View>
    //   <ThemedText type="title">Notes</ThemedText>

    //   <Button title="Add Note" onPress={() => showNewNote()} />

    //   {showNew && (<NoteEditor note={newNote} onSubmit={saveNewNote} />)}

    //   <FlatList 
    //     data={notes} 
    //     renderItem={({item, index}) => 
    //       index === editingNoteIndex
    //       ? <NoteEditor key={editingNoteIndex} note={editingNote} onSubmit={saveNote} />
    //       : <Text onPress={() => editNote(item)}>{item.title}</Text>} 
    //   /> 
    // </View>
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
