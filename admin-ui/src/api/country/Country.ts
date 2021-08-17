import { Route } from "../route/Route";

export type Country = {
  createdAt: Date;
  id: string;
  iso3: string | null;
  name: string;
  routeDestination?: Array<Route>;
  routeOrigin?: Array<Route>;
  updatedAt: Date;
};
