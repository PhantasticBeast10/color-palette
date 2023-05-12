import React from "react";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DraggableColourList from "./DraggableColourList";
// import { ChromePicker } from "react-color";
import { Button } from "@mui/material";
// import { Link } from "react-router-dom";
// import { ValidatorForm } from "react-material-ui-form-validator";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    closestCenter,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import PaletteFormNav from "./PaletteFormNav";
import ColourPickerForm from "./ColourPickerForm";
import { withStyles } from "@mui/styles";
import {
    Main,
    DrawerHeader,
    ColourPickerContainer,
    ColourPickerBtns,
    styles,
} from "./styles/NewPaletteFormStyles";

const drawerWidth = 400;
// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//     ({ theme, open }) => ({
//         flexGrow: 1,
//         padding: theme.spacing(3),
//         transition: theme.transitions.create("margin", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//         marginLeft: `-${drawerWidth}px`,
//         ...(open && {
//             transition: theme.transitions.create("margin", {
//                 easing: theme.transitions.easing.easeOut,
//                 duration: theme.transitions.duration.enteringScreen,
//             }),
//             marginLeft: 0,
//         }),
//     })
// );

// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//     transition: theme.transitions.create(["margin", "width"], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//         width: `calc(100% - ${drawerWidth}px)`,
//         marginLeft: `${drawerWidth}px`,
//         transition: theme.transitions.create(["margin", "width"], {
//             easing: theme.transitions.easing.easeOut,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     }),
// }));

// const DrawerHeader = styled("div")(({ theme }) => ({
//     display: "flex",
//     alignItems: "center",
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: "flex-end",
// }));

class NewPaletteForm extends React.Component {
    static defaultProps = { maxColours: 20 };
    constructor(props) {
        super(props);
        this.state = {
            colours: this.props.palettes[0].colours,
            currentColour: "#880880",
            newColourName: "purple",
            drawerOpen: false,
            // newPaletteName: "",
        };
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.updateCurrentColour = this.updateCurrentColour.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addColour = this.addColour.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteColour = this.deleteColour.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.addRandomColour = this.addRandomColour.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
    }
    // componentDidMount() {
    //     ValidatorForm.addValidationRule("isColourNameUnique", (value) =>
    //         this.state.colours.every(
    //             ({ name }) => name.toLowerCase() !== value.toLowerCase()
    //         )
    //     );
    //     ValidatorForm.addValidationRule("isColourUnique", (value) =>
    //         this.state.colours.every(
    //             ({ colour }) => colour !== this.state.currentColour
    //         )
    //     );
    //     ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
    //         this.props.palettes.every(
    //             ({ paletteName }) =>
    //                 paletteName.toLowerCase() !== value.toLowerCase()
    //         )
    //     );
    // }
    handleDrawerOpen = () => {
        this.setState({ drawerOpen: true });
    };
    handleDrawerClose = () => {
        this.setState({ drawerOpen: false });
    };

    updateCurrentColour(newColour) {
        this.setState({ currentColour: newColour.hex });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addColour(newColour) {
        // const newColour = {
        //     colour: this.state.currentColour,
        //     name: this.state.newColourName,
        // };
        this.setState({
            colours: [...this.state.colours, newColour],
            newColourName: "",
        });
    }

    handleSubmit(newPaletteName, emoji) {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            colours: this.state.colours,
            emoji: emoji,
        };
        this.props.savePalette(newPalette);
    }

    deleteColour(colourName) {
        this.setState({
            colours: this.state.colours.filter(
                (colour) => colour.name !== colourName
            ),
        });
    }

    clearPalette() {
        this.setState({ colours: [] });
    }

    addRandomColour() {
        const allColours = this.props.palettes.map((p) => p.colours).flat();
        let rand = Math.floor(Math.random() * allColours.length);
        this.setState({ colours: [...this.state.colours, allColours[rand]] });
    }

    handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            //console.log(active.id);
            const oldIndex = this.state.colours.findIndex(
                (colour) => colour.name === active.id
            );
            const newIndex = this.state.colours.findIndex(
                (colour) => colour.name === over.id
            );
            this.setState(({ colours }) => ({
                colours: arrayMove(colours, oldIndex, newIndex),
            }));
        }
    }

    render() {
        const { colours, drawerOpen } = this.state;
        const { maxColours, palettes, classes } = this.props;
        const paletteIsFull = this.state.colours.length >= maxColours;
        const DndContainer = () => {
            const sensors = useSensors(
                useSensor(PointerSensor, {
                    activationConstraint: {
                        delay: 100,
                    },
                }),
                useSensor(KeyboardSensor, {
                    coordinateGetter: sortableKeyboardCoordinates,
                })
            );
            return (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={this.handleDragEnd}
                >
                    <DraggableColourList
                        colours={colours}
                        deleteColour={this.deleteColour}
                    />
                </DndContext>
            );
        };
        return (
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <PaletteFormNav
                    open={drawerOpen}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                        display: "flex",
                        alignItems: "center",
                    }}
                    variant="persistent"
                    anchor="left"
                    open={drawerOpen}
                >
                    <DrawerHeader>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <ColourPickerContainer>
                        <Typography variant="h4" gutterBottom>
                            Design Your Palette
                        </Typography>
                        <ColourPickerBtns>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.clearPalette}
                                className={classes.button}
                            >
                                Clear Palette
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.addRandomColour}
                                disabled={paletteIsFull}
                                className={classes.button}
                            >
                                Random Colour
                            </Button>
                            {/* <ChromePicker
                        color={currentColour}
                        onChangeComplete={this.updateCurrentColour}
                    />
                    <ValidatorForm onSubmit={this.addColour}>
                        <TextValidator
                            label="Colour Name"
                            variant="standard"
                            onChange={this.handleChange}
                            name="newColourName"
                            validators={[
                                "required",
                                "isColourNameUnique",
                                "isColourUnique",
                            ]}
                            errorMessages={[
                                "Enter Colour Name",
                                "Colour Name Must Be Unique!",
                                "Colour Already Added!",
                            ]}
                            value={newColourName}
                        />
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: paletteIsFull
                                    ? "grey"
                                    : currentColour,
                            }}
                            type="submit"
                            disabled={paletteIsFull}
                        >
                            Add Colour
                        </Button>
                    </ValidatorForm> */}
                            <ColourPickerForm
                                paletteIsFull={paletteIsFull}
                                addColour={this.addColour}
                                colours={colours}
                            />
                        </ColourPickerBtns>
                    </ColourPickerContainer>
                </Drawer>
                <Main open={drawerOpen}>
                    <DrawerHeader />
                    <DndContainer />
                    {/* <DraggableColourList
                            colours={colours}
                            deleteColour={this.deleteColour}
                        /> */}{" "}
                </Main>
            </Box>
        );
    }
}

export default withStyles(styles)(NewPaletteForm);
