import React from "react";
import MiniPalette from "./MiniPalette";
// import "./PaletteList.css";
import { withStyles } from "@mui/styles";
import styles from "./styles/PaletteListStyles";
import { Link } from "react-router-dom";

class PaletteList extends React.Component {
    goToPalette(id) {
        this.props.history.push("/palette" + id);
    }
    render() {
        const { palettes, classes, deletePalette } = this.props;
        return (
            <div className={classes.paletteList}>
                <div className={classes.plContainer}>
                    <nav className={classes.plNav}>
                        <h1>Palette List</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <div className={classes.plPalettes}>
                        {palettes.map((palette) => (
                            <MiniPalette
                                {...palette}
                                handleClick={() => this.goToPalette(palette.id)}
                                key={palette.id}
                                deletePalette={() => deletePalette(palette.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);
