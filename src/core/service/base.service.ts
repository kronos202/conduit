import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

type OrderBy<T> = { [P in keyof T]?: 'asc' | 'desc' };

export class BaseService<
  CreateDto,
  UpdateDto,
  WhereInput = any,
  SelectInput = any,
  IncludeInput = any,
> {
  constructor(
    protected databaseService: PrismaService,
    protected modelName: Prisma.ModelName,
  ) {}

  findMany() {
    return this.databaseService[this.modelName].findMany();
  }

  create(data: CreateDto) {
    return this.databaseService[this.modelName].create({ data });
  }

  findById(id: number, include?: IncludeInput) {
    return this.databaseService[this.modelName].findUnique({
      where: { id },
      include,
    });
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

  async findWithPagination(params: {
    where?: WhereInput;
    select?: SelectInput;
    orderBy?: OrderBy<SelectInput>;
    page?: number;
    limit?: number;
  }) {
    const { where, select, orderBy, page = 1, limit = 10 } = params;

    const skip = (page - 1) * limit;
    const take = limit;

    const totalItems = await this.databaseService[this.modelName].count({
      where,
    });
    const totalPages = Math.ceil(totalItems / limit);

    const items = await this.databaseService[this.modelName].findMany({
      where,
      orderBy,
      select,
      skip,
      take,
    });

    const hasNextPage = skip + limit < totalItems;

    return {
      items,
      totalItems,
      totalPages,
      currentPage: page,
      hasNextPage,
    };
  }
}
