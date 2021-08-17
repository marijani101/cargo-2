import { PrismaService } from "nestjs-prisma";
import { Prisma, Country, Route } from "@prisma/client";

export class CountryServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.CountryFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CountryFindManyArgs>
  ): Promise<number> {
    return this.prisma.country.count(args);
  }

  async findMany<T extends Prisma.CountryFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CountryFindManyArgs>
  ): Promise<Country[]> {
    return this.prisma.country.findMany(args);
  }
  async findOne<T extends Prisma.CountryFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CountryFindUniqueArgs>
  ): Promise<Country | null> {
    return this.prisma.country.findUnique(args);
  }
  async create<T extends Prisma.CountryCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CountryCreateArgs>
  ): Promise<Country> {
    return this.prisma.country.create<T>(args);
  }
  async update<T extends Prisma.CountryUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CountryUpdateArgs>
  ): Promise<Country> {
    return this.prisma.country.update<T>(args);
  }
  async delete<T extends Prisma.CountryDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CountryDeleteArgs>
  ): Promise<Country> {
    return this.prisma.country.delete(args);
  }

  async findRouteDestination(
    parentId: string,
    args: Prisma.RouteFindManyArgs
  ): Promise<Route[]> {
    return this.prisma.country
      .findUnique({
        where: { id: parentId },
      })
      .routeDestination(args);
  }

  async findRouteOrigin(
    parentId: string,
    args: Prisma.RouteFindManyArgs
  ): Promise<Route[]> {
    return this.prisma.country
      .findUnique({
        where: { id: parentId },
      })
      .routeOrigin(args);
  }
}
