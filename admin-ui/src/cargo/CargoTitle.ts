import { Cargo as TCargo } from "../api/cargo/Cargo";

export const CARGO_TITLE_FIELD = "name";

export const CargoTitle = (record: TCargo) => {
  return record.name;
};
