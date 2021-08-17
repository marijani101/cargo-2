import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RouteWhereInput } from "./RouteWhereInput";
import { Type } from "class-transformer";
import { RouteOrderByInput } from "./RouteOrderByInput";

@ArgsType()
class RouteFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => RouteWhereInput,
  })
  @Field(() => RouteWhereInput, { nullable: true })
  @Type(() => RouteWhereInput)
  where?: RouteWhereInput;

  @ApiProperty({
    required: false,
    type: RouteOrderByInput,
  })
  @Field(() => RouteOrderByInput, { nullable: true })
  @Type(() => RouteOrderByInput)
  orderBy?: RouteOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { RouteFindManyArgs };
