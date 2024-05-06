import mongoose, { Model, Schema, model } from "mongoose";
import { ITask } from "utils/constants";

const taskSchema = new Schema<ITask>({
    title: { type: "String", required: true,unique: true },
    status: { type: "String",required: true, enum: ["to_do", "in_progress", "done"], default: "to_do" },
    description: { type: "String", required: false },
    user:{ type: Schema.Types.ObjectId, ref: 'User', required: true }
})

const taskModel = model("Task", taskSchema)

export default taskModel