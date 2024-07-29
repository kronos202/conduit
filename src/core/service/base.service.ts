import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { IPaginationOptions } from 'src/utils/types/IPaginationOptions';

export class BaseService<CreateDto, UpdateDto> {
  constructor(
    protected databaseService: PrismaService,
    protected readonly modelName: string,
  ) {}

  findMany() {
    return this.databaseService[this.modelName].findMany();
  }

  create(data: CreateDto) {
    return this.databaseService[this.modelName].create({ data });
  }

  findById(id: number) {
    return this.databaseService[this.modelName].findUnique({ where: { id } });
  }
  async findOrFailById(id: number) {
    const result = await this.findById(id);
    if (!result) {
      throw new NotFoundException(`${this.modelName} with ID ${id} not found`);
    }
    return result;
  }

  async updateOrFailById(id: number, data: UpdateDto) {
    await this.findOrFailById(id); // This will throw if not found
    return this.databaseService[this.modelName].update({
      where: { id },
      data,
    });
  }

  async deleteOrFailById(id: number) {
    await this.findOrFailById(id); // This will throw if not found
    return this.databaseService[this.modelName].delete({ where: { id } });
  }

  async findWithPagination(iPaginationOptions: IPaginationOptions) {
    const { page, limit, search, sortField, sortOrder } = iPaginationOptions;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const orderBy = sortField
      ? { [sortField]: sortOrder || 'asc' }
      : { createdAt: 'desc' };

    const [data, total] = await Promise.all([
      this.databaseService[this.modelName].findMany({
        skip,
        take: limit,
        where,
        orderBy,
      }),
      this.databaseService[this.modelName].count({ where }),
    ]);

    const hasNextPage = skip + limit < total;

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
      hasNextPage,
    };
  }
  // TODO
  // findById => result, null
  // findOrFailById => result, 404
  // updateOrFailById => 404
  // deleteOrFailById => 404
  // findWithPagination
}
