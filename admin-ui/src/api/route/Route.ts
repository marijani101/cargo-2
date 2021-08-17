import { Country } from "../country/Country";
import { JsonValue } from "type-fest";

export type Route = {
  countryOfDestination?: Country | null;
  countryOfOrigin?: Country | null;
  createdAt: Date;
  id: string;
  routingInformation: JsonValue | null;
  updatedAt: Date;
};
