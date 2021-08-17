import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ParcelServiceBase } from "./base/parcel.service.base";

@Injectable()
export class ParcelService extends ParcelServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
