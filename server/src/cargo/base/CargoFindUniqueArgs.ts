import { ArgsType, Field } from "@nestjs/graphql";
import { CargoWhereUniqueInput } from "./CargoWhereUniqueInput";

@ArgsType()
class CargoFindUniqueArgs {
  @Field(() => CargoWhereUniqueInput, { nullable: false })
  where!: CargoWhereUniqueInput;
}

export { CargoFindUniqueArgs };
