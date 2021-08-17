import { ArgsType, Field } from "@nestjs/graphql";
import { ParcelWhereUniqueInput } from "./ParcelWhereUniqueInput";
import { ParcelUpdateInput } from "./ParcelUpdateInput";

@ArgsType()
class UpdateParcelArgs {
  @Field(() => ParcelWhereUniqueInput, { nullable: false })
  where!: ParcelWhereUniqueInput;
  @Field(() => ParcelUpdateInput, { nullable: false })
  data!: ParcelUpdateInput;
}

export { UpdateParcelArgs };
