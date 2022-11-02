import { useState } from "react";
import { normalizeInput } from "../../helpers";
import { FieldsInterface } from "./FieldsInterface";
import style from "./style.module.scss";
import { validateFields } from "../../helpers/validateFields";
import { useRouter } from "next/router";

export const Register = () => {
  const router = useRouter();

  const [fields, setFields] = useState<FieldsInterface>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("");
  const [passwordStrengthWidth, setPasswordStrengthWidth] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [errorsValidation, setErrorsValidation] = useState<any | null>(null);
  const [successForm, setSuccessForm] = useState<boolean>(false);
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  const mediumRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );

  const handlePhoneChange = ({ target: { value } }: any) =>
    setFields((prevState) => ({
      ...prevState,
      phone: normalizeInput(value, prevState?.phone),
    }));
  const onUpdateField = (e: any) => {
    const nextFormState = {
      ...fields,
      [e.target.name]: e.target.value,
    };
    setFields(nextFormState);
  };

  const handlePasswordChange = ({ target: { value } }: any) => {
    if (value.length) {
      if (strongRegex.test(value)) {
        setPasswordStrengthColor("green");
        setPasswordStrengthWidth("100%");
        setPasswordStrength("Strong");
      } else if (mediumRegex.test(value)) {
        setPasswordStrengthColor("orange");
        setPasswordStrengthWidth("50%");
        setPasswordStrength("Medium");
      } else {
        setPasswordStrengthColor("red");
        setPasswordStrengthWidth("25%");
        setPasswordStrength("Weak");
      }
    } else {
      setPasswordStrengthColor("");
      setPasswordStrengthWidth("");
    }

    setFields((prevState) => ({
      ...prevState,
      password: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { errors } = validateFields(fields);
    if (errors.length) {
      setErrorsValidation(
        errors.reduce(
          (acc, cur) => ({ ...acc, [cur.property]: cur.message }),
          {}
        )
      );
      setSuccessForm(false);
    } else {
      setSuccessForm(true);
      setFields({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      });
      setPasswordStrengthColor("");
      setPasswordStrengthWidth("");
      setPasswordStrength("");
    }
  };

  return (
    <div className={style.baseContainer}>
      {(errorsValidation || successForm) && (
        <div
          className={
            errorsValidation
              ? style.registrationError
              : style.registrationSuccess
          }
        >
          {errorsValidation
            ? "Registration has failed"
            : "Registration Successfull"}
        </div>
      )}
      <h4 className="card-header">Register</h4>
      <div className={style.content}>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.formGroup}>
            <label>First Name</label>
            <input
              name="firstName"
              type="text"
              onChange={onUpdateField}
              value={fields.firstName}
            />
            <div className={style.invalidFeedback}>
              {errorsValidation?.firstName}
            </div>
          </div>
          <div className={style.formGroup}>
            <label>Last Name</label>
            <input
              name="lastName"
              type="text"
              onChange={onUpdateField}
              value={fields.lastName}
            />
            <div className={style.invalidFeedback}>
              {errorsValidation?.lastName}
            </div>
          </div>
          <div className={style.formGroup}>
            <label>Phone Number</label>
            <input
              className="input"
              type="text"
              name="phone"
              placeholder="(xxx) xxx-xxxx"
              value={fields?.phone}
              onChange={(e) => handlePhoneChange(e)}
            />
            <div className={style.invalidFeedback}>
              {errorsValidation?.phone}
            </div>
          </div>
          <div className={style.formGroup}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              onChange={onUpdateField}
              value={fields.email}
            />
            <div className={style.invalidFeedback}>
              {errorsValidation?.email}
            </div>
          </div>
          <div className={style.formGroup}>
            <label>Password</label>
            <input
              name="password"
              type="password"
              onChange={handlePasswordChange}
              value={fields.password}
            />
            <div
              style={{
                backgroundColor: passwordStrengthColor,
                width: passwordStrengthWidth,
              }}
              className={style.passwordStrength}
            >
              {passwordStrength}
            </div>
            <div className={style.invalidFeedback}>
              {errorsValidation?.password}
            </div>
          </div>
          <div className={style.formGroup}>
            <label>Password Confirmation</label>
            <input
              name="passwordConfirmation"
              type="password"
              onChange={onUpdateField}
              value={fields.passwordConfirmation}
            />
            <div className={style.invalidFeedback}>
              {errorsValidation?.passwordConfirmation}
            </div>
          </div>
          <div className={style.footer}>
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};
