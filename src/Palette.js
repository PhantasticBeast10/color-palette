import React from "react";
import ColourBox from "./ColourBox";
import "./ColourBox.css";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@mui/styles";
import styles from "./styles/PaletteStyles";

class Palette extends React.Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: "hex" };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
        this.findPalette = this.findPalette.bind(this);
    }

    changeLevel(level) {
        this.setState({ level });
    }

    changeFormat(val) {
        this.setState({ format: val });
    }

    findPalette(id) {
        this.props.colourPalettes.find((palette) => palette.id === id);
    }

    render() {
        const { classes } = this.props;
        const { colours, paletteName, emoji, id } = this.props.palette;
        const { level, format } = this.state;
        const colourBoxes = colours[level].map((c) => (
            <ColourBox
                background={c[format]}
                name={c.name}
                id={c.id}
                key={c.id}
                paletteId={id}
                showMore={true}
            />
        ));
        return (
            <div className={classes.palette}>
                <Navbar
                    showLevel={true}
                    level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                />
                <div className={classes.paletteColours}>{colourBoxes}</div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(Palette);
