import { ArgsType, Field } from "@nestjs/graphql";
import { CargoWhereUniqueInput } from "./CargoWhereUniqueInput";
import { CargoUpdateInput } from "./CargoUpdateInput";

@ArgsType()
class UpdateCargoArgs {
  @Field(() => CargoWhereUniqueInput, { nullable: false })
  where!: CargoWhereUniqueInput;
  @Field(() => CargoUpdateInput, { nullable: false })
  data!: CargoUpdateInput;
}

export { UpdateCargoArgs };
