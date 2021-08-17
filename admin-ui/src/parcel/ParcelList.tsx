import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  ReferenceField,
  TextField,
  DateField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { CARGO_TITLE_FIELD } from "../cargo/CargoTitle";
import { CUSTOMER_TITLE_FIELD } from "../customer/CustomerTitle";

export const ParcelList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Parcels"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <ReferenceField label="Cargo" source="cargo.id" reference="Cargo">
          <TextField source={CARGO_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="createdAt" label="Created At" />
        <ReferenceField
          label="Customer"
          source="customer.id"
          reference="Customer"
        >
          <TextField source={CUSTOMER_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Discount" source="discount" />
        <TextField label="ID" source="id" />
        <TextField label="Quantity" source="quantity" />
        <TextField label="Reference Number " source="referenceNumber" />
        <TextField label="Total Price" source="totalPrice" />
        <DateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
  );
};
