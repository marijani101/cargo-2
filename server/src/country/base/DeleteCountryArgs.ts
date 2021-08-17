import { ArgsType, Field } from "@nestjs/graphql";
import { CountryWhereUniqueInput } from "./CountryWhereUniqueInput";

@ArgsType()
class DeleteCountryArgs {
  @Field(() => CountryWhereUniqueInput, { nullable: false })
  where!: CountryWhereUniqueInput;
}

export { DeleteCountryArgs };
