import { ArgsType, Field } from "@nestjs/graphql";
import { CargoCreateInput } from "./CargoCreateInput";

@ArgsType()
class CreateCargoArgs {
  @Field(() => CargoCreateInput, { nullable: false })
  data!: CargoCreateInput;
}

export { CreateCargoArgs };
