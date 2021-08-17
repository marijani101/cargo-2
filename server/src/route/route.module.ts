import { Module } from "@nestjs/common";
import { RouteModuleBase } from "./base/route.module.base";
import { RouteService } from "./route.service";
import { RouteController } from "./route.controller";
import { RouteResolver } from "./route.resolver";

@Module({
  imports: [RouteModuleBase],
  controllers: [RouteController],
  providers: [RouteService, RouteResolver],
  exports: [RouteService],
})
export class RouteModule {}
