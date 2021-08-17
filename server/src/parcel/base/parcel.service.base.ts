import { PrismaService } from "nestjs-prisma";
import { Prisma, Parcel, Cargo, Customer } from "@prisma/client";

export class ParcelServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ParcelFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ParcelFindManyArgs>
  ): Promise<number> {
    return this.prisma.parcel.count(args);
  }

  async findMany<T extends Prisma.ParcelFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ParcelFindManyArgs>
  ): Promise<Parcel[]> {
    return this.prisma.parcel.findMany(args);
  }
  async findOne<T extends Prisma.ParcelFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ParcelFindUniqueArgs>
  ): Promise<Parcel | null> {
    return this.prisma.parcel.findUnique(args);
  }
  async create<T extends Prisma.ParcelCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ParcelCreateArgs>
  ): Promise<Parcel> {
    return this.prisma.parcel.create<T>(args);
  }
  async update<T extends Prisma.ParcelUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ParcelUpdateArgs>
  ): Promise<Parcel> {
    return this.prisma.parcel.update<T>(args);
  }
  async delete<T extends Prisma.ParcelDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ParcelDeleteArgs>
  ): Promise<Parcel> {
    return this.prisma.parcel.delete(args);
  }

  async getCargo(parentId: string): Promise<Cargo | null> {
    return this.prisma.parcel
      .findUnique({
        where: { id: parentId },
      })
      .cargo();
  }

  async getCustomer(parentId: string): Promise<Customer | null> {
    return this.prisma.parcel
      .findUnique({
        where: { id: parentId },
      })
      .customer();
  }
}
