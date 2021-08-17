import { RouteWhereInput } from "./RouteWhereInput";
import { RouteOrderByInput } from "./RouteOrderByInput";

export type RouteFindManyArgs = {
  where?: RouteWhereInput;
  orderBy?: RouteOrderByInput;
  skip?: number;
  take?: number;
};
