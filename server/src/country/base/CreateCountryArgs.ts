import { ArgsType, Field } from "@nestjs/graphql";
import { CountryCreateInput } from "./CountryCreateInput";

@ArgsType()
class CreateCountryArgs {
  @Field(() => CountryCreateInput, { nullable: false })
  data!: CountryCreateInput;
}

export { CreateCountryArgs };
