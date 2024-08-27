import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { Todo, TodoEntity } from '../../core/entities/todo.model';
import { TodoRepository } from '../../core/services/TodoRepository';
import { CreateTodoDto } from '../../core/dtos/create-todo.dto';
import { UpdateTodoDto } from '../../core/dtos/update-todo.dto';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService implements TodoRepository {

  private readonly _url = 'https://jsonplaceholder.typicode.com/todos';
  private _http = inject(HttpClient);

  constructor() { }


   add(dto : CreateTodoDto): Observable<TodoEntity> {
    return this._http.post<Todo>(this._url, {
      title: dto.text,
      completed: false,
    }).pipe(
      map( resp => TodoEntity.fromObject(resp) )
    )
  }
  toggle(dto : UpdateTodoDto): Observable<TodoEntity> {
    return this._http.put<Todo>(`${this._url}/${dto.id}`, {
      ...dto,
    }).pipe(
      map(
        resp => TodoEntity.fromObject(resp)
      )
    )
  }
  getAll(): Observable<TodoEntity[]> {
    return this._http.get<Todo[]>(this._url).pipe(
      switchMap( resp => {
        const items =  resp.map( item => TodoEntity.fromObject(item))
        console.log(items);
        return of(items);
      })
    )
  }


  // get() : Observable<Todo[]> {
  //   return this._http.get<Todo[]>(this._url);
  // }

  // create(todoName : string): Observable<Todo> {
  //   return this._http.post<Todo>(this._url, {
  //     title: todoName,
  //     completed: false,

  //   });
  // }

  // updateCompleted(id : number, todo: Todo) : Observable<Todo>{
  //   return this._http.put<Todo>(`${this._url}/${id}`, {
  //     ...todo
  //   });
  // }

}
