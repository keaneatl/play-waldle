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
  AlertTitle,
  Box,
  Button,
  styled,
} from "@mui/material";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";
import setUsers from "../components/helpers/backend/setUsers";
import Link from "next/link";

const Auth: NextPage = () => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAlert = (errorMessage?: string) => {
    if (errorMessage) {
      setErrorMessage(
        errorMessage.replace("Firebase: ", "").replace("auth/", "")
      );
    }
    setShowAlert(true);
  };

  const handleGoogleLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(authentication, googleProvider);
      handleAlert();

      const user = result.user;
      setUsers(user);
      router.push("/");
    } catch (error: any) {
      handleAlert(error.message);
    }
  };
  const handlePlayAsGuest = async () => {
    try {
      await signInAnonymously(authentication);
      handleAlert();
      router.push("/");
    } catch (error: any) {
      handleAlert(error.message);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      handleAlert();

      const user = userCredential.user;
      setUsers(user);
      router.push("/");
    } catch (error: any) {
      handleAlert(error.message);
    }
  };

  return (
    <FormContainer>
      <LockedIcon>
        <LockOutlined htmlColor="black" />
      </LockedIcon>
      <Typography component="h1" variant="h5">
        Sign In
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
        {showAlert && (
          <AlertLabel severity={errorMessage ? "error" : "success"}>
            <AlertTitle>{errorMessage || "Sign in successful"}</AlertTitle>
          </AlertLabel>
        )}
        <SubmitButton type="submit" variant="contained" fullWidth>
          Sign in
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
      <Typography>
        Don&apos;t have an account?{" "}
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </Typography>
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
  margin: 10px;
`;

const AlertLabel = styled(Alert)`
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
