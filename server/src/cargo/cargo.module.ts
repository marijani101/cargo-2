import { Module } from "@nestjs/common";
import { CargoModuleBase } from "./base/cargo.module.base";
import { CargoService } from "./cargo.service";
import { CargoController } from "./cargo.controller";
import { CargoResolver } from "./cargo.resolver";

@Module({
  imports: [CargoModuleBase],
  controllers: [CargoController],
  providers: [CargoService, CargoResolver],
  exports: [CargoService],
})
export class CargoModule {}
