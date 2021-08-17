import { ArgsType, Field } from "@nestjs/graphql";
import { ParcelWhereUniqueInput } from "./ParcelWhereUniqueInput";

@ArgsType()
class DeleteParcelArgs {
  @Field(() => ParcelWhereUniqueInput, { nullable: false })
  where!: ParcelWhereUniqueInput;
}

export { DeleteParcelArgs };
