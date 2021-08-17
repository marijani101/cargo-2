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
import { COUNTRY_TITLE_FIELD } from "../country/CountryTitle";

export const RouteList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Routes"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <ReferenceField
          label="Country Of Destination"
          source="country.id"
          reference="Country"
        >
          <TextField source={COUNTRY_TITLE_FIELD} />
        </ReferenceField>
        <ReferenceField
          label="Country Of Origin"
          source="country.id"
          reference="Country"
        >
          <TextField source={COUNTRY_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="Routing Information" source="routingInformation" />
        <DateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
  );
};
