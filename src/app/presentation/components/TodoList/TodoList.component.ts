import { CommonModule } from '@angular/common';
import {  Component, inject, Signal } from '@angular/core';
import { Todo } from '../../../core/entities/todo.model';
import { TodoFacade } from '../../facade/TodoFacade';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatFormField,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
  ],
  templateUrl : './TodoList.component.html',
})
export class TodoListComponent {
  todoFacade = inject(TodoFacade);

  newItemName!: string;

  addTodo() {
    this.todoFacade.addItem(this.newItemName);
  }
}
