import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Note } from '../models/note';

const initialNotes: Note[] = [
  { ...new Note(), id: 1, title: 'un' }, 
  { ...new Note(), id: 2, title: 'deux' }, 
  { ...new Note(), id: 3, title: 'trois' }
];

interface NoteState {
  notes: Note[];
  newNote: Note | null;
  showNew: boolean;
  editingNote: Note | null;
  editingNoteIndex: number;
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState: { 
    notes: initialNotes,
    newNote: null,
    showNew: false,
    editingNote: null,
    editingNoteIndex: -1
  },
  reducers: {
    addNote: (state: NoteState, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      state.showNew = false;
    },
    updateNote: (state: NoteState, action: PayloadAction<Note>) => {
      if (state.editingNoteIndex < 0) {
        return;
      }

      const note = action.payload;
      const index = state.notes.findIndex(n => n.id === note.id);
      state.notes[index] = note;
      state.editingNote = null;
      state.editingNoteIndex = -1;
    },    
    showNewNote: (state: NoteState) => {
      state.newNote = { ...new Note(), id: state.notes.length + 1 };
      state.showNew = true;
    },
    editNote: (state: NoteState, action: PayloadAction<Note>) => {     
      const note = action.payload; 
      state.editingNoteIndex = state.notes.findIndex(n => n.id === note.id);
      state.editingNote = { ...action.payload };

      console.log('index set to ' + state.editingNoteIndex);
    }
  }
});

export const { addNote, updateNote, showNewNote, editNote } = notesSlice.actions;

export default notesSlice.reducer;