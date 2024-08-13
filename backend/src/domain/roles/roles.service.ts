import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RoleEnum } from '../../core/enums/roles.enum';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async createRole(name: keyof typeof RoleEnum) {
    return this.prisma.role.create({
      data: {
        name,
      },
    });
  }

  async assignRoleToUser(userId: number, roleName: keyof typeof RoleEnum) {
    const role = await this.prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      throw new Error('Role not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        role: {
          connect: { id: role.id },
        },
      },
    });
  }

  async getUserRoles(userId: number) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
  }
}
