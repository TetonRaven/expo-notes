import { observable } from '@legendapp/state';
import { configureSynced, synced } from "@legendapp/state/sync"
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { syncObservable } from '@legendapp/state/sync';
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import AsyncStorage from 'react-native';

// import { configureObservablePersistence } from '@legendapp/state/persist'
// import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'

// Global configuration
// configureObservablePersistence({
//     // Use AsyncStorage in React Native
//     pluginLocal: ObservablePersistAsyncStorage,
//     localOptions: {
//         asyncStorage: {
//             // The AsyncStorage plugin needs to be given the implementation of AsyncStorage
//             AsyncStorage
//         }
//     }
// })

import { Note } from '../models/note';
import { NoteState } from './noteState';

interface Store {
    notes: Note[];
    newNote: Note | null;
    showNew: boolean;
    editingNote: Note | null;
    editingNoteIndex: number;
    addNote: (note: Note) => void;
    updateNote: (note: Note) => void;
    showNewNote: () => void;
    editNote: (note: Note) => void;
}

// const mySynced = configureSynced(synced, {
//     persist: {
//         plugin: ObservablePersistLocalStorage
//     }
// });

export const store$ = observable<Store>({
    notes: [
        { ...new Note(), id: 1, title: 'Uno' }, 
        { ...new Note(), id: 2, title: 'Dos' }, 
        { ...new Note(), id: 3, title: 'Trés' }
    ],
    // notes: synced({
    //     initial: [
    //     ],
    //     persist: {
    //         name: 'notesStorage'
    //     },
    // }),
    newNote: null,
    showNew: false,
    editingNote: null,
    editingNoteIndex: -1,
    addNote: (note: Note) => {
        store$.notes.push(note);
        store$.showNew.set(false);
    },
    updateNote: (note: Note) => {
        if (store$.editingNoteIndex.get() < 0) {
          return;
        }
  
        const index = store$.notes.get().findIndex(n => n.id === note.id);
        store$.notes.get()[index] = note;
        store$.editingNote.set(null);
        store$.editingNoteIndex.set(-1);
    },    
    showNewNote: () => {
    store$.newNote.set({ ...new Note(), id: store$.notes.get().length + 1 });
    store$.showNew.set(true);
    },
    editNote: (note: Note) => {     
    store$.editingNoteIndex.set(store$.notes.get().findIndex(n => n.id === note.id));
    store$.editingNote.set({ ...note });
    }
});

// syncObservable(store$, {
//         persist: {
//             name: 'notesStorage',
//             plugin: ObservablePersistAsyncStorage
//         }
//     });