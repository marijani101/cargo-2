import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { JsonNullableFilter } from "../../util/JsonNullableFilter";

export type RouteWhereInput = {
  countryOfDestination?: CountryWhereUniqueInput;
  countryOfOrigin?: CountryWhereUniqueInput;
  id?: StringFilter;
  routingInformation?: JsonNullableFilter;
};
