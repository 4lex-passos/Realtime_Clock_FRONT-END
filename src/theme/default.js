import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#09c89f",
            light: "#76ead1",
            dark: "#2b7a69",
        },
        secondary: {
            main: "#fcf379",
            dark: "#a08640",
        },

        warning: {
            main: "#ff7c7c",
            dark: "#b44545",
        },

        text: {
            primary: "#333333",
            secondary: "#aeaeae",
            hint: "#cad0d9",
        },

        background: {
            default: "#282828",
            light: "#F3F5FF",
            dark: "#282828",
        },
    },

    overrides: {
        MuiFormLabel: {
            root: {
                "&:before": {
                    borderBottomColor: "primary",
                },
                "&:after": {
                    borderBottomColor: "primary",
                },
                "&:hover:before": {
                    borderBottomColor: "primary",
                },
            },
        },
    },
});
export default theme;
