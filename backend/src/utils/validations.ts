
import {z} from 'zod'
import { taskStatus } from "utils/constants"
import { title } from "process";

const statusEnumValidation = z.enum<string,any>(Object.keys(taskStatus)).optional()
export const taskCreateSchema = z.object({
  title: z.string().min(3, { message: 'title required' }),
  description: z.string().optional(),
  status: statusEnumValidation,
});

export const taskUpdateSchema = z.object({
    id: z.string(),
    title: z.string().min(3).optional(),
    status: statusEnumValidation,
    description: z.string().optional()
})