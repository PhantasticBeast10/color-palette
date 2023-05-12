const styles = {
    paletteList: {
        backgroundColor: "blue",
        height: "90vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    plContainer: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    plNav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        alignItems: "center",
        "& a": {
            color: "white",
            textDecoration: "none"
        }
    },
    plPalettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%",
    },
};

export default styles;
