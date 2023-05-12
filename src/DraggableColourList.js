import React from "react";
import DraggableColourBox from "./DraggableColourBox";
// import {
//     DndContext,
//     useSensor,
//     PointerSensor,
//     closestCenter,
// } from "@dnd-kit/core";
import {
    SortableContext,
    rectSortingStrategy,
    // arrayMove,
} from "@dnd-kit/sortable";

function DraggableColourList(props) {
    const { colours, deleteColour } = props;
    // const [items, setItems] = useState(colours);
    // const sensors = [useSensor(PointerSensor)];

    // function handleDragEnd(event) {
    //     const { active, over } = event;

    //     if (active.id !== over.id) {
    //         setItems((items) => {
    //             const oldIndex = items.indexOf(active.id);
    //             const newIndex = items.indexOf(over.id);

    //             return arrayMove(items, oldIndex, newIndex);
    //         });
    //     }
    // }

    return (
        <div style={{ height: "100%" }}>
            {/* <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            > */}
            <SortableContext
                items={colours.map((colour) => colour.name)}
                strategy={rectSortingStrategy}
            >
                {colours.map((colour) => (
                    <DraggableColourBox
                        key={colour.name}
                        {...colour}
                        handleDelete={() => deleteColour(colour.name)}
                    />
                ))}
            </SortableContext>
            {/* </DndContext> */}
        </div>
    );
}

export default DraggableColourList;
