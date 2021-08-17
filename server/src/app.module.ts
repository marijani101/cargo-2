import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ParcelModule } from "./parcel/parcel.module";
import { CustomerModule } from "./customer/customer.module";
import { AddressModule } from "./address/address.module";
import { CargoModule } from "./cargo/cargo.module";
import { RouteModule } from "./route/route.module";
import { CountryModule } from "./country/country.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    UserModule,
    ParcelModule,
    CustomerModule,
    AddressModule,
    CargoModule,
    RouteModule,
    CountryModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
