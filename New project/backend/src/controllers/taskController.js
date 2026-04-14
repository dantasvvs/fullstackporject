import { prisma } from "../lib/prisma.js";

export async function createTask(req, res, next) {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Titulo e obrigatorio." });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.userId,
      },
    });

    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
}

export async function listTasks(req, res, next) {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const taskId = Number(req.params.id);
    const { title, description, done } = req.body;

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: req.userId,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Tarefa nao encontrada." });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: title ?? task.title,
        description: description ?? task.description,
        done: typeof done === "boolean" ? done : task.done,
      },
    });

    return res.status(200).json(updatedTask);
  } catch (error) {
    return next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const taskId = Number(req.params.id);

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: req.userId,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Tarefa nao encontrada." });
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

