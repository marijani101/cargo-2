import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Country } from "../../country/base/Country";
import {
  ValidateNested,
  IsOptional,
  IsDate,
  IsString,
  IsJSON,
} from "class-validator";
import { Type } from "class-transformer";
import { GraphQLJSONObject } from "graphql-type-json";
import { JsonValue } from "type-fest";
@ObjectType()
class Route {
  @ApiProperty({
    required: false,
    type: () => Country,
  })
  @ValidateNested()
  @Type(() => Country)
  @IsOptional()
  countryOfDestination?: Country | null;

  @ApiProperty({
    required: false,
    type: () => Country,
  })
  @ValidateNested()
  @Type(() => Country)
  @IsOptional()
  countryOfOrigin?: Country | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
  })
  @IsJSON()
  @IsOptional()
  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  routingInformation!: JsonValue | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Route };
