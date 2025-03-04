import { addNote, updateNote, notesSlice, selectNotes } from '@/store/notesSlice';
import { Note } from '@/models/note';

describe('when adding a note', () => {
    it('adds the new note', () => {
        const state = {
            notes: [],
            newNote: null,
            showNew: false,
            editingNote: null,
            editingNoteIndex: -1
        };
        
        const expectedNote: Note = new Note();    

        const updatedState = notesSlice.reducer(state, addNote(expectedNote));

        expect(updatedState.notes.length).toBe(1);
        expect(updatedState.notes[0]).toBe(expectedNote);
        expect(updatedState.showNew).toBe(false);
    });     
});

describe('when updating a note', () => {
    it('updates the note', () => {        
        
    });     
});