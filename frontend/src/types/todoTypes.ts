export type todoT = {
        id: number,
        description: string,
        isdone: boolean
        created_at?: string
}

export type ArrayTodo = {
    todos: todoT[]
}