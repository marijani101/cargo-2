import { CountryWhereUniqueInput } from "./CountryWhereUniqueInput";
import { CountryUpdateInput } from "./CountryUpdateInput";

export type UpdateCountryArgs = {
  where: CountryWhereUniqueInput;
  data: CountryUpdateInput;
};
