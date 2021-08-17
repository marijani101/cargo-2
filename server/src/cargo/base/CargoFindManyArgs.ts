import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CargoWhereInput } from "./CargoWhereInput";
import { Type } from "class-transformer";
import { CargoOrderByInput } from "./CargoOrderByInput";

@ArgsType()
class CargoFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CargoWhereInput,
  })
  @Field(() => CargoWhereInput, { nullable: true })
  @Type(() => CargoWhereInput)
  where?: CargoWhereInput;

  @ApiProperty({
    required: false,
    type: CargoOrderByInput,
  })
  @Field(() => CargoOrderByInput, { nullable: true })
  @Type(() => CargoOrderByInput)
  orderBy?: CargoOrderByInput;

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

export { CargoFindManyArgs };
