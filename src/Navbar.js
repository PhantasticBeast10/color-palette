import React from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "./styles/NavbarStyles";


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { format: "hex", open: false };
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    handleFormatChange(e) {
        this.setState({ format: e.target.value, open: true });
        this.props.handleChange(e.target.value);
    }

    closeSnackbar() {
        this.setState({ open: false });
    }

    render() {
        const { level, changeLevel, showLevel, classes } = this.props;
        return (
            <header className={classes.navbar}>
                <div className={classes.logo}>
                    <Link to="/">reactcolourpicker</Link>
                </div>
                {showLevel && (
                    <div className="slider-container">
                        <span>Level : {level}</span>
                        <div className={classes.slider}>
                            <Slider
                                defaultValue={level}
                                min={100}
                                max={900}
                                step={100}
                                onAfterChange={changeLevel}
                            />
                        </div>
                    </div>
                )}
                <div className={classes.selectContainer}>
                    <Select
                        variant="standard"
                        value={this.state.format}
                        onChange={this.handleFormatChange}
                        autoWidth
                    >
                        <MenuItem value="hex">HEX - #FFFFFF</MenuItem>
                        <MenuItem value="rgb">
                            RGB - rgb(255, 255, 255)
                        </MenuItem>
                        <MenuItem value="rgba">
                            RGBA - rgba(255, 255, 255, 1)
                        </MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={
                        <span id="message-id">
                            Format Changed to {this.state.format.toUpperCase()}
                        </span>
                    }
                    ContentProps={{ "aria-describedby": "message-id" }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton
                            onClick={this.closeSnackbar}
                            color="inherit"
                            key="close"
                            aria-label="close"
                        >
                            <CloseIcon></CloseIcon>
                        </IconButton>,
                    ]}
                ></Snackbar>
            </header>
        );
    }
}

export default withStyles(styles)(Navbar);
