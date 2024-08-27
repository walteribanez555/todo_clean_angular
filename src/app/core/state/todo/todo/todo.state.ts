import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { TodoActions } from './todo.actions';
import { firstValueFrom } from 'rxjs';
import {  TodoEntity } from '../../../entities/todo.model';
import { TodoService } from '../../../use-cases/todo.service';
import { CreateTodoDto } from '../../../dtos/create-todo.dto';

export interface TodoStateModel {
  todos: TodoEntity[];
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todos: [],
  },
})
@Injectable()
export class TodoState {
  private readonly _todoService = inject(TodoService);

  @Action(TodoActions.Get)
  async get(ctx: StateContext<TodoStateModel>) {
    const todoItems = await firstValueFrom(this._todoService.getTodos());
    ctx.setState({
      todos: todoItems,
    });
  }

  @Action(TodoActions.UpdateComplete)
  async updateComplete(
    ctx: StateContext<TodoStateModel>,
    { id, todo }: TodoActions.UpdateComplete,
  ) {
    const state = ctx.getState();
    const updatedTodoItems = state.todos.map((item) => {
      if (item.id === id) {
        item.completed = !todo.completed;
      }
      return item;
    });

    ctx.setState({
      todos: updatedTodoItems,
    });
  }

  @Action(TodoActions.Add)
  async add(ctx: StateContext<TodoStateModel>, { todoName }: TodoActions.Add) {
    const [error, createTodoDto] = CreateTodoDto.create({text : todoName});
    if(error) {
      console.log("Error en el todo state");
    }
    if(!createTodoDto){
      throw Error('Hubo un problema');
    }
    const newTodoItem = await firstValueFrom(

      this._todoService.addTodo(createTodoDto),
    );
    ctx.patchState({
      todos: [...ctx.getState().todos, newTodoItem],
    });
  }
}
