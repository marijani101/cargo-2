import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";
import { JsonValue } from "type-fest";

export type RouteUpdateInput = {
  countryOfDestination?: CountryWhereUniqueInput | null;
  countryOfOrigin?: CountryWhereUniqueInput | null;
  routingInformation?: JsonValue | null;
};
