import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#fafafa",
    },

    headerContainer: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
    },

    headerBox: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",

        gap: theme.spacing(1),

        backgroundColor: "#fafafa",
    },

    formContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: theme.spacing(3),
        background: "none",
    },

    formActionsButtons: {
        flex: 1,
    },

    timeText: {
        fontSize: 100,
        fontWeight: "bold",
    },

    dashboardActions: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: theme.spacing(2),
    },

    logotype: {
        width: 165,
    },
}));
export default useStyles;
