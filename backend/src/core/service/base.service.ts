import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { OrderBy } from 'src/utils/types/orderBy';

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

  async findById(id: number) {
    return await this.databaseService[this.modelName].findUnique({
      where: { id },
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
    include?: IncludeInput;
    page?: number;
    limit?: number;
  }) {
    const { where, select, orderBy, page = 1, limit = 10, include } = params;

    const skip = (page - 1) * limit;
    const take = limit;

    const totalItems = await this.databaseService[this.modelName].count({
      where,
    });
    const totalPages = Math.ceil(totalItems / limit);

    const finalOrderBy = orderBy || { createdAt: 'desc' };

    const items = await this.databaseService[this.modelName].findMany({
      where,
      orderBy: finalOrderBy,
      select,
      skip,
      take,
      include,
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
