export enum STATUS{
    IN_PROGRESS = 'in_progress',
    TO_DO='to_do',
    DONE='done'
}

export const taskStatus = {
  in_progress: 'in_progress',
  to_do: 'to_do',
  done: 'done',
};

export interface ITask{
    title: string,
    description?: string
    status: keyof typeof taskStatus,
    user: IUser
}

export interface IUser{
    email: string
    password: string
}

export const JWT_SECRET = process.env.JWT_SECRET;