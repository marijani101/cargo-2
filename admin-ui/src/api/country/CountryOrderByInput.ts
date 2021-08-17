import { SortOrder } from "../../util/SortOrder";

export type CountryOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  iso3?: SortOrder;
  name?: SortOrder;
  updatedAt?: SortOrder;
};
