import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
  NumberInput,
  TextInput,
} from "react-admin";

import { CargoTitle } from "../cargo/CargoTitle";
import { CustomerTitle } from "../customer/CustomerTitle";

export const ParcelEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput source="cargo.id" reference="Cargo" label="Cargo">
          <SelectInput optionText={CargoTitle} />
        </ReferenceInput>
        <ReferenceInput
          source="customer.id"
          reference="Customer"
          label="Customer"
        >
          <SelectInput optionText={CustomerTitle} />
        </ReferenceInput>
        <NumberInput label="Discount" source="discount" />
        <NumberInput step={1} label="Quantity" source="quantity" />
        <TextInput label="Reference Number " source="referenceNumber" />
        <NumberInput step={1} label="Total Price" source="totalPrice" />
      </SimpleForm>
    </Edit>
  );
};
