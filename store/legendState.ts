import { observable } from '@legendapp/state';
import { Note } from '../models/note';
import { Photo } from '../models/photo';

// * Legend 3 persist
import { configureSynced, synced, configureObservableSync } from "@legendapp/state/sync"
import { syncObservable } from '@legendapp/state/sync';
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";


// * Legend 2 persist
// import { configureObservablePersistence, persistObservable } from '@legendapp/state/persist';
// import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// configureObservablePersistence({
//     pluginLocal: ObservablePersistAsyncStorage,
//     localOptions: {
//         asyncStorage: {
//             AsyncStorage
//         }
//     }
// });


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

interface PhotoStore {
    photos: Photo[];
    addPhoto: (photo: Photo) => void;
    deletePhoto: (photo: Photo) => void;
    students: string[];
}

export const store$ = observable<Store>({
    notes: [
        { ...new Note(), id: 1, title: 'Uno' }, 
        { ...new Note(), id: 2, title: 'Dos' }, 
        { ...new Note(), id: 3, title: 'Trés' }
    ],
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

export const photoStore$ = observable<PhotoStore>({
    photos: [
        { ...new Photo(), uri: 'https://images.ctfassets.net/m8onsx4mm13s/3q4f3fcX4cvluunwltGX9L/18a9702a54d7eda8df728786dd4b3207/__static.gibson.com_product-images_Custom_CUSU36573_Ebony_LPC68ULEBGH1_front.jpg?w=1200&h=1200', student: 'Jimmy' },
        { ...new Photo(), uri: 'https://images.ctfassets.net/m8onsx4mm13s/dbnBPfqcASAr3cm52e26K/b1aab65498c0e41e63e198f6d8f19bdd/LPR59PSL21895_front.png', student: 'Jimmy' },
        { ...new Photo(), uri: 'https://images.ctfassets.net/m8onsx4mm13s/55aySP0h78YNesRnd8ZESL/4b3d468f2a93da10ee93c3f477c51f77/DSVS007WCH3_front.png', student: 'Kirk' }
    ],
    addPhoto: (photo: Photo) => {
        photoStore$.photos.push(photo);
    },
    deletePhoto: (photo: Photo) => {
        const index = photoStore$.photos.get().findIndex(p => p.uri === photo.uri);
        photoStore$.photos.get().splice(index, 1);
    },
    students: [
        'Jimmy',
        'Kirk',
        'James',
        'Jimi',
        'Lizzy'
    ]
});

// * Legend 3 persist
const persistOptions = configureSynced({
    persist: {
        plugin: observablePersistAsyncStorage({
            AsyncStorage
        })
    }
});

syncObservable(store$, persistOptions({
    persist: {
        name: 'notesStorage3'
    }
}));

syncObservable(photoStore$, persistOptions({
    persist: {
        name: 'photoStorage31'
    }
}));

// * Legend 2 persist
// persistObservable(store$, {
//     local: 's2-1',
//   })