import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  ReferenceField,
  TextField,
  DateField,
} from "react-admin";
import { COUNTRY_TITLE_FIELD } from "../country/CountryTitle";

export const RouteShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
      </SimpleShowLayout>
    </Show>
  );
};
