import { Module } from "@nestjs/common";
import { ParcelModuleBase } from "./base/parcel.module.base";
import { ParcelService } from "./parcel.service";
import { ParcelController } from "./parcel.controller";
import { ParcelResolver } from "./parcel.resolver";

@Module({
  imports: [ParcelModuleBase],
  controllers: [ParcelController],
  providers: [ParcelService, ParcelResolver],
  exports: [ParcelService],
})
export class ParcelModule {}
