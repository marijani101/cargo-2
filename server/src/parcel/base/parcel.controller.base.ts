import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ParcelService } from "../parcel.service";
import { ParcelCreateInput } from "./ParcelCreateInput";
import { ParcelWhereInput } from "./ParcelWhereInput";
import { ParcelWhereUniqueInput } from "./ParcelWhereUniqueInput";
import { ParcelFindManyArgs } from "./ParcelFindManyArgs";
import { ParcelUpdateInput } from "./ParcelUpdateInput";
import { Parcel } from "./Parcel";

export class ParcelControllerBase {
  constructor(
    protected readonly service: ParcelService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Parcel",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Parcel })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: ParcelCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Parcel> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Parcel",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Parcel"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        cargo: data.cargo
          ? {
              connect: data.cargo,
            }
          : undefined,

        customer: data.customer
          ? {
              connect: data.customer,
            }
          : undefined,
      },
      select: {
        cargo: {
          select: {
            id: true,
          },
        },

        createdAt: true,

        customer: {
          select: {
            id: true,
          },
        },

        discount: true,
        id: true,
        quantity: true,
        referenceNumber: true,
        totalPrice: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Parcel",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Parcel] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => ParcelFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Parcel[]> {
    const args = plainToClass(ParcelFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Parcel",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        cargo: {
          select: {
            id: true,
          },
        },

        createdAt: true,

        customer: {
          select: {
            id: true,
          },
        },

        discount: true,
        id: true,
        quantity: true,
        referenceNumber: true,
        totalPrice: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Parcel",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Parcel })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: ParcelWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Parcel | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Parcel",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        cargo: {
          select: {
            id: true,
          },
        },

        createdAt: true,

        customer: {
          select: {
            id: true,
          },
        },

        discount: true,
        id: true,
        quantity: true,
        referenceNumber: true,
        totalPrice: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Parcel",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Parcel })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: ParcelWhereUniqueInput,
    @common.Body()
    data: ParcelUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Parcel | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Parcel",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Parcel"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          cargo: data.cargo
            ? {
                connect: data.cargo,
              }
            : undefined,

          customer: data.customer
            ? {
                connect: data.customer,
              }
            : undefined,
        },
        select: {
          cargo: {
            select: {
              id: true,
            },
          },

          createdAt: true,

          customer: {
            select: {
              id: true,
            },
          },

          discount: true,
          id: true,
          quantity: true,
          referenceNumber: true,
          totalPrice: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Parcel",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Parcel })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: ParcelWhereUniqueInput
  ): Promise<Parcel | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          cargo: {
            select: {
              id: true,
            },
          },

          createdAt: true,

          customer: {
            select: {
              id: true,
            },
          },

          discount: true,
          id: true,
          quantity: true,
          referenceNumber: true,
          totalPrice: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
