import { store$ } from '@/store/legendState';

import { Note } from '@/models/note';

describe('LEGEND: when adding a note', () => {
    it('adds the new note', () => {
        store$.notes.set([]);        
        
        const expectedNote: Note = new Note();    
        store$.addNote(expectedNote);

        expect(store$.notes.get().length).toBe(1);
        expect(store$.notes.get()[0]).toBe(expectedNote);
        expect(store$.showNew.get()).toBe(false);
    });     
});