import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import "./ColourBox.css";
// import { withStyles } from "@mui/styles";

// const styles = {
//     copyText: {
//         color: (props) =>
//             chroma(props.background).luminance() >= 0.5
//                 ? "rgba(0, 0, 0, 0.5)"
//                 : "#fff",
//     },
//     colourName: {
//         color: (props) =>
//             chroma(props.background).luminance() <= 0.2 ? "black" : "white",
//     },
// };

class ColourBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { copied: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        });
    }

    render() {
        const {
            name,
            background,
            paletteId,
            id,
            showMore,
            // classes,
        } = this.props;
        const isDarkColour = chroma(background).luminance() <= 0.2;
        const isLightColour = chroma(background).luminance() >= 0.5;

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className="ColourBox">
                    <div
                        className={`copy-overlay ${this.state.copied &&
                            "show"}`}
                        style={{ background }}
                    ></div>
                    <div className={`copy-msg ${this.state.copied && "show"}`}>
                        <h1>copied!</h1>
                        <p className={`${isLightColour && "dark-text"}`}>
                            {this.props.background}
                        </p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={`${isDarkColour && "light-text"}`}>{name}</span>
                        </div>
                        <button
                            className={`copy-button ${isLightColour &&
                                "dark-text"}`}
                        >
                            Copy
                        </button>
                        {showMore && (
                            <Link
                                to={`/palette/${paletteId}/${id}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <span
                                    className={`see-more ${isLightColour &&
                                        "dark-text"}`}
                                >
                                    More
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </CopyToClipboard>
        );
    }
}

// export default withStyles(styles)(ColourBox);
export default ColourBox;
