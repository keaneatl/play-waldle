import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { LockOutlined, Google, AccountCircle } from "@mui/icons-material";
import { authentication } from "../firebase/app";
import {
  Typography,
  TextField,
  Avatar,
  Container,
  Alert,
  Box,
  Button,
  styled,
} from "@mui/material";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Auth: NextPage = () => {
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Unknown");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleError = (errorMessage: string) => {
    setErrorMessage(
      errorMessage.replace("Firebase: ", "").replace("auth/", "")
    );
    errorMessage ? setShowError(true) : setShowError(false);
  };

  const handleGoogleLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(authentication, googleProvider);
      router.push("/");
    } catch (error: any) {
      handleError(error.message);
    }
  };
  const handlePlayAsGuest = async () => {
    try {
      await signInAnonymously(authentication);
      router.push("/");
    } catch (error: any) {
      handleError(error.message);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(authentication, email, password);
      router.push("/");
    } catch (error: any) {
      handleError(error.message);
    }
  };

  return (
    <FormContainer>
      <LockedIcon>
        <LockOutlined htmlColor="black" />
      </LockedIcon>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Form component="form" onSubmit={(e) => handleSubmit(e)}>
        <InputField
          required
          autoFocus
          fullWidth
          type="email"
          autoComplete="email"
          label="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {showError && <ErrorLabel severity="error">{errorMessage}</ErrorLabel>}
        <SubmitButton type="submit" variant="contained" fullWidth>
          Sign Up
        </SubmitButton>
        <GoogleSignInBtn
          startIcon={<Google />}
          onClick={handleGoogleLogin}
          variant="contained"
        >
          Continue with Google
        </GoogleSignInBtn>
        <SignInAsGuestBtn
          startIcon={<AccountCircle />}
          onClick={handlePlayAsGuest}
          variant="contained"
        >
          Play as Guest
        </SignInAsGuestBtn>
      </Form>
    </FormContainer>
  );
};

export default Auth;

const LockedIcon = styled(Avatar)`
  margin: 10px 0 20px 0;
`;

const FormContainer = styled(Container)`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
`;

const Form = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const InputField = styled(TextField)`
  margin: 20px;
`;

const ErrorLabel = styled(Alert)`
  width: 100%;
  margin-bottom: 20px;
`;

const SubmitButton = styled(Button)`
  height: 50px;
  width: 80%;
`;

const GoogleSignInBtn = styled(SubmitButton)`
  margin-top: 15px;
`;

const SignInAsGuestBtn = styled(GoogleSignInBtn)`
  margin-bottom: 25px;
`;
