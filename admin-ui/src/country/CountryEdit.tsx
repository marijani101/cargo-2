import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const CountryEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Iso3" source="iso3" />
        <TextInput label="Name" source="name" />
      </SimpleForm>
    </Edit>
  );
};
