import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { FloatNullableFilter } from "../../util/FloatNullableFilter";

export type CargoWhereInput = {
  description?: StringNullableFilter;
  id?: StringFilter;
  itemPrice?: FloatNullableFilter;
  name?: StringNullableFilter;
};
