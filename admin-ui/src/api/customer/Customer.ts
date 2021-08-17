import { Address } from "../address/Address";
import { Parcel } from "../parcel/Parcel";

export type Customer = {
  address?: Address | null;
  createdAt: Date;
  email: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  parcels?: Array<Parcel>;
  phone: string | null;
  updatedAt: Date;
};
