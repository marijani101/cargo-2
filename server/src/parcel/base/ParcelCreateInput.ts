import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CargoWhereUniqueInput } from "../../cargo/base/CargoWhereUniqueInput";
import {
  ValidateNested,
  IsOptional,
  IsNumber,
  IsInt,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { CustomerWhereUniqueInput } from "../../customer/base/CustomerWhereUniqueInput";
@InputType()
class ParcelCreateInput {
  @ApiProperty({
    required: false,
    type: () => CargoWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CargoWhereUniqueInput)
  @IsOptional()
  @Field(() => CargoWhereUniqueInput, {
    nullable: true,
  })
  cargo?: CargoWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => CustomerWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CustomerWhereUniqueInput)
  @IsOptional()
  @Field(() => CustomerWhereUniqueInput, {
    nullable: true,
  })
  customer?: CustomerWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  discount?: number | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  quantity?: number | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  referenceNumber!: string;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  totalPrice?: number | null;
}
export { ParcelCreateInput };
