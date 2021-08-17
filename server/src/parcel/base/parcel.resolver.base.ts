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
import { CreateParcelArgs } from "./CreateParcelArgs";
import { UpdateParcelArgs } from "./UpdateParcelArgs";
import { DeleteParcelArgs } from "./DeleteParcelArgs";
import { ParcelFindManyArgs } from "./ParcelFindManyArgs";
import { ParcelFindUniqueArgs } from "./ParcelFindUniqueArgs";
import { Parcel } from "./Parcel";
import { Cargo } from "../../cargo/base/Cargo";
import { Customer } from "../../customer/base/Customer";
import { ParcelService } from "../parcel.service";

@graphql.Resolver(() => Parcel)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class ParcelResolverBase {
  constructor(
    protected readonly service: ParcelService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Parcel",
    action: "read",
    possession: "any",
  })
  async _parcelsMeta(
    @graphql.Args() args: ParcelFindManyArgs
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

  @graphql.Query(() => [Parcel])
  @nestAccessControl.UseRoles({
    resource: "Parcel",
    action: "read",
    possession: "any",
  })
  async parcels(
    @graphql.Args() args: ParcelFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Parcel[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Parcel",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Parcel, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Parcel",
    action: "read",
    possession: "own",
  })
  async parcel(
    @graphql.Args() args: ParcelFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Parcel | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Parcel",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Parcel)
  @nestAccessControl.UseRoles({
    resource: "Parcel",
    action: "create",
    possession: "any",
  })
  async createParcel(
    @graphql.Args() args: CreateParcelArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Parcel> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Parcel",
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
        `providing the properties: ${properties} on ${"Parcel"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        cargo: args.data.cargo
          ? {
              connect: args.data.cargo,
            }
          : undefined,

        customer: args.data.customer
          ? {
              connect: args.data.customer,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Parcel)
  @nestAccessControl.UseRoles({
    resource: "Parcel",
    action: "update",
    possession: "any",
  })
  async updateParcel(
    @graphql.Args() args: UpdateParcelArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Parcel | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Parcel",
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
        `providing the properties: ${properties} on ${"Parcel"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          cargo: args.data.cargo
            ? {
                connect: args.data.cargo,
              }
            : undefined,

          customer: args.data.customer
            ? {
                connect: args.data.customer,
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

  @graphql.Mutation(() => Parcel)
  @nestAccessControl.UseRoles({
    resource: "Parcel",
    action: "delete",
    possession: "any",
  })
  async deleteParcel(
    @graphql.Args() args: DeleteParcelArgs
  ): Promise<Parcel | null> {
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

  @graphql.ResolveField(() => Cargo, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Parcel",
    action: "read",
    possession: "any",
  })
  async cargo(
    @graphql.Parent() parent: Parcel,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Cargo | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Cargo",
    });
    const result = await this.service.getCargo(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Customer, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Parcel",
    action: "read",
    possession: "any",
  })
  async customer(
    @graphql.Parent() parent: Parcel,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Customer | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Customer",
    });
    const result = await this.service.getCustomer(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
