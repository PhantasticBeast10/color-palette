import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import seedColours from "./seedColours";
import PaletteList from "./PaletteList";
import { Route, Routes } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm";
import { useState } from "react";
import Palette from "./Palette";
import SingleColourPalette from "./SingleColourPalette";
import { generatePalette } from "./colourHelpers";

// ****************************************

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         const savedPalettes = JSON.parse(
//             window.localStorage.getItem("palettes")
//         );
//         this.state = {
//             colourPalettes: savedPalettes || seedColours,
//         };
//         this.findPalette = this.findPalette.bind(this);
//         this.savePalette = this.savePalette.bind(this);
//         this.syncLocalStorage = this.syncLocalStorage.bind(this);
//     }

//     savePalette(palette) {
//         this.setState(
//             {
//                 colourPalettes: [...this.state.colourPalettes, palette],
//             },
//             this.syncLocalStorage
//         );
//     }

//     syncLocalStorage() {
//         window.localStorage.setItem(
//             "palettes",
//             JSON.stringify(this.state.colourPalettes)
//         );
//     }

//     findPalette(id) {
//         return this.state.colourPalettes.find(function (palette) {
//             return palette.id === id;
//         });
//     }

//     render() {
//         const { colourPalettes } = this.state;
//         const PaletteWrapper = () => {
//             const { id } = useParams();
//             return <Palette palette={generatePalette(this.findPalette(id))} />;
//         };
//         const SingleColourPaletteWrapper = () => {
//             const { paletteId, colourId } = useParams();
//             return (
//                 <SingleColourPalette
//                     palette={generatePalette(this.findPalette(paletteId))}
//                     colourId={colourId}
//                 />
//             );
//         };

//         return (
//             <Routes>
//                 <Route
//                     exact
//                     path="/"
//                     element={<PaletteList palettes={colourPalettes} />}
//                 ></Route>
//                 <Route
//                     exact
//                     path="/palette/new"
//                     element={
//                         <NewPaletteForm
//                             savePalette={this.savePalette}
//                             palettes={colourPalettes}
//                         />
//                     }
//                 ></Route>
//                 <Route
//                     exact
//                     path="/palette/:id"
//                     element={<PaletteWrapper />}
//                     // render={(routeProps) => (
//                     //     <Palette
//                     //     palette={generatePalette(
//                     //       this.findPalette(routeProps.match.params.id)
//                     //     )}
//                     //   />
//                     // )}
//                 ></Route>
//                 <Route
//                     exact
//                     path="/palette/:paletteId/:colourId"
//                     element={<SingleColourPaletteWrapper />}
//                 ></Route>
//             </Routes>
//             // <div className="App">
//             //     <Palette palette={generatePalette(seedColours[4])} />
//             // </div>
//         );
//     }
// }

// ************************************************

function App() {
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    const [colourPalettes, setColourPalettes] = useState(
        savedPalettes || seedColours
    );
    const navigate = useNavigate();

    const savePalette = (palette) => {
        setColourPalettes([...colourPalettes, palette]);
        syncLocalStorage();
        navigate("/");
    };

    const syncLocalStorage = () => {
        window.localStorage.setItem(
            "palettes",
            JSON.stringify(colourPalettes)
        );
    };

    const findPalette = (id) => {
        return colourPalettes.find(function (palette) {
            return palette.id === id;
        });
    };

    const deletePalette = (id) => {
        setColourPalettes(colourPalettes.filter(palette => palette.id !== id));
        syncLocalStorage();
        navigate("/");
    }

    const PaletteWrapper = () => {
        const { id } = useParams();
        return <Palette palette={generatePalette(findPalette(id))} />;
    };

    const SingleColourPaletteWrapper = () => {
        const { paletteId, colourId } = useParams();
        return (
            <SingleColourPalette
                palette={generatePalette(findPalette(paletteId))}
                colourId={colourId}
            />
        );
    };

    return (
        <Routes>
            <Route
                exact
                path="/"
                element={<PaletteList palettes={colourPalettes} deletePalette={deletePalette}/>}
            ></Route>
            <Route
                exact
                path="/palette/new"
                element={
                    <NewPaletteForm
                        savePalette={savePalette}
                        palettes={colourPalettes}
                    />
                }
            ></Route>
            <Route
                exact
                path="/palette/:id"
                element={<PaletteWrapper />}
            ></Route>
            <Route
                exact
                path="/palette/:paletteId/:colourId"
                element={<SingleColourPaletteWrapper />}
            ></Route>
        </Routes>
    );
}

export default App;
