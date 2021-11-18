import { Avatar, Button, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";

import { io } from "socket.io-client";

function dashboard() {
    const socket = io("ws://localhost:3001/");

    socket.on("lockService", (data) => {
        alert(data.payload.message);
        setIsLocked(data.payload.isLocked);
    });

    socket.on("unlockService", (data) => {
        alert(data.payload.message);
        setIsLocked(data.payload.isLocked);
        setTimeShow("--:--");
    });

    socket.on("isLocked", (data) => {
        setIsLocked(data.payload.isLocked);
    });

    socket.on("bitTimeEvent", (data) => {
        setTimeShow(data.payload.time);
    });

    socket.on("connectionTimedOut", (data) => {
        setIsConnected(false);
        alert(data.payload.message);
    });

    const classes = useStyles();

    const [userInfo, setUserInfo] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [isLocked, setIsLocked] = useState(false);
    const [isConnected, setIsConnected] = useState(true);
    const [timeShow, setTimeShow] = useState("--:--");

    useEffect(() => {
        if (!isConnected) {
            onHandleLogout();
        }
    }, [isConnected]);

    useEffect(() => {
        if (!isConnected) {
            onHandleLogout();
        }

        socket.emit("isLocked", {
            command: "IsLocked",
            payload: {},
        });

        electron.authApi.updateUserInfo();
        electron.authApi.receiveUserInfo((storeUserInfo) => {
            setUserInfo(storeUserInfo);
        });

        electron.authApi.updateToken();
        electron.authApi.receiveToken((storeToken) => {
            setIsAuthenticated(storeToken);
        });
    }, []);

    const onHandleLogout = () => {
        electron.authApi.sendResetToken();
        electron.authApi.reloadWindow();
    };

    const onHandleLock = () => {
        socket.emit("lockService", {
            command: "LockService",
            payload: {
                token: isAuthenticated,
            },
        });
    };

    const onHandleUnlock = () => {
        socket.emit("unlockService", {
            command: "UnlockService",
            payload: {
                token: isAuthenticated,
            },
        });
    };

    return (
        <div className={classes.pageContainer}>
            <div className={classes.headerContainer}>
                <div className={classes.headerBox}>
                    <Avatar alt={userInfo?.name} src={userInfo?.avatar_URL} />
                    <Typography>{userInfo?.name}</Typography>
                </div>
            </div>
            <Paper elevation={0} className={classes.formContainer}>
                <Typography className={classes.timeText}>{timeShow}</Typography>
                <div className={classes.dashboardActions}>
                    {!isLocked ? (
                        <Button
                            variant="contained"
                            className={classes.formActionsButtons}
                            color="primary"
                            onClick={onHandleLock}
                        >
                            LOCK
                        </Button>
                    ) : null}

                    {isLocked ? (
                        <Button
                            variant="contained"
                            className={classes.formActionsButtons}
                            color="primary"
                            onClick={onHandleUnlock}
                        >
                            UNLOCK
                        </Button>
                    ) : null}

                    <Button
                        variant="contained"
                        className={classes.formActionsButtons}
                        color="primary"
                        onClick={onHandleLogout}
                    >
                        LOGOUT
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

export default dashboard;
