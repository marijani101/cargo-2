import { Parcel } from "../parcel/Parcel";

export type Cargo = {
  createdAt: Date;
  description: string | null;
  id: string;
  itemPrice: number | null;
  name: string | null;
  parcels?: Array<Parcel>;
  updatedAt: Date;
};
