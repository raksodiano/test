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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const InitialValues = {
  email: "",
  phone: "",
};

export default function SignIn(props) {
  const classes = useStyles();

  const ValidationSchema = yup.object().shape({
    email: yup.string().required(),
    phone: yup.string().max(12, "Too long!").required(),
  });

  return (
    <Formik
      initialValues={InitialValues}
      onSubmit={props.onLogin}
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
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  helperText={errors.email}
                  value={values.email}
                  name="email"
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  autoComplete="email"
                  FormHelperTextProps={{
                    style: {
                      color: "red",
                    },
                  }}
                  autoFocus
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="phone"
                  value={values.phone}
                  label="Phone"
                  type="phone"
                  id="phone"
                  onChange={(e) => setFieldValue("phone", e.target.value)}
                  helperText={errors.phone}
                  FormHelperTextProps={{
                    style: {
                      color: "red",
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs />
                  <Grid item>
                    <Link onClick={() => props.singUp()} variant="body2">
                      {"Do you not have a Wallet? Sign Up!"}
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
