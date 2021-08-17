import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const CountryCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Iso3" source="iso3" />
        <TextInput label="Name" source="name" />
      </SimpleForm>
    </Create>
  );
};
