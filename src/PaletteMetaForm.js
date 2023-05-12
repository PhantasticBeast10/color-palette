import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { DialogContentText } from "@mui/material";
import Picker from "emoji-picker-react";

class PaletteMetaForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            newPaletteName: "",
            emoji: "",
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEmojiClick = this.handleEmojiClick.bind(this);
        this.onEmojiClick = this.onEmojiClick.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
            this.props.palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleClickOpen() {
        this.setState({ open: true });
    }
    handleClose() {
        this.setState({ open: false });
        this.props.hideForm();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleEmojiClick(emoji) {
        this.setState({ emoji: emoji.native });
        console.log(emoji.native);
    }

    onEmojiClick(e, emoji) {
        this.setState({ emoji: emoji.emoji });
    }

    render() {
        const { open, newPaletteName, emoji } = this.state;
        const { handleSubmit } = this.props;
        return (
            <div>
                <Dialog open={open} onClose={this.handleClose}>
                    <DialogTitle>Choose Palette Name</DialogTitle>
                    <ValidatorForm
                        onSubmit={() => handleSubmit(newPaletteName, emoji)}
                    >
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your AMAZING palette.
                                Make sure the name is UNIQUE.
                            </DialogContentText>
                            <TextValidator
                                style={{ display: "block" }}
                                fullWidth
                                margin="normal"
                                label="Palette Name"
                                variant="standard"
                                onChange={this.handleChange}
                                name="newPaletteName"
                                validators={["required", "isPaletteNameUnique"]}
                                errorMessages={[
                                    "Enter Palette Name",
                                    "Name Already Used!",
                                ]}
                                value={newPaletteName}
                            />
                            <TextValidator
                                style={{ display: "block" }}
                                fullWidth
                                margin="normal"
                                label="Emoji"
                                variant="standard"
                                name="newPaletteName"
                                disabled
                                validators={["required"]}
                                errorMessages={["Choose An Emoji"]}
                                value={emoji}
                            />
                            <Picker onEmojiClick={this.onEmojiClick} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Cancel</Button>
                            <Button
                                style={{ display: "block" }}
                                variant="contained"
                                color="success"
                                type="submit"
                            >
                                Save Palette
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}

export default PaletteMetaForm;
