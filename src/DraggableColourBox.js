import React from "react";
import { withStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const styles = {
    colourBox: {
        width: "20%",
        height: "25vh",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        textTransform: "uppercase",
        marginBottom: "-3.5px",
        "&:hover svg": {
            color: "#fff",
            transform: "scale(1.2)",
        },
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0",
        bottom: "0",
        padding: "10px",
        color: "rgba(0, 0, 0, 0.5)",
        letterSpacing: "1px",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between",
    },
    deleteIcon: {
        transition: "0.2s ease-in-out",
    },
};

function DraggableColourBox(props) {
    const { colour, name, classes, handleDelete } = props;
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: name });
    const style = {
        transform: CSS.Transform.toString(transform),
        backgroundColor: colour,
        transition,
    };
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={classes.colourBox}
            style={style}
        >
            <div className={classes.boxContent}>
                <span>{name}</span>
                <span>
                    <DeleteIcon
                        className={classes.deleteIcon}
                        onClick={handleDelete}
                    />
                </span>
            </div>
        </div>
    );
}

export default withStyles(styles)(DraggableColourBox);
