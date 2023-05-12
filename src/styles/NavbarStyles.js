const styles = {
    navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "6vh",
    },
    logo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "22px",
        backgroundColor: "#cacaca",
        height: "100%",
        "& a": {
            textDecoration: "none",
            color: "white",
        },
    },
    slider: {
        width: "400px",
        margin: "0 20px",
        display: "inline-block",
        "& .rc-slider-rail": {
            height: "80%",
        },
        "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover": {
            backgroundColor: "green",
            outline: "none",
            border: "2px solid green",
            boxShadow: "none",
            width: "15px",
            height: "15px",
            marginTop: "-2px",
        },
        "& .rc-slider-track": {
            backgroundColor: "transparent",
        },
    },
    selectContainer: {
        marginLeft: "auto",
        marginRight: "1rem",
    },
};

export default styles;