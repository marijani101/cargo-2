import { SortOrder } from "../../util/SortOrder";

export type ParcelOrderByInput = {
  cargoId?: SortOrder;
  createdAt?: SortOrder;
  customerId?: SortOrder;
  discount?: SortOrder;
  id?: SortOrder;
  quantity?: SortOrder;
  referenceNumber?: SortOrder;
  totalPrice?: SortOrder;
  updatedAt?: SortOrder;
};
