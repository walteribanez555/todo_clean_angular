import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../entities/todo.model';
import { TodoRepository } from '../services/TodoRepository';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private todoRepository: TodoRepository) {}

  addTodo(dto : CreateTodoDto) {
    return this.todoRepository.add(dto);
  }


  toggleTodo(dto : UpdateTodoDto) {
    return this.todoRepository.toggle(dto);
  }

  getTodos() {
    return this.todoRepository.getAll();
  }


}
