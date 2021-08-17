import { PrismaService } from "nestjs-prisma";
import { Prisma, Route, Country } from "@prisma/client";

export class RouteServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.RouteFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RouteFindManyArgs>
  ): Promise<number> {
    return this.prisma.route.count(args);
  }

  async findMany<T extends Prisma.RouteFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RouteFindManyArgs>
  ): Promise<Route[]> {
    return this.prisma.route.findMany(args);
  }
  async findOne<T extends Prisma.RouteFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.RouteFindUniqueArgs>
  ): Promise<Route | null> {
    return this.prisma.route.findUnique(args);
  }
  async create<T extends Prisma.RouteCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RouteCreateArgs>
  ): Promise<Route> {
    return this.prisma.route.create<T>(args);
  }
  async update<T extends Prisma.RouteUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RouteUpdateArgs>
  ): Promise<Route> {
    return this.prisma.route.update<T>(args);
  }
  async delete<T extends Prisma.RouteDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.RouteDeleteArgs>
  ): Promise<Route> {
    return this.prisma.route.delete(args);
  }

  async getCountryOfDestination(parentId: string): Promise<Country | null> {
    return this.prisma.route
      .findUnique({
        where: { id: parentId },
      })
      .countryOfDestination();
  }

  async getCountryOfOrigin(parentId: string): Promise<Country | null> {
    return this.prisma.route
      .findUnique({
        where: { id: parentId },
      })
      .countryOfOrigin();
  }
}
