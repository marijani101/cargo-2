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
import { CreateCargoArgs } from "./CreateCargoArgs";
import { UpdateCargoArgs } from "./UpdateCargoArgs";
import { DeleteCargoArgs } from "./DeleteCargoArgs";
import { CargoFindManyArgs } from "./CargoFindManyArgs";
import { CargoFindUniqueArgs } from "./CargoFindUniqueArgs";
import { Cargo } from "./Cargo";
import { ParcelFindManyArgs } from "../../parcel/base/ParcelFindManyArgs";
import { Parcel } from "../../parcel/base/Parcel";
import { CargoService } from "../cargo.service";

@graphql.Resolver(() => Cargo)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class CargoResolverBase {
  constructor(
    protected readonly service: CargoService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Cargo",
    action: "read",
    possession: "any",
  })
  async _cargosMeta(
    @graphql.Args() args: CargoFindManyArgs
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

  @graphql.Query(() => [Cargo])
  @nestAccessControl.UseRoles({
    resource: "Cargo",
    action: "read",
    possession: "any",
  })
  async cargos(
    @graphql.Args() args: CargoFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Cargo[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Cargo",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Cargo, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Cargo",
    action: "read",
    possession: "own",
  })
  async cargo(
    @graphql.Args() args: CargoFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Cargo | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Cargo",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Cargo)
  @nestAccessControl.UseRoles({
    resource: "Cargo",
    action: "create",
    possession: "any",
  })
  async createCargo(
    @graphql.Args() args: CreateCargoArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Cargo> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Cargo",
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
        `providing the properties: ${properties} on ${"Cargo"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Cargo)
  @nestAccessControl.UseRoles({
    resource: "Cargo",
    action: "update",
    possession: "any",
  })
  async updateCargo(
    @graphql.Args() args: UpdateCargoArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Cargo | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Cargo",
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
        `providing the properties: ${properties} on ${"Cargo"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Cargo)
  @nestAccessControl.UseRoles({
    resource: "Cargo",
    action: "delete",
    possession: "any",
  })
  async deleteCargo(
    @graphql.Args() args: DeleteCargoArgs
  ): Promise<Cargo | null> {
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

  @graphql.ResolveField(() => [Parcel])
  @nestAccessControl.UseRoles({
    resource: "Cargo",
    action: "read",
    possession: "any",
  })
  async parcels(
    @graphql.Parent() parent: Cargo,
    @graphql.Args() args: ParcelFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Parcel[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Parcel",
    });
    const results = await this.service.findParcels(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
