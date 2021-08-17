import { Address as TAddress } from "../api/address/Address";

export const ADDRESS_TITLE_FIELD = "address_1";

export const AddressTitle = (record: TAddress) => {
  return record.address_1;
};
