export interface Todo{
  userId?: number;
  id: number;
  title: string;
  completed: boolean
}


export class TodoEntity{
  constructor(
    public id : number,
    public title : string,
    public completed : boolean,
    public userId? : number,
  ){}

  get isCompleted() {
    return !!this.completed;
  }

  public static fromObject( object : {[key : string]: any}) : TodoEntity {
    const { id, title ,completed, userId} = object;


    if(!id) throw "Id is required";
    if(!title) throw "text is required";
    if(completed == null) throw "Completed is required";


    return new TodoEntity(id,title,completed, userId);
  }

}
