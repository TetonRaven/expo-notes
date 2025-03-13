import { Note } from '../models/note';

export interface NoteState {
    notes: Note[];
    newNote: Note | null;
    showNew: boolean;
    editingNote: Note | null;
    editingNoteIndex: number;
  }