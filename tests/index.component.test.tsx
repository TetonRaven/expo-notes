import * as React from 'react';
import { render, screen, userEvent, fireEvent, act } from '@testing-library/react-native';

import NoteEditor from '../components/NoteEditor';
import HomeScreen from '../app/(tabs)/index'

jest.mock('../components/NoteEditor', () => {});

it('shows the editor', () => {
    render(<HomeScreen />);

    // const user = userEvent.setup();
  
    // // act(() => {
    // //     fireEvent.press(screen.getByText('Add Note'));
    // //   });    

    // //user.press(screen.getByText('Add Note'));
    //fireEvent.press(screen.getByText('Add Note'));
  
    // const editor = screen.getByPlaceholderText('Do it up!');
    // expect(editor).toBeDefined();
  });