import { CargoWhereUniqueInput } from "../cargo/CargoWhereUniqueInput";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { FloatNullableFilter } from "../../util/FloatNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { IntNullableFilter } from "../../util/IntNullableFilter";

export type ParcelWhereInput = {
  cargo?: CargoWhereUniqueInput;
  customer?: CustomerWhereUniqueInput;
  discount?: FloatNullableFilter;
  id?: StringFilter;
  quantity?: IntNullableFilter;
  referenceNumber?: StringFilter;
  totalPrice?: IntNullableFilter;
};
