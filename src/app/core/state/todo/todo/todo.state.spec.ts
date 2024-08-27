import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { TodoState, TodoStateModel } from './todo.state';
import { TodoActions } from './todo.actions';
import { TodoSelectors } from './todo.queries';
import { TodoEntity } from '../../../entities/todo.model';

describe('Todo store', () => {
  let store: Store;
  const itemExample : TodoEntity = TodoEntity.fromObject({
    id : 1,
    completed : true,
    title : 'Item',
    userId: 1
  })

  //Como comprobar que venga con los parametros correctos desde el servicio


  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([TodoState])]
    });

    store = TestBed.inject(Store);
  });

  it('should have the correct attributes in the state objects', () => {
    store.dispatch(new TodoActions.Add(itemExample.title)); // Asegúrate de tener una acción para establecer los todos
    const actual = store.selectSnapshot(TodoSelectors.getCompleteTodos); // Usa el selector correcto

    actual.forEach(todo => {
      expect(todo.id).toBeDefined();
      expect(todo.title).toBeDefined();
      expect(todo.completed).toBeDefined();
    });
  });

});
