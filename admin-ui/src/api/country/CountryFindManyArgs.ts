import { CountryWhereInput } from "./CountryWhereInput";
import { CountryOrderByInput } from "./CountryOrderByInput";

export type CountryFindManyArgs = {
  where?: CountryWhereInput;
  orderBy?: CountryOrderByInput;
  skip?: number;
  take?: number;
};
