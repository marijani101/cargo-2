import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CargoService } from "./cargo.service";
import { CargoControllerBase } from "./base/cargo.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("cargos")
@common.Controller("cargos")
export class CargoController extends CargoControllerBase {
  constructor(
    protected readonly service: CargoService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
