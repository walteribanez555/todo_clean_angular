import { createPropertySelectors, createSelector } from '@ngxs/store';
import { TodoState, TodoStateModel } from './todo.state';

export class TodoSelectors {
  static getSlices = createPropertySelectors<TodoStateModel>(TodoState);

  static getCompleteTodos = createSelector(
    [TodoSelectors.getSlices.todos],
    (todos) => todos.filter((todo) => todo.completed) ,
  );

  static getIncompleteTodos = createSelector(
    [TodoSelectors.getSlices.todos],
    (todos) => todos.filter((todo) => !todo.completed) ,
  );
}
