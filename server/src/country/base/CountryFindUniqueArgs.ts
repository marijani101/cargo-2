import { ArgsType, Field } from "@nestjs/graphql";
import { CountryWhereUniqueInput } from "./CountryWhereUniqueInput";

@ArgsType()
class CountryFindUniqueArgs {
  @Field(() => CountryWhereUniqueInput, { nullable: false })
  where!: CountryWhereUniqueInput;
}

export { CountryFindUniqueArgs };
