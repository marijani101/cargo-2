import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CountryTitle } from "../country/CountryTitle";

export const RouteCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput
          source="country.id"
          reference="Country"
          label="Country Of Destination"
        >
          <SelectInput optionText={CountryTitle} />
        </ReferenceInput>
        <ReferenceInput
          source="country.id"
          reference="Country"
          label="Country Of Origin"
        >
          <SelectInput optionText={CountryTitle} />
        </ReferenceInput>
        <div />
      </SimpleForm>
    </Create>
  );
};
