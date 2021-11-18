import React, { useEffect, useState } from "react";
import {
    Paper,
    Box,
    TextField,
    InputAdornment,
    Button,
    CircularProgress,
} from "@material-ui/core";

import { AccountCircle, Drafts, Lock } from "@material-ui/icons";

import useStyles from "./styles";
import Dashboard from "../Dashboard/dashboard";

var BASE_URL = "https://my-first-api-rest-node.herokuapp.com";

function AuthPage() {
    const classes = useStyles();

    const [userInfo, setUserInfo] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const [isProcessing, setIsProcessing] = useState(false);
    const [loginOrSignUp, setLoginOrSignUp] = useState("LOGIN");

    const [userEmail, setUserEmail] = useState("momonga@sama.com");
    const [userPassword, setUserPassword] = useState("Admin@123");

    const [registerName, setRegisterName] = useState("Ainz Ooal Gown");
    const [registerEmail, setRegisterEmail] = useState("momonga@sama.com");
    const [registerPassword, setRegisterPassword] = useState("Admin@123");
    const [confirmPassword, setConfirmPassword] = useState("Admin@123");
    const [profilePic, setProfilePic] = useState(
        "http://pm1.narvii.com/6453/2b0de59627d9a79d2644f5ae530b09c35c1daefd_00.jpg"
    );

    const signInBody = {
        email: userEmail,
        password: userPassword,
    };

    const signUpBody = {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        avatar_URL: profilePic,
    };

    useEffect(() => {
        electron.authApi.updateToken();

        electron.authApi.receiveToken((setToken) => {
            setIsAuthenticated(setToken);
        });
    }, []);

    const SignIn = async () => {
        setIsProcessing(true);

        await fetch(`${BASE_URL}/auth/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(signInBody),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    alert(res.message);
                } else {
                    electron.authApi.sendToken(res.token);

                    electron.authApi.receiveToken((setToken) => {
                        setIsAuthenticated(setToken);
                    });

                    electron.authApi.sendUserInfo(res.user);

                    electron.authApi.receiveUserInfo((storeUserInfo) => {
                        setUserInfo(storeUserInfo);
                    });
                }
            });

        setIsProcessing(false);
    };

    const SignUp = async () => {
        setIsProcessing(true);
        await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(signUpBody),
        })
            .then((res) => res.json())
            .then((res) => {
                electron.authApi.reloadWindow();
            });

        setIsProcessing(false);
    };

    //ERRROS MANAGEMENTS ==========================================//
    const loginErrorManagment = () => {
        if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userEmail) ||
            userEmail.length > 60
        ) {
            return true;
        }
    };

    const registerErrorManagment = () => {
        if (
            !/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑnull ]{3,50}$/i.test(
                registerName.trim()
            )
        ) {
            return true;
        }

        if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(registerEmail) ||
            registerEmail.length > 60
        ) {
            return true;
        }

        if (
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%!?.])[0-9a-zA-Z$*%&@#!?.]{8,32}$/.test(
                registerPassword
            )
        ) {
            return true;
        }

        if (
            confirmPassword.length === 0 ||
            confirmPassword !== registerPassword
        ) {
            return true;
        }
    };

    return (
        <div className={classes.pageContainer}>
            <Paper elevation={0} className={classes.formContainer}>
                {/* LOGIN CONTAINER  ==========================================*/}

                {isAuthenticated ? <Dashboard /> : null}

                {!isAuthenticated && loginOrSignUp === "LOGIN" ? (
                    <>
                        <img
                            src="https://i.ibb.co/ngZ0Tqf/logotype.png"
                            alt="logotype"
                            className={classes.logotype}
                        />

                        <Box className={classes.formFields}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                variant="outlined"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Drafts color="primary" />
                                        </InputAdornment>
                                    ),

                                    classes: {
                                        input: classes.textField,
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                type="password"
                                label="Senha"
                                variant="outlined"
                                value={userPassword}
                                onChange={(e) =>
                                    setUserPassword(e.target.value)
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="primary" />
                                        </InputAdornment>
                                    ),

                                    classes: {
                                        input: classes.textField,
                                    },
                                }}
                            />
                        </Box>

                        <Box className={classes.formActions}>
                            {!isProcessing ? (
                                <>
                                    <Button
                                        variant="outlined"
                                        className={classes.formActionsButtons}
                                        color="primary"
                                        onClick={() => {
                                            setLoginOrSignUp("SIGNUP");
                                        }}
                                    >
                                        CADASTRAR
                                    </Button>

                                    <Button
                                        disabled={loginErrorManagment()}
                                        variant="contained"
                                        className={classes.formActionsButtons}
                                        color="primary"
                                        onClick={SignIn}
                                    >
                                        ENTRAR
                                    </Button>
                                </>
                            ) : (
                                <div className={classes.formLoader}>
                                    <CircularProgress />
                                </div>
                            )}
                        </Box>
                    </>
                ) : null}

                {/* SIGN UP CONTAINER  ==========================================*/}

                {!isAuthenticated && loginOrSignUp === "SIGNUP" ? (
                    <>
                        <img
                            src="https://i.ibb.co/ngZ0Tqf/logotype.png"
                            alt="logotype"
                            className={classes.logotype}
                        />
                        <Box className={classes.formFields}>
                            <TextField
                                fullWidth
                                label="Nome"
                                variant="outlined"
                                value={registerName}
                                onChange={(e) =>
                                    setRegisterName(e.target.value)
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle color="primary" />
                                        </InputAdornment>
                                    ),

                                    classes: {
                                        input: classes.textField,
                                    },
                                }}
                                error={
                                    !/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑnull ]{3,50}$/i.test(
                                        registerName.trim()
                                    )
                                }
                                helperText={
                                    "Deve conter pelo menos 3 caracteres e ser composto apenas por letras."
                                }
                            />

                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                variant="outlined"
                                value={registerEmail}
                                onChange={(e) =>
                                    setRegisterEmail(e.target.value)
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Drafts color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                                error={
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                                        registerEmail
                                    ) || registerEmail.length > 60
                                }
                                helperText="Necessário ser um e-mail válido."
                            />

                            <TextField
                                fullWidth
                                type="password"
                                label="Senha"
                                variant="outlined"
                                value={registerPassword}
                                onChange={(e) =>
                                    setRegisterPassword(e.target.value)
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                                error={
                                    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%!?.])[0-9a-zA-Z$*%&@#!?.]{8,32}$/.test(
                                        registerPassword
                                    )
                                }
                                helperText="Deve conter 8 caracteres ou mais, ao menos uma letra maiúscula e minúscula, um caractere especial e um dígito numérico."
                            />

                            <TextField
                                fullWidth
                                type="password"
                                label="Confirmar Senha"
                                variant="outlined"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                                error={
                                    confirmPassword.length === 0 ||
                                    confirmPassword !== registerPassword
                                }
                                helperText="Confime sua senha"
                            />
                        </Box>
                        <Box className={classes.formActions}>
                            {!isProcessing ? (
                                <>
                                    <Button
                                        variant="outlined"
                                        className={classes.formActionsButtons}
                                        color="primary"
                                        onClick={() => {
                                            setLoginOrSignUp("LOGIN");
                                        }}
                                    >
                                        LOGIN
                                    </Button>

                                    <Button
                                        variant="contained"
                                        className={classes.formActionsButtons}
                                        color="primary"
                                        disabled={registerErrorManagment()}
                                        onClick={SignUp}
                                    >
                                        REGISTRAR
                                    </Button>
                                </>
                            ) : (
                                <div className={classes.formLoader}>
                                    <CircularProgress />
                                </div>
                            )}
                        </Box>
                    </>
                ) : null}
            </Paper>
        </div>
    );
}

export default AuthPage;
