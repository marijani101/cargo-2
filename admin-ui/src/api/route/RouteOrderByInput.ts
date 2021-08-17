import { SortOrder } from "../../util/SortOrder";

export type RouteOrderByInput = {
  countryOfDestinationId?: SortOrder;
  countryOfOriginId?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  routingInformation?: SortOrder;
  updatedAt?: SortOrder;
};
