exports.__esModule = true;
var React = require("react");
require("./SummaryTab.css");
var Card_1 = require("@material-ui/core/Card");
var CardContent_1 = require("@material-ui/core/CardContent");
var CardMedia_1 = require("@material-ui/core/CardMedia");
var Typography_1 = require("@material-ui/core/Typography");
var Radio_1 = require("@material-ui/core/Radio");
var RadioGroup_1 = require("@material-ui/core/RadioGroup");
var FormControlLabel_1 = require("@material-ui/core/FormControlLabel");
var FormControl_1 = require("@material-ui/core/FormControl");
var SummaryTab = function (props) {
    return (React.createElement("div", { className: "SummaryTab", "data-testid": "SummaryTab" },
        props.vmDetails.name !== undefined ?
            (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: "2%" } },
                    React.createElement("div", { style: { fontSize: "1.5rem" } },
                        React.createElement("b", null, "Image")),
                    React.createElement("div", { style: { color: "blue" }, onClick: function (event) { return props.handleTabChange(event, 0); } },
                        React.createElement("b", null, "EDIT"))),
                React.createElement(Card_1["default"], { className: "vmCard", style: { marginBottom: "2%" } },
                    React.createElement(CardMedia_1["default"], { className: "cardImage", image: props.vmDetails.image, title: props.vmDetails.name }),
                    React.createElement(CardContent_1["default"], { className: "vmCardContent" },
                        React.createElement("h3", null, props.vmDetails.name),
                        React.createElement(Typography_1["default"], { color: "textSecondary", gutterBottom: true }, props.vmDetails.description)),
                    React.createElement(CardContent_1["default"], { className: "vmCardRadioButton" },
                        React.createElement(FormControl_1["default"], { component: "fieldset" },
                            React.createElement(RadioGroup_1["default"], { "aria-label": props.vmDetails.name, name: props.vmDetails.name, value: props.vmDetails.type },
                                React.createElement(FormControlLabel_1["default"], { value: props.vmDetails.type, control: React.createElement(Radio_1["default"], null), label: props.vmDetails.type }))))))) : null,
        props.vmDetails.optimized !== undefined ?
            (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: "2%", width: "40%" } },
                    React.createElement("div", { style: { fontSize: "1.5rem" } },
                        React.createElement("b", null, "Instance")),
                    React.createElement("div", { style: { color: "blue" }, onClick: function (event) { return props.handleTabChange(event, 1); } },
                        React.createElement("b", null, "EDIT"))),
                React.createElement(Card_1["default"], { style: { marginBottom: "2%", width: "40%", display: 'flex', flexDirection: 'column' } },
                    React.createElement(CardContent_1["default"], { className: "vmCardContent" },
                        React.createElement("h3", null, props.vmDetails.optimized),
                        props.vmDetails.memory !== undefined ?
                            React.createElement(Typography_1["default"], { color: "textSecondary", gutterBottom: true },
                                props.vmDetails.memory,
                                " RAM") : null,
                        props.vmDetails.cpu !== undefined ?
                            React.createElement(Typography_1["default"], { color: "textSecondary", gutterBottom: true },
                                props.vmDetails.cpu,
                                " CPU") : null,
                        React.createElement(Typography_1["default"], { color: "textSecondary", gutterBottom: true },
                            props.vmDetails.optimized,
                            " performance"))))) : null));
};
exports["default"] = SummaryTab;
