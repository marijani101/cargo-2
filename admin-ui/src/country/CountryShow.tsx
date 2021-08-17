import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from "react-admin";

import { COUNTRY_TITLE_FIELD } from "./CountryTitle";

export const CountryShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="Iso3" source="iso3" />
        <TextField label="Name" source="name" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField reference="Route" target="CountryId" label="Routes">
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
            <TextField
              label="Routing Information"
              source="routingInformation"
            />
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField reference="Route" target="CountryId" label="Routes">
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
            <TextField
              label="Routing Information"
              source="routingInformation"
            />
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
