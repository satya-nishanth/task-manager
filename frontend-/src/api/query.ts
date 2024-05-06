import api from '.';
export interface IUser {
  _id: string;
  email: string;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: any;
}
export const fetchUser = async () => {
  const response = await api.get<{ user: IUser }>('/user');
  return response.data.user;
};

export const registerUser = async (email: string, password: string) => {
  const response = await api.post<{ user: IUser }>('/user/register', {
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post<{ user: IUser }>('/user/login', {
    email,
    password,
  });
  return response.data;
};

export const createTask = async (
  title: string,
  description: string,
  status: string
) => {
  const response = await api.post<ITask>('/task/create', {
    title,
    description,
    status,
  });
  return response.data;
};

export const updateTask = async (
  id: string,
  title: string,
  description: string,
  status: string
) => {
  const response = await api.put<ITask>('/task/update', {
    id,
    title,
    description,
    status,
  });
  return response.data;
};

export const fetchTasks = async () => {
  const response = await api.get<{ tasks: ITask[] }>('/task');
  return response.data.tasks;
};

export const logOut = async () => {
  const response = await api.get('/user/logout');
  return response.data;
};
