import * as React from 'react';
import { Text } from 'react-native';
import { render, screen, userEvent, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import store from '../store/store'

import { Note } from '@/models/note';
import HomeScreen from '../app/(tabs)/index'
import { createNewNote } from '@/store/notesSlice';

//jest.mock('../components/NoteEditor', () => jest.fn(props => <mock-note-editor testID='editor'>Editor</mock-note-editor>));

describe('HomeScreen', () => {
  describe('when the user presses the "Add Note" button', () => {
    it('shows the editor', () => {      
      render(<Provider store={store}><HomeScreen /></Provider>);
  
      fireEvent.press(screen.getByText('Add Note'));    
      
      const editor = screen.getByPlaceholderText('Do it up!');
      expect(editor).toBeDefined();
    });

    it('adds a new note', () => {
      // const expectedNote: Note = new Note();
      // const mockCreateNote: jest.Mock = jest.fn();
      // jest.mock('@/store/notesSlice', () => ({
      //   ...jest.requireActual('@/store/notesSlice'),
      //   createNewNote: () => mockCreateNote
      // }));
      // mockCreateNote.mockReturnValue(expectedNote);
      
      render(<Provider store={store}><HomeScreen /></Provider>);
  
      fireEvent.press(screen.getByText('Add Note'));    

      const state = store.getState();
      expect(state.notes.newNote).toBeDefined();
      // expect(state.notes.newNote).toBe(expectedNote);
    });
  });

  describe('when the user submits a new note', () => {
    it('adds the note to the list', async () => {
      render(<Provider store={store}><HomeScreen /></Provider>);
  
      // This repeats test above and can cause cascading failures. Like what if placeholder text changes?
      // Could get fancy and wrap in helper functions and such (actions and all like SpecFlow) but there's overhead in that. Really, with this test approach, though, it's probably necessary.
      // fireEvent.press(screen.getByText('Add Note'));    
      // const editor = await waitFor(() => screen.getByPlaceholderText('Do it up!'));   
      const editor = steps.clickAddNote();
      
      const user = userEvent.setup();      
      await user.type(editor, 'Awsum!', { submitEditing: true }); // MUST use await here or test will fail with bizzarro misleading error about render not called      
      
      const addedNote = screen.getByText('Awsum!');
      expect(addedNote).toBeDefined();

      // Don't like the double asserts but maybe need to check both.      
      const state = store.getState();
      expect(state.notes.notes.find(n => n.title == 'Awsum!')).toBeDefined();

      // TODO: What about api calls? Probably don't want to do that here, but the RN testing seems to be geared that way. Need it somewhere, though.

      expect(false).toBe(true);
    });
  });
});

const steps = {
  clickAddNote: () => {
    fireEvent.press(screen.getByText('Add Note'));    
    return screen.getByPlaceholderText('Do it up!');
  }
};