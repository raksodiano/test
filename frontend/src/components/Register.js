import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as yup from "yup";
import { Formik } from "formik";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const InitialValues = {
  names: "",
  dni: "",
  email: "",
  phone: "",
};

export default function SignUp(props) {
  const classes = useStyles();
  const ValidationSchema = yup.object().shape({
    names: yup.string().required(),
    dni: yup.string().required(),
    email: yup.string().email("Invalid email").required(),
    phone: yup.string().max(12, "Too long!").required(),
  });

  return (
    <Formik
      initialValues={InitialValues}
      onSubmit={props.onRegister}
      validationSchema={ValidationSchema}
      render={({ values, handleSubmit, setFieldValue, errors, resetForm }) => {
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="names"
                      names="Names"
                      variant="outlined"
                      required
                      fullWidth
                      value={values.names}
                      id="names"
                      onChange={(e) => setFieldValue("names", e.target.value)}
                      label="Names"
                      autoFocus
                      helperText={errors.names}
                      FormHelperTextProps={{
                        style: {
                          color: "red",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="dni"
                      value={values.dni}
                      label="DNI"
                      onChange={(e) => setFieldValue("dni", e.target.value)}
                      names="dni"
                      autoComplete="dni"
                      helperText={errors.dni}
                      FormHelperTextProps={{
                        style: {
                          color: "red",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      names="email"
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      value={values.email}
                      autoComplete="email"
                      helperText={errors.email}
                      FormHelperTextProps={{
                        style: {
                          color: "red",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      names="phone"
                      label="Phone"
                      type="phone"
                      id="phone"
                      onChange={(e) => setFieldValue("phone", e.target.value)}
                      value={values.phone}
                      autoComplete="current-phone"
                      helperText={errors.phone}
                      FormHelperTextProps={{
                        style: {
                          color: "red",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link onClick={() => props.singIn()} variant="body2">
                      Do you have a Wallet? Sign In!
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        );
      }}
    />
  );
}
