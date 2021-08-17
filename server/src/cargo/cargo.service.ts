import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CargoServiceBase } from "./base/cargo.service.base";

@Injectable()
export class CargoService extends CargoServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
