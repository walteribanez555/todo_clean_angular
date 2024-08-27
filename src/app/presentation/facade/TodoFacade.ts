// src/app/presentation/facade/todo.facade.ts
import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Todo } from '../../core/entities/todo.model';
import { TodoState } from '../../core/state/todo/todo/todo.state';
import { TodoActions } from '../../core/state/todo/todo/todo.actions';
import { TodoSelectors } from '../../core/state/todo/todo/todo.queries';

@Injectable({
  providedIn: 'root',
})
export class TodoFacade {
  private _store = inject(Store);

  newItemName!: string;

  todos: Signal<Todo[]>  = this._store.selectSignal(TodoSelectors.getIncompleteTodos);

  completeTodoItems: Signal<Todo[]> = this._store.selectSignal(
    TodoSelectors.getCompleteTodos,
  );

  incompleteTodoItems: Signal<Todo[]> = this._store.selectSignal(
    TodoSelectors.getIncompleteTodos,
  );

  constructor( ) {
    this._store.dispatch(new TodoActions.Get());
  }


  toggleItem(todoItem: Todo) {
    this._store.dispatch(new TodoActions.UpdateComplete(todoItem.id, todoItem));
  }

  addItem(itemName : string) {
    this._store.dispatch(new TodoActions.Add(itemName));
    this.newItemName = '';
  }
}
