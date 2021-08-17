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
import { RouteService } from "../route.service";
import { RouteCreateInput } from "./RouteCreateInput";
import { RouteWhereInput } from "./RouteWhereInput";
import { RouteWhereUniqueInput } from "./RouteWhereUniqueInput";
import { RouteFindManyArgs } from "./RouteFindManyArgs";
import { RouteUpdateInput } from "./RouteUpdateInput";
import { Route } from "./Route";

export class RouteControllerBase {
  constructor(
    protected readonly service: RouteService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Route",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Route })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: RouteCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Route> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Route",
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
        `providing the properties: ${properties} on ${"Route"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        countryOfDestination: data.countryOfDestination
          ? {
              connect: data.countryOfDestination,
            }
          : undefined,

        countryOfOrigin: data.countryOfOrigin
          ? {
              connect: data.countryOfOrigin,
            }
          : undefined,
      },
      select: {
        countryOfDestination: {
          select: {
            id: true,
          },
        },

        countryOfOrigin: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        routingInformation: true,
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
    resource: "Route",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Route] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => RouteFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Route[]> {
    const args = plainToClass(RouteFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Route",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        countryOfDestination: {
          select: {
            id: true,
          },
        },

        countryOfOrigin: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        routingInformation: true,
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
    resource: "Route",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Route })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: RouteWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Route | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Route",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        countryOfDestination: {
          select: {
            id: true,
          },
        },

        countryOfOrigin: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        routingInformation: true,
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
    resource: "Route",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Route })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: RouteWhereUniqueInput,
    @common.Body()
    data: RouteUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Route | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Route",
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
        `providing the properties: ${properties} on ${"Route"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          countryOfDestination: data.countryOfDestination
            ? {
                connect: data.countryOfDestination,
              }
            : undefined,

          countryOfOrigin: data.countryOfOrigin
            ? {
                connect: data.countryOfOrigin,
              }
            : undefined,
        },
        select: {
          countryOfDestination: {
            select: {
              id: true,
            },
          },

          countryOfOrigin: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          routingInformation: true,
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
    resource: "Route",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Route })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: RouteWhereUniqueInput
  ): Promise<Route | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          countryOfDestination: {
            select: {
              id: true,
            },
          },

          countryOfOrigin: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          routingInformation: true,
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
