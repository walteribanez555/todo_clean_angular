import { Todo, TodoEntity } from "../../../entities/todo.model";

export namespace TodoActions {
  export class Get {
    static readonly type = '[Todo] Get';
  }

  export class UpdateComplete {
    static readonly type = '[Todo] Update Complete';
    constructor(
      public id: number,
      public todo: Todo,
    ) {}
  }

  export class Add {
    static readonly type = '[Todo] Add';
    constructor(
      public todoName: string,
    ) {}
  }
}
