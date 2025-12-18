"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
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
    async findAll(userId, query) {
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
    async findOne(userId, id) {
        const task = await this.prisma.task.findFirst({
            where: { id, userId },
            include: { categories: true },
        });
        if (!task)
            throw new common_1.NotFoundException('Task não encontrada');
        return task;
    }
    async update(userId, id, dto) {
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
    async updateStatus(userId, id, status) {
        await this.findOne(userId, id);
        return this.prisma.task.update({
            where: { id },
            data: { status },
        });
    }
    async remove(userId, id) {
        await this.findOne(userId, id);
        await this.prisma.task.delete({
            where: { id },
        });
        return { message: 'Task removida com sucesso' };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map