export class UpdateTodoDto {
  constructor(
    public readonly id : number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}


    get values() {
        const returnObject : {[ key : string ] : any}  = {};

        if( this.text) returnObject['text'] = this.text;
        if( this.completedAt) returnObject['completedAt']  = this.completedAt;

        return returnObject;
    }

  public static update(props: {
    [key: string]: any;
  }): [string?, UpdateTodoDto?] {
    const { text, completedAt, id } = props;
    let newCompletedAt = completedAt;
    //   if(!text) return ['Text Property is required',undefined];

    if( !id || isNaN(Number(id))){
        return ['id must be a valid number']
    }

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toString() === "Invalid date") {
        return ["CompletedAt must be a valid date"];
      }
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  }
}
