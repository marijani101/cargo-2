import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateRouteArgs } from "./CreateRouteArgs";
import { UpdateRouteArgs } from "./UpdateRouteArgs";
import { DeleteRouteArgs } from "./DeleteRouteArgs";
import { RouteFindManyArgs } from "./RouteFindManyArgs";
import { RouteFindUniqueArgs } from "./RouteFindUniqueArgs";
import { Route } from "./Route";
import { Country } from "../../country/base/Country";
import { RouteService } from "../route.service";

@graphql.Resolver(() => Route)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class RouteResolverBase {
  constructor(
    protected readonly service: RouteService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Route",
    action: "read",
    possession: "any",
  })
  async _routesMeta(
    @graphql.Args() args: RouteFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Route])
  @nestAccessControl.UseRoles({
    resource: "Route",
    action: "read",
    possession: "any",
  })
  async routes(
    @graphql.Args() args: RouteFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Route[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Route",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Route, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Route",
    action: "read",
    possession: "own",
  })
  async route(
    @graphql.Args() args: RouteFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Route | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Route",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Route)
  @nestAccessControl.UseRoles({
    resource: "Route",
    action: "create",
    possession: "any",
  })
  async createRoute(
    @graphql.Args() args: CreateRouteArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Route> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Route",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Route"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        countryOfDestination: args.data.countryOfDestination
          ? {
              connect: args.data.countryOfDestination,
            }
          : undefined,

        countryOfOrigin: args.data.countryOfOrigin
          ? {
              connect: args.data.countryOfOrigin,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Route)
  @nestAccessControl.UseRoles({
    resource: "Route",
    action: "update",
    possession: "any",
  })
  async updateRoute(
    @graphql.Args() args: UpdateRouteArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Route | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Route",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Route"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          countryOfDestination: args.data.countryOfDestination
            ? {
                connect: args.data.countryOfDestination,
              }
            : undefined,

          countryOfOrigin: args.data.countryOfOrigin
            ? {
                connect: args.data.countryOfOrigin,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Route)
  @nestAccessControl.UseRoles({
    resource: "Route",
    action: "delete",
    possession: "any",
  })
  async deleteRoute(
    @graphql.Args() args: DeleteRouteArgs
  ): Promise<Route | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Country, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Route",
    action: "read",
    possession: "any",
  })
  async countryOfDestination(
    @graphql.Parent() parent: Route,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Country | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Country",
    });
    const result = await this.service.getCountryOfDestination(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Country, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Route",
    action: "read",
    possession: "any",
  })
  async countryOfOrigin(
    @graphql.Parent() parent: Route,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Country | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Country",
    });
    const result = await this.service.getCountryOfOrigin(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
