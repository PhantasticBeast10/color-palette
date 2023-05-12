import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Typography, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { Root, AppBar, NavBtns } from "./styles/PaletteFormNavStyles";
import PaletteMetaForm from "./PaletteMetaForm";

class PaletteFormNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formShowing: false,
        };
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    showForm() {
        this.setState({ formShowing: true });
    }

    hideForm() {
        this.setState({ formShowing: false });
    }

    render() {
        const { open, palettes, handleSubmit } = this.props;
        return (
            <Root>
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerOpen}
                            edge="start"
                            sx={{
                                mr: 2,
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Create New Palette
                        </Typography>
                    </Toolbar>
                    <NavBtns>
                        <Link style={{ textDecoration: "none" }} to="/">
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ margin: "0 1rem" }}
                            >
                                All Palettes
                            </Button>
                        </Link>
                        <Button
                            variant="contained"
                            onClick={this.showForm}
                            color="success"
                        >
                            Save
                        </Button>
                        {this.state.formShowing && (
                            <PaletteMetaForm
                                palettes={palettes}
                                handleSubmit={handleSubmit}
                                hideForm={this.hideForm}
                            />
                        )}
                    </NavBtns>
                </AppBar>
            </Root>
        );
    }
}

export default PaletteFormNav;
