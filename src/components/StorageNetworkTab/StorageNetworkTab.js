exports.__esModule = true;
var React = require("react");
var Paper_1 = require("@material-ui/core/Paper");
var InputLabel_1 = require("@material-ui/core/InputLabel");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var FormControl_1 = require("@material-ui/core/FormControl");
var Select_1 = require("@material-ui/core/Select");
var TextField_1 = require("@material-ui/core/TextField");
var Checkbox_1 = require("@material-ui/core/Checkbox");
var Button_1 = require("@material-ui/core/Button");
var styles_1 = require("@material-ui/core/styles");
var Slider_1 = require("@material-ui/core/Slider");
require("./StorageNetworkTab.css");
var NetworkSlider = styles_1.withStyles({
    root: {
        color: '#52af77',
        height: 8
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: 'grey',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit'
        }
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)'
    },
    track: {
        height: 8,
        borderRadius: 4
    },
    rail: {
        height: 8,
        borderRadius: 4
    }
})(Slider_1["default"]);
var BlackButton = styles_1.withStyles(function () { return ({
    root: {
        color: "white",
        backgroundColor: "black",
        marginRight: "1rem",
        '&:hover': {
            backgroundColor: "black"
        }
    }
}); })(Button_1["default"]);
var storageTypeArray = ["Magnetic disks", "SSD"];
var initialSliderMarksOthers = [{
        value: 0,
        label: '512 GB'
    },
    {
        value: 100,
        label: '1 TB'
    }];
var initialSliderMarksNtwrk = [{
        value: 0,
        label: '512 GB'
    },
    {
        value: 100,
        label: '2 TB'
    }];
var StorageNetworkTab = function (props) {
    var handleTabChange = props.handleTabChange, vmDetails = props.vmDetails;
    var _a = React.useState(''), storageType = _a[0], setStorageType = _a[1];
    var _b = React.useState(true), encryptionChecked = _b[0], setEncryptionChecked = _b[1];
    var _c = React.useState(true), backupChecked = _c[0], setBackupChecked = _c[1];
    var _d = React.useState(0), capacityRangeMin = _d[0], setCapacityRangeMin = _d[1];
    var _e = React.useState(0), capacityRangeMax = _e[0], setCapacityRangeMax = _e[1];
    var _f = React.useState(''), capacity = _f[0], setCapacity = _f[1];
    var _g = React.useState(''), remarks = _g[0], setRemark = _g[1];
    var _h = React.useState(0), networkSliderValue = _h[0], setNetworkSliderValue = _h[1];
    var _j = React.useState(0), iops = _j[0], setIops = _j[1];
    var marks = vmDetails.optimized === "networkOptimized" ? initialSliderMarksNtwrk : initialSliderMarksOthers;
    var handleStorageTypeSelection = function (event) {
        setStorageType(event.target.value);
        if (event.target.value === "Magnetic disks") {
            setCapacityRangeMin(40);
            setCapacityRangeMax(2000);
        }
        else if (event.target.value === "SSD") {
            setCapacityRangeMin(20);
            setCapacityRangeMax(512);
        }
    };
    var handleEncryptionChange = function (event) {
        setEncryptionChecked(event.target.checked);
    };
    var handleBackupChange = function (event) {
        setBackupChecked(event.target.checked);
    };
    var handleCapacityChange = function (event) {
        setCapacity(event.target.value);
        Number(event.target.value) > 500 ? setIops(1000) : (Number(event.target.value) >= 100 && Number(event.target.value) < 500 ? setIops(600) : setIops(100));
    };
    var handleRemarkChange = function (event) {
        setRemark(event.target.value);
    };
    var handleNetworkSliderChange = function (event, newValue) {
        setNetworkSliderValue(event.target.value);
    };
    return (React.createElement("div", { className: "StorageNetworkTab", "data-testid": "StorageNetworkTab" },
        React.createElement(Paper_1["default"], { elevation: 3, className: "row" },
            React.createElement("div", { className: "column" },
                React.createElement("b", { className: "heading" }, "Type"),
                React.createElement(FormControl_1["default"], { variant: "outlined", style: { width: "12rem" } },
                    React.createElement(InputLabel_1["default"], { id: "typeLabel" }),
                    React.createElement(Select_1["default"], { labelId: "typeLabel", id: "type", value: storageType, onChange: handleStorageTypeSelection, label: "type" }, storageTypeArray.map(function (storageType, index) { return (React.createElement(MenuItem_1["default"], { value: storageType, key: index }, storageType)); })))),
            React.createElement("div", { className: "column" },
                React.createElement("b", { className: "heading" }, "Volume"),
                React.createElement("div", null, "Root")),
            React.createElement("div", { className: "column", style: { width: "7rem" } },
                React.createElement("b", { className: "heading" }, "Capacity (GB)"),
                React.createElement(TextField_1["default"], { type: "number", id: "capacity", InputProps: { inputProps: { min: capacityRangeMin, max: capacityRangeMax } }, value: capacity, onChange: handleCapacityChange, variant: "outlined" })),
            React.createElement("div", { className: "column" },
                React.createElement("b", { className: "heading" }, "Encryption"),
                React.createElement(Checkbox_1["default"], { checked: encryptionChecked, onChange: handleEncryptionChange, color: "primary", inputProps: { 'aria-label': 'encryption checkbox' } })),
            React.createElement("div", { className: "column" },
                React.createElement("b", { className: "heading" }, "IOPS"),
                React.createElement("div", null, iops)),
            React.createElement("div", { className: "column" },
                React.createElement("b", { className: "heading" }, "BackUp Required"),
                React.createElement(Checkbox_1["default"], { checked: backupChecked, onChange: handleBackupChange, color: "primary", inputProps: { 'aria-label': 'back up checkbox' } })),
            React.createElement("div", { className: "column", style: { width: "10rem" } },
                React.createElement("b", { className: "heading" }, "Remarks"),
                React.createElement(TextField_1["default"], { id: "remarks", className: "textField", variant: "outlined", value: remarks, onChange: handleRemarkChange }))),
        React.createElement(Button_1["default"], { variant: "contained", color: "primary", style: { margin: "1%" } }, "Add Volume"),
        React.createElement("div", { className: "slider" },
            React.createElement("h4", null, "Network Bandwidth Configuration"),
            React.createElement("div", null, "OutBound Traffic"),
            React.createElement(NetworkSlider, { valueLabelDisplay: "auto", "aria-label": "network slider", defaultValue: 0, marks: marks, onChange: handleNetworkSliderChange })),
        React.createElement("footer", { className: "footer" },
            React.createElement(BlackButton, { variant: "contained", onClick: function (event) {
                    handleTabChange(event, 1);
                } }, "Back"),
            React.createElement(Button_1["default"], { variant: "contained", color: "primary", style: { marginRight: "2rem" }, onClick: function (event) { return handleTabChange(event, 3); } }, "Proceed"))));
};
exports["default"] = StorageNetworkTab;
