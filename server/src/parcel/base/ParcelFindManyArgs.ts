import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ParcelWhereInput } from "./ParcelWhereInput";
import { Type } from "class-transformer";
import { ParcelOrderByInput } from "./ParcelOrderByInput";

@ArgsType()
class ParcelFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ParcelWhereInput,
  })
  @Field(() => ParcelWhereInput, { nullable: true })
  @Type(() => ParcelWhereInput)
  where?: ParcelWhereInput;

  @ApiProperty({
    required: false,
    type: ParcelOrderByInput,
  })
  @Field(() => ParcelOrderByInput, { nullable: true })
  @Type(() => ParcelOrderByInput)
  orderBy?: ParcelOrderByInput;

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

export { ParcelFindManyArgs };
