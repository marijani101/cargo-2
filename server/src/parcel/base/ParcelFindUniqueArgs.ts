import { ArgsType, Field } from "@nestjs/graphql";
import { ParcelWhereUniqueInput } from "./ParcelWhereUniqueInput";

@ArgsType()
class ParcelFindUniqueArgs {
  @Field(() => ParcelWhereUniqueInput, { nullable: false })
  where!: ParcelWhereUniqueInput;
}

export { ParcelFindUniqueArgs };
