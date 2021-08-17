import { Parcel as TParcel } from "../api/parcel/Parcel";

export const PARCEL_TITLE_FIELD = "referenceNumber";

export const ParcelTitle = (record: TParcel) => {
  return record.referenceNumber;
};
