import { ArgsType, Field } from "@nestjs/graphql";
import { CargoWhereUniqueInput } from "./CargoWhereUniqueInput";

@ArgsType()
class DeleteCargoArgs {
  @Field(() => CargoWhereUniqueInput, { nullable: false })
  where!: CargoWhereUniqueInput;
}

export { DeleteCargoArgs };
