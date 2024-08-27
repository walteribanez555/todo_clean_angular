// src/app/core/services/todo.repository.ts
import { Observable } from 'rxjs';
import { Todo, TodoEntity } from '../entities/todo.model';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';

export abstract class TodoRepository {
  abstract add(dto : CreateTodoDto): Observable<TodoEntity>;
  abstract toggle(dto : UpdateTodoDto): Observable<TodoEntity>;
  abstract getAll(): Observable<TodoEntity[]>;
}
