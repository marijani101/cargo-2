import { ArgsType, Field } from "@nestjs/graphql";
import { ParcelCreateInput } from "./ParcelCreateInput";

@ArgsType()
class CreateParcelArgs {
  @Field(() => ParcelCreateInput, { nullable: false })
  data!: ParcelCreateInput;
}

export { CreateParcelArgs };
