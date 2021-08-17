import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CountryTitle } from "../country/CountryTitle";

export const RouteEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
