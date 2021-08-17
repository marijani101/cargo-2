import { CargoWhereUniqueInput } from "../cargo/CargoWhereUniqueInput";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";

export type ParcelUpdateInput = {
  cargo?: CargoWhereUniqueInput | null;
  customer?: CustomerWhereUniqueInput | null;
  discount?: number | null;
  quantity?: number | null;
  referenceNumber?: string;
  totalPrice?: number | null;
};
