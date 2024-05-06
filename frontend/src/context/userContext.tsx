import React, { FC, useEffect, useState } from "react";
import { ITask, IUser, fetchTasks, fetchUser } from "../api/query";

interface IUserContext{
    user?: IUser | null
    setUser?: any
    tasks: ITask[]
    setTasks?: any
}

export const UserContext = React.createContext<IUserContext>({ user: null, tasks: [] })

export const UserProvider: FC<any> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [tasks, setTasks] = useState<ITask[]>([]);

    const getUser = async () => {
        const user = await fetchUser()
        if (user) {
           setUser(user) 
        }
    }

    const getTasks = async () => {
        const tasks = await fetchTasks();
        setTasks(tasks)
    }

    useEffect(() => {
        getUser()
    }, [])
    
    useEffect(() => {
        if (user) {
            getTasks()
        }
    },[user])

    return (
        <UserContext.Provider value={{user,setUser,tasks,setTasks}}>
            {children}
        </UserContext.Provider>
    )
}