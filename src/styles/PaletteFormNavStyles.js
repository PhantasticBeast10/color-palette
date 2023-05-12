import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

const drawerWidth = 400;

const Root = styled("div")(({ theme }) => ({
    display: "flex",
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px",
    backgroundColor: "white",
    color: "black",
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const NavBtns = styled("div")(({ theme }) => ({
    marginRight: "1rem"
}));

export { Root, AppBar, NavBtns };
