import React from "react";

import LoginStyle from "../theme/pages/Login";

import { Formik, Form, Field, ErrorMessage, useFormik, useField } from "formik";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import {
  DefaultButton,
  LoginButton,
  Button83,
  ContactButton,
  DownloadButton,
  MUIButtonCustom02,
  MUIButtonCustom01,
  MUIButtonCustom03,
  MUIButtonCustom04,
  MUIButtonLoading01,
} from "../theme/components/Button";

import { MUIInputCustom01, MUIInputCustom02 } from "../theme/components/Input";

import {
  Box,
  Button,
  InputLabel,
  FormControl,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Alert,
  AlertTitle,
  IconButton,
  InputAdornment,
  Checkbox,
} from "@mui/material";

import { HeadingPrimary, DefaultParagraph } from "../theme/Typography";

import { Link } from "react-router-dom";

import { AiOutlineCloseCircle } from "react-icons/ai";

const Login = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const setCloseAlertLogin = () => {};

  const handleClickShowPassword = () => {};

  const handleMouseDownPassword = () => {};

  return (
    <LoginStyle>
      <div className="section-login">
        <Formik
          initialValues={{ username: "", password: "" }}
          // validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            console.log(values);
            // login(
            //   {
            //     username: values.username,
            //     password: values.password,
            //   },
            //   actions,
            //   loginSuccess
            // );
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} className="login__form">
              <h1 className="login-heading">Login</h1>
              <div className="login__form--alert-container">
                <Alert
                  severity="error"
                  sx={{ fontSize: "1.4rem" }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setCloseAlertLogin(false);
                      }}
                    >
                      <AiOutlineCloseCircle fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <AlertTitle sx={{ fontSize: "1.4rem" }}>Error</AlertTitle>
                  Your account is blocked <strong>forever</strong>
                </Alert>
              </div>
              <Field name="username">
                {({ field, form, meta }) => (
                  <FormControl>
                    <MUIInputCustom02
                      {...field}
                      id="username"
                      name="username"
                      label="Username"
                      value={props.values.username}
                      onChange={props.handleChange}
                      error={
                        props.touched.username && Boolean(props.errors.username)
                      }
                      aria-describedby="component-helper-text"
                      // disabled={isCountDown}
                      // helperText={
                      //   props.touched.username && props.errors.username
                      // }
                    />
                    <FormHelperText
                      id="component-helper-text"
                      sx={{
                        fontSize: "1.2rem",
                        color: "var(--color-tertiary-dark-2)",
                      }}
                    >
                      {props.touched.username && props.errors.username}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form, meta }) => (
                  <FormControl>
                    <MUIInputCustom02
                      id="password"
                      name="password"
                      label="Password"
                      value={props.values.password}
                      onChange={props.handleChange}
                      error={
                        props.touched.password && Boolean(props.errors.password)
                      }
                      // disabled={isCountDown}
                      // helperText={
                      //   props.touched.password && props.errors.password
                      // }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {/* {values.showPassword ? (
                                <AiFillEyeInvisible />
                              ) : (
                                <AiFillEye />
                              )} */}
                              <AiFillEye />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText
                      id="component-helper-text"
                      sx={{
                        fontSize: "1.2rem",
                        color: "var(--color-tertiary-dark-2)",
                      }}
                    >
                      {props.touched.password && props.errors.password}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>

              {/* {isLoadingForm ? (
                <MUIButtonLoading01
                  endIcon={<SendIcon />}
                  loading={isLoadingForm}
                  loadingPosition="end"
                  variant="contained"
                >
                  Login is processing...
                </MUIButtonLoading01>
              ) : (
                <MUIButtonCustom02
                  variant="contained"
                  type="submit"
                  disabled={isCountDown}
                >
                  Login
                </MUIButtonCustom02>
              )} */}

              <MUIButtonCustom04
                variant="contained"
                type="submit"
                // disabled={isCountDown}
              >
                Login
              </MUIButtonCustom04>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "max-content 1fr",
                  alignItems: "center",
                }}
              >
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="remember"
                      control={
                        <Checkbox
                          {...label}
                          defaultChecked
                          sx={{
                            color: "var(--color-primary-light-2)",

                            "&.Mui-checked": {
                              color: "var(--color-primary)",
                            },
                          }}
                        />
                      }
                      label="Remember me"
                      labelPlacement="start"
                    />
                  </FormGroup>
                </FormControl>

                <Box sx={{ justifySelf: "end" }}>
                  <InputLabel>
                    <Link to={"/forgot-password"}>Forgot password</Link>
                  </InputLabel>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </LoginStyle>
  );
};

export default Login;
