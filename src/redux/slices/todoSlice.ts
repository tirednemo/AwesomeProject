import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

export interface TodoState {
  id: number;
  text: string;
  hour: string;
  completed: boolean;
}

const initialState: TodoState[] = [];

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{text: string; hour: string}>) => {
      state.push({
        id: state.length + 1,
        text: action.payload.text,
        hour: action.payload.hour,
        completed: false,
      });
    },
    toggle: (state, action: PayloadAction<number>) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const {add, toggle} = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
