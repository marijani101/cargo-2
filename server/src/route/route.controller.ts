import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { RouteService } from "./route.service";
import { RouteControllerBase } from "./base/route.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("routes")
@common.Controller("routes")
export class RouteController extends RouteControllerBase {
  constructor(
    protected readonly service: RouteService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
