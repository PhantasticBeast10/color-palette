import React from "react";
import { ChromePicker } from "react-color";
import { Button } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import styles from "./styles/ColourPickerFormStyles";
import { withStyles } from "@mui/styles";

class ColourPickerForm extends React.Component {
    componentDidMount() {
        ValidatorForm.addValidationRule("isColourNameUnique", (value) =>
            this.props.colours.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("isColourUnique", (value) =>
            this.props.colours.every(
                ({ colour }) => colour !== this.state.currentColour
            )
        );
    }
    constructor(props) {
        super(props);
        this.state = {
            currentColour: "#880880",
            newColourName: "purple",
        };
        this.updateCurrentColour = this.updateCurrentColour.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateCurrentColour(newColour) {
        this.setState({ currentColour: newColour.hex });
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit() {
        const newColour = {
            colour: this.state.currentColour,
            name: this.state.newColourName,
        };
        this.props.addColour(newColour);
        this.setState({
            newColourName: "",
        });
    }
    render() {
        const { currentColour, newColourName } = this.state;
        const { paletteIsFull, classes } = this.props;
        return (
            <div>
                <ChromePicker
                    color={currentColour}
                    onChangeComplete={this.updateCurrentColour}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                    className={classes.colourNameInput}
                        label="Colour Name"
                        variant="filled"
                        margin="normal"
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
                        className={classes.addColour}
                        variant="contained"
                        style={{
                            backgroundColor: paletteIsFull
                                ? "grey"
                                : currentColour,
                        }}
                        type="submit"
                        disabled={paletteIsFull}
                    >
                        {paletteIsFull ? "Palette Full" : "Add Colour"}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default withStyles(styles)(ColourPickerForm);
