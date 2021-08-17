import { ArgsType, Field } from "@nestjs/graphql";
import { CountryWhereUniqueInput } from "./CountryWhereUniqueInput";
import { CountryUpdateInput } from "./CountryUpdateInput";

@ArgsType()
class UpdateCountryArgs {
  @Field(() => CountryWhereUniqueInput, { nullable: false })
  where!: CountryWhereUniqueInput;
  @Field(() => CountryUpdateInput, { nullable: false })
  data!: CountryUpdateInput;
}

export { UpdateCountryArgs };
