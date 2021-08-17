import { Cargo } from "../cargo/Cargo";
import { Customer } from "../customer/Customer";

export type Parcel = {
  cargo?: Cargo | null;
  createdAt: Date;
  customer?: Customer | null;
  discount: number | null;
  id: string;
  quantity: number | null;
  referenceNumber: string;
  totalPrice: number | null;
  updatedAt: Date;
};
