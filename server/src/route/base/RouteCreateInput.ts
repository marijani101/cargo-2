import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CountryWhereUniqueInput } from "../../country/base/CountryWhereUniqueInput";
import { ValidateNested, IsOptional, IsJSON } from "class-validator";
import { Type } from "class-transformer";
import { GraphQLJSONObject } from "graphql-type-json";
import { JsonValue } from "type-fest";
@InputType()
class RouteCreateInput {
  @ApiProperty({
    required: false,
    type: () => CountryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CountryWhereUniqueInput)
  @IsOptional()
  @Field(() => CountryWhereUniqueInput, {
    nullable: true,
  })
  countryOfDestination?: CountryWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => CountryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CountryWhereUniqueInput)
  @IsOptional()
  @Field(() => CountryWhereUniqueInput, {
    nullable: true,
  })
  countryOfOrigin?: CountryWhereUniqueInput | null;

  @ApiProperty({
    required: false,
  })
  @IsJSON()
  @IsOptional()
  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  routingInformation?: JsonValue | null;
}
export { RouteCreateInput };
