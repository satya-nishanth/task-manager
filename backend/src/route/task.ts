import { Router, Request, Response } from 'express';
import { ITask } from 'utils/constants';
import TaskModel from 'model/task';
import { authenticateUser, validateDataMiddleWare } from 'utils/middlewares';
import { taskCreateSchema, taskUpdateSchema } from 'utils/validations';
const router = Router();

const doesTaskBelongtoUser = async (taskId: string, userId: string) => {
  const task = await TaskModel.findOne({ _id: taskId, user: userId });
  if (!task) {
    throw new Error("task doesn't belong to that user");
  }
};

router.post(
  '/create',
  authenticateUser,
  validateDataMiddleWare(taskCreateSchema),
  async (req: Request<{}, {}, ITask>, res: Response) => {
    try {
      const taskInput = req.body;
      const task = new TaskModel({ ...taskInput, user: req.user?._id });
      await task.save();
      return res.status(201).json(task);
    } catch (err: any) {
      res.status(500).json({ error: err?.message });
    }
  }
);

router.put(
  '/update',
  authenticateUser,
  validateDataMiddleWare(taskUpdateSchema),
  async (req: Request<{}, {}, { id: string } & ITask>, res: Response) => {
    try {
      const { id } = req.body;
      await doesTaskBelongtoUser(id, req.user?._id!);
      const task = await TaskModel.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      return res.json(task);
    } catch (err: any) {
      res.status(500).json({ error: err?.message });
    }
  }
);

router.get('/', authenticateUser, async (req, res) => {
  const { page = 1, limit = 100, status } = req.query as any;
  try {
    const query = status
      ? { status, user: req.user?._id }
      : { user: req.user?._id };
    const tasks = await TaskModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const count = await TaskModel.countDocuments(query);
    res.json({
      tasks,
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
});

router.delete(
  '/:id',
  authenticateUser,
  async (req: Request<{ id: string; user: any }, {}, {}>, res: Response) => {
    try {
      await doesTaskBelongtoUser(req.params.id, req.user?._id!);
      const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'delete successful' });
    } catch (error: any) {
      res.status(500).json({ error: error?.message });
    }   
  }
);

router.get('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params as any;
  try {
    await doesTaskBelongtoUser(id, req.user?._id!);
    const task = await TaskModel.findById(id);
    return res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
});

export default router;
