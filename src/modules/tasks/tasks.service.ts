import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import { Status } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        priority: dto.priority,
        status: dto.status,
        userId,
        categories: dto.categoryIds
          ? {
              connect: dto.categoryIds.map(id => ({ id })),
            }
          : undefined,
      },
      include: { categories: true },
    });
  }

  async findAll(userId: string, query: QueryTaskDto) {
    return this.prisma.task.findMany({
      where: {
        userId,
        status: query.status,
        priority: query.priority,
        title: query.search
          ? { contains: query.search, mode: 'insensitive' }
          : undefined,
        categories: query.categoryId
          ? { some: { id: query.categoryId } }
          : undefined,
      },
      include: { categories: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
      include: { categories: true },
    });

    if (!task) throw new NotFoundException('Task não encontrada');

    return task;
  }

  async update(userId: string, id: string, dto: UpdateTaskDto) {
    await this.findOne(userId, id);

    return this.prisma.task.update({
      where: { id },
      data: {
        ...dto,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        categories: dto.categoryIds
          ? {
              set: dto.categoryIds.map(id => ({ id })),
            }
          : undefined,
      },
      include: { categories: true },
    });
  }

  async updateStatus(userId: string, id: string, status: Status) {
    await this.findOne(userId, id);

    return this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: 'Task removida com sucesso' };
  }
}
