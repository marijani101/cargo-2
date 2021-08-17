import { ParcelWhereInput } from "./ParcelWhereInput";
import { ParcelOrderByInput } from "./ParcelOrderByInput";

export type ParcelFindManyArgs = {
  where?: ParcelWhereInput;
  orderBy?: ParcelOrderByInput;
  skip?: number;
  take?: number;
};
