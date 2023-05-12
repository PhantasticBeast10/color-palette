import React from "react";
import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import styles from "./styles/MiniPaletteStyles";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function MiniPalette({ children, ...props }) {
    const { paletteName, emoji, colours, id, classes, deletePalette } = props;

    const miniColourBoxes = colours.map((colour) => (
        <div
            className={classes.miniColour}
            style={{ backgroundColor: colour.colour }}
            key={colour.name}
        ></div>
    ));

    const history = useNavigate();

    const handleRedirect = () => {
        history(`/palette/${id}`);
    };

    return (
        <div className={classes.root}>
            <Button onClick={deletePalette}>
                <DeleteIcon />
            </Button>
            <div onClick={handleRedirect}>
                <div className={classes.colours}>{miniColourBoxes}</div>
                <h5 className={classes.title}>
                    {paletteName} <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        </div>
    );
}

export default withStyles(styles)(MiniPalette);
