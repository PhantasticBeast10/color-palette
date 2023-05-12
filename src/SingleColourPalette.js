import React from "react";
import { Link } from "react-router-dom";
import ColourBox from "./ColourBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@mui/styles";
import styles from "./styles/PaletteStyles"

class SingleColourPalette extends React.Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(
            this.props.palette,
            this.props.colourId
        );
        this.state = {
            format: "hex",
        };
        this.changeFormat = this.changeFormat.bind(this);
    }
    gatherShades(palette, colour) {
        let shades = [];
        let allColours = palette.colours;

        for (let key in allColours) {
            shades = shades.concat(
                allColours[key].filter((c) => c.id === colour)
            );
        }
        return shades.slice(1);
    }
    changeFormat(val) {
        this.setState({ format: val });
    }
    render() {
        const { format } = this.state;
        const { classes } = this.props;
        const { paletteName, emoji, id } = this.props.palette;
        const colourBoxes = this._shades.map((colour) => (
            <ColourBox
                key={colour.name}
                name={colour.name}
                background={colour[format]}
                showMore={false}
            />
        ));
        return (
            <div className={`${classes.palette} SingleColourPalette`}>
                <Navbar showLevel={false} handleChange={this.changeFormat} />
                <div className={classes.paletteColours}>
                    {colourBoxes}
                    <div className={classes.goBack}>
                        <Link
                            to={`/palette/${id}`}
                            className={classes.backButton}
                        >
                            Go Back
                        </Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(SingleColourPalette);
