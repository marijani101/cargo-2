import { Module } from "@nestjs/common";
import { CountryModuleBase } from "./base/country.module.base";
import { CountryService } from "./country.service";
import { CountryController } from "./country.controller";
import { CountryResolver } from "./country.resolver";

@Module({
  imports: [CountryModuleBase],
  controllers: [CountryController],
  providers: [CountryService, CountryResolver],
  exports: [CountryService],
})
export class CountryModule {}
