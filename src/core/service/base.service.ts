import { PrismaService } from 'nestjs-prisma';
import { IPaginationOptions } from 'src/types/IPaginationOptions';

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

  async findWithPagination({ limit = 10, page = 1 }: IPaginationOptions) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.databaseService[this.modelName].findMany({
        skip,
        take: limit,
        orderBy: {
          id: 'asc', // or 'desc' depending on your requirements
        },
      }),
      this.databaseService[this.modelName].count(),
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
