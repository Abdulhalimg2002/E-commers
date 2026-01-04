import { Button, Card, Field, Input, Stack, Flex, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Singups } from "../data";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { useCreateUserMutation } from "../app/features/Auth/SingupS";
import { useState } from "react";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

import { useDispatch } from "react-redux";
import { setCredentials } from "../app/features/Auth/Auth";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    try {
      const res = await createUser(data).unwrap();

      // ✅ تسجيل دخول تلقائي
      dispatch(
        setCredentials({
          jwt: res.jwt,
          user: res.user,
        })
      );

      toast.success("Account created successfully 🎉", {
        position: "bottom-center",
        duration: 1500,
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });

      navigate("/", { replace: true });

    } catch (error) {
      const err = error as FetchBaseQueryError & { data?: any };

      toast.error(err.data?.error?.message || "Request failed", {
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh"    align="center" justify="center" px={4}>
      <Card.Root w="full"   bg="#1f2937" boxShadow="0 20px 40px rgba(0,0,0,0.4)"
borderRadius="16px" borderColor={"#1f2937"}   maxW="sm">
        <Card.Header color={"white"}>
          <Card.Title>Sign up</Card.Title>
          <Card.Description color={"white"}>
            Fill in the form below to create an account
          </Card.Description>
        </Card.Header>

        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="4">
              {Singups.map((signup, idx) => {
                const hasError = !!errors[signup.name];

                return (
                  <Field.Root color={"white"}   key={idx} invalid={hasError}>
                    <Field.Label >{signup.Label}</Field.Label>

                    <Input
                      type={signup.type}
                      placeholder={signup.placeholder}
                      
                      {...register(signup.name, signup.validation)}
                      borderColor={hasError ? "red.500" : undefined}
                      _focus={{
                        borderColor: hasError ? "red.500" : "#1D2D44",
                      }}
                      _placeholder={{ color: "whiteAlpha.700" }}
                    />

                    {hasError && (
                      <InputErrorMessage msg={errors[signup.name]?.message} />
                    )}
                  </Field.Root>
                );
              })}
            </Stack>

            <Button
              type="submit"
              color={"white"}
              bg={"teal.600"}
              mt={4}
              w="100%"
              loading={isLoading}   
              _hover={{ bg: "#1D2D44", transform: "scale(1.02)" }}
            >
              Sign up
            </Button>
          </form>
        </Card.Body>

        <Card.Footer justifyContent="flex-end" fontSize="sm"
opacity={0.8}>
          <Text fontSize="sm" textAlign="center" color={"white"}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "white" }}>
              Login
            </Link>
          </Text>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
};

export default Signup;
