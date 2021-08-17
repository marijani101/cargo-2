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
import { CreateCountryArgs } from "./CreateCountryArgs";
import { UpdateCountryArgs } from "./UpdateCountryArgs";
import { DeleteCountryArgs } from "./DeleteCountryArgs";
import { CountryFindManyArgs } from "./CountryFindManyArgs";
import { CountryFindUniqueArgs } from "./CountryFindUniqueArgs";
import { Country } from "./Country";
import { RouteFindManyArgs } from "../../route/base/RouteFindManyArgs";
import { Route } from "../../route/base/Route";
import { CountryService } from "../country.service";

@graphql.Resolver(() => Country)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class CountryResolverBase {
  constructor(
    protected readonly service: CountryService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Country",
    action: "read",
    possession: "any",
  })
  async _countriesMeta(
    @graphql.Args() args: CountryFindManyArgs
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

  @graphql.Query(() => [Country])
  @nestAccessControl.UseRoles({
    resource: "Country",
    action: "read",
    possession: "any",
  })
  async countries(
    @graphql.Args() args: CountryFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Country[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Country",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Country, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Country",
    action: "read",
    possession: "own",
  })
  async country(
    @graphql.Args() args: CountryFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Country | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Country",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Country)
  @nestAccessControl.UseRoles({
    resource: "Country",
    action: "create",
    possession: "any",
  })
  async createCountry(
    @graphql.Args() args: CreateCountryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Country> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Country",
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
        `providing the properties: ${properties} on ${"Country"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Country)
  @nestAccessControl.UseRoles({
    resource: "Country",
    action: "update",
    possession: "any",
  })
  async updateCountry(
    @graphql.Args() args: UpdateCountryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Country | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Country",
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
        `providing the properties: ${properties} on ${"Country"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
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

  @graphql.Mutation(() => Country)
  @nestAccessControl.UseRoles({
    resource: "Country",
    action: "delete",
    possession: "any",
  })
  async deleteCountry(
    @graphql.Args() args: DeleteCountryArgs
  ): Promise<Country | null> {
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

  @graphql.ResolveField(() => [Route])
  @nestAccessControl.UseRoles({
    resource: "Country",
    action: "read",
    possession: "any",
  })
  async routeDestination(
    @graphql.Parent() parent: Country,
    @graphql.Args() args: RouteFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Route[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Route",
    });
    const results = await this.service.findRouteDestination(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Route])
  @nestAccessControl.UseRoles({
    resource: "Country",
    action: "read",
    possession: "any",
  })
  async routeOrigin(
    @graphql.Parent() parent: Country,
    @graphql.Args() args: RouteFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Route[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Route",
    });
    const results = await this.service.findRouteOrigin(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
