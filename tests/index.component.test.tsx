import * as React from 'react';
import { Text } from 'react-native';
import { render, screen, userEvent, fireEvent, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import store from '../store/store'

import NoteEditor from '../components/NoteEditor';
import HomeScreen from '../app/(tabs)/index'

//jest.mock('../components/NoteEditor', () => jest.fn(props => <mock-note-editor />));

it('shows the editor', () => {
    // render(<Provider store={store}><HomeScreen /></Provider>);

    // const user = userEvent.setup();
  
    // act(() => {
    //   fireEvent.press(screen.getByText('Add Note'));
    // });

    // //user.press(screen.getByText('Add Note'));
    // fireEvent.press(screen.getByText('Add Note'));
  
    
    // const editor = screen.getByPlaceholderText('Do it up!');
    // expect(editor).toBeDefined();
  });