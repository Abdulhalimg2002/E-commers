import { Button, Card, Field, Input, Stack, Flex,Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema } from "../validation";
import { Link } from "react-router-dom";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { Logins } from "../data";
import { useCreateAuthUMutation } from "../app/features/Auth/LoginS";
import { useState } from "react";
import toast from "react-hot-toast";




interface IFormInput {
  identifier: string;
  password: string;
}
const Login = () => {
 
 const [isLoading, setIsLoading] = useState(false);
   const[CreateAuthU]=useCreateAuthUMutation();
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });
const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  setIsLoading(true);

  try {
    await CreateAuthU({
      identifier: data.identifier,
      password: data.password,
    }).unwrap();

    toast.success("Welcome back 👋");

    // ❌ لا navigate هنا

  } catch (error: any) {
    toast.error(error?.data?.error?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};






  return (
     <Flex
              minH="100vh"
              align="center"
              justify="center"
              px={4}   // مهم للموبايل
            >
              <Card.Root  w="full" maxW="sm"   bg="#1f2937" boxShadow="0 20px 40px rgba(0,0,0,0.4)"
borderRadius="16px" borderColor={"#1f2937"}>
                <Card.Header color={"white"}>
                  <Card.Title>Login</Card.Title>
                  <Card.Description color={"white"}>
                    Fill in the form below to Login an account
                  </Card.Description>
                </Card.Header>
        
               <Card.Body>
  <form onSubmit={handleSubmit(onSubmit)}>
    <Stack gap="4">
      {Logins.map((Login, idx) => {
  const hasError = !!errors[Login.name];

  return (
    <Field.Root key={idx} color={"white"} invalid={hasError}>
      <Field.Label>{Login.Label}</Field.Label>

      <Input
        type={Login.type}
        placeholder={Login.placeholder}
        {...register(Login.name, Login.validation)}
        borderColor={hasError ? "red.500" : undefined}
        _focus={{
          borderColor: hasError ? "red.500" : "#1D2D44",
        }}
         _placeholder={{ color: "whiteAlpha.700" }}
      />

      {hasError && (
        <InputErrorMessage msg={errors[Login.name]?.message} />
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
      Login
    </Button>
  </form>
</Card.Body>

        
                <Card.Footer fontSize="sm"
opacity={0.8} justifyContent="flex-end" gap={2}>

                 <Text fontSize="sm" color={"white"} textAlign="center">
 Don’t have an account?{" "}
  <Link to="/register" style={{ color: "white" }}>
   register
  </Link>
</Text>
                 
                </Card.Footer>
              </Card.Root>
            </Flex>
  );
};

export default Login;
