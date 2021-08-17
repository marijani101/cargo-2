import { CargoWhereInput } from "./CargoWhereInput";
import { CargoOrderByInput } from "./CargoOrderByInput";

export type CargoFindManyArgs = {
  where?: CargoWhereInput;
  orderBy?: CargoOrderByInput;
  skip?: number;
  take?: number;
};
