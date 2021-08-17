import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CountryWhereInput } from "./CountryWhereInput";
import { Type } from "class-transformer";
import { CountryOrderByInput } from "./CountryOrderByInput";

@ArgsType()
class CountryFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CountryWhereInput,
  })
  @Field(() => CountryWhereInput, { nullable: true })
  @Type(() => CountryWhereInput)
  where?: CountryWhereInput;

  @ApiProperty({
    required: false,
    type: CountryOrderByInput,
  })
  @Field(() => CountryOrderByInput, { nullable: true })
  @Type(() => CountryOrderByInput)
  orderBy?: CountryOrderByInput;

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

export { CountryFindManyArgs };
