import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Heading,
  Link,
} from "@chakra-ui/react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface RegisterFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(3, "First name must be at least 3 characters")
      .max(50, "First name must be at most 50 characters")
      .required("Required"),
    last_name: Yup.string()
      .min(3, "Last name must be at least 3 characters")
      .max(50, "Last name must be at most 50 characters")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email")
      .max(50, "Must be at most 50 characters")
      .required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
        "Password must include at least one numeric value and one special character"
      )
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be at most 50 characters")
      .required("Required"),
  });

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      // Make API request to register user
      const response = await apiClient.post("/users", values);
      // Check if request was successful
      if (!response.data) {
        throw new Error(response.data.message || "Registration failed");
      }

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
    >
      <Heading as="h2" textAlign="center" mb={6} fontSize="xl">
        Register
      </Heading>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <VStack spacing={4}>
              <Field name="first_name">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.first_name && form.touched.first_name)
                    }
                  >
                    <FormLabel htmlFor="first_name">First Name</FormLabel>
                    <Input
                      {...field}
                      id="first_name"
                      placeholder="Enter your first name"
                    />
                    <FormErrorMessage>
                      {form.errors.first_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="last_name">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.last_name && form.touched.last_name)
                    }
                  >
                    <FormLabel htmlFor="last_name">Last Name</FormLabel>
                    <Input
                      {...field}
                      id="last_name"
                      placeholder="Enter your last name"
                    />
                    <FormErrorMessage>{form.errors.last_name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={!!(form.errors.email && form.touched.email)}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="Enter your email"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.password && form.touched.password)
                    }
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {error && <Box color="red.500">{error}</Box>}
              <Button
                colorScheme="blue"
                isLoading={formik.isSubmitting}
                type="submit"
                width="full"
              >
                Register
              </Button>
              <Button
                colorScheme="blue"
                width="full"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterForm;
