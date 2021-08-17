import { PrismaService } from "nestjs-prisma";
import { Prisma, Cargo, Parcel } from "@prisma/client";

export class CargoServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.CargoFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CargoFindManyArgs>
  ): Promise<number> {
    return this.prisma.cargo.count(args);
  }

  async findMany<T extends Prisma.CargoFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CargoFindManyArgs>
  ): Promise<Cargo[]> {
    return this.prisma.cargo.findMany(args);
  }
  async findOne<T extends Prisma.CargoFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CargoFindUniqueArgs>
  ): Promise<Cargo | null> {
    return this.prisma.cargo.findUnique(args);
  }
  async create<T extends Prisma.CargoCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CargoCreateArgs>
  ): Promise<Cargo> {
    return this.prisma.cargo.create<T>(args);
  }
  async update<T extends Prisma.CargoUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CargoUpdateArgs>
  ): Promise<Cargo> {
    return this.prisma.cargo.update<T>(args);
  }
  async delete<T extends Prisma.CargoDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CargoDeleteArgs>
  ): Promise<Cargo> {
    return this.prisma.cargo.delete(args);
  }

  async findParcels(
    parentId: string,
    args: Prisma.ParcelFindManyArgs
  ): Promise<Parcel[]> {
    return this.prisma.cargo
      .findUnique({
        where: { id: parentId },
      })
      .parcels(args);
  }
}
