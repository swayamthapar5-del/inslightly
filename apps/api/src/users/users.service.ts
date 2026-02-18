import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  updateProfile(id: string, data: any) {
    return this.prisma.user.update({ where: { id }, data });
  }
}
