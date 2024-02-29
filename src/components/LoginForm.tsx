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
} from "@chakra-ui/react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .max(50, "Must be at most 50 characters")
      .required("Required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .max(50, "Password must be at most 50 characters")
      .required("Required"),
  });

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      // Make API request to authenticate user
      const response = await apiClient.post("/auth", values);
      // Check if request was successful
      if (!response.data) {
        throw new Error(response.data.message || "Login failed");
      }

      // Extract token from response
      const token = response.data;
      // Set token in localStorage
      localStorage.setItem("token", token);

      // Call the onLoginSuccess callback to navigate to a different route
      navigate("/");
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
        Login
      </Heading>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <VStack spacing={4}>
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
                Login
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                width="full"
                onClick={() => navigate("/register")} // Use navigate to go to the register route
              >
                Register
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
