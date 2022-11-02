import revalidator from "revalidator";
import { confirmPasswordValidator } from "./confirmPasswordValidator";

export const validateFields = (fields: any) =>
  revalidator.validate(fields, {
    properties: {
      firstName: {
        description: "This field is required",
        type: "string",
        allowEmpty: false,
      },
      lastName: {
        description: "This field is required",
        type: "string",
        allowEmpty: false,
      },
      phone: {
        description: "This field is required",
        type: "string",
        allowEmpty: false,
      },
      email: {
        description: "This field is required",
        type: "string",
        format: "email",
        allowEmpty: false,
      },
      password: {
        description: "This field is required",
        type: "string",
        pattern:
          /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
        allowEmpty: false,
      },
      passwordConfirmation: {
        description: "This field is required",
        type: "string",
        minLength: 8,
        allowEmpty: false,
        conform: (value, schema) => confirmPasswordValidator(value, schema),
      },
    },
  });
