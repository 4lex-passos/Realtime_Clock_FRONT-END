import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",

        backgroundColor: "#fafafa",
    },

    // LEFT SIDE =======================================//

    formContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: theme.spacing(3),
        background: "none",

        padding: theme.spacing(4),

        width: 382,
        height: "50%",
    },

    formFields: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        minWidth: "100%",
        gap: theme.spacing(2),
    },

    formActions: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        gap: theme.spacing(2),
    },

    formLoader: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    formActionsButtons: {
        flex: 1,
    },

    logotype: {
        width: 165,
    },
}));
export default useStyles;
