import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type CountryWhereInput = {
  id?: StringFilter;
  iso3?: StringNullableFilter;
  name?: StringFilter;
};
