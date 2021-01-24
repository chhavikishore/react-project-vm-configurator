var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = require("react");
var InputLabel_1 = require("@material-ui/core/InputLabel");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var FormControl_1 = require("@material-ui/core/FormControl");
var Select_1 = require("@material-ui/core/Select");
var styles_1 = require("@material-ui/core/styles");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogContentText_1 = require("@material-ui/core/DialogContentText");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var Button_1 = require("@material-ui/core/Button");
require("./InstanceTab.css");
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
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        button: {
            marginTop: theme.spacing(2),
            padding: "1% 1.5%",
            background: "white"
        },
        buttonSelected: {
            marginTop: theme.spacing(2),
            padding: "1% 1.5%",
            background: "white",
            borderColor: "blue",
            color: "blue"
        }
    });
});
var InstanceTab = function (props) {
    var memoryCpu = {
        'generalPurpose': {
            memory: ["256 MB", "512 MB", "1 GB", "2 GB", "4 GB"],
            vcpu: ["1 Core", "2 Core", "4 Core"]
        },
        'storageOptimized': {
            memory: ["16 GB", "32 GB", "64 GB"],
            vcpu: ["1 Core", "8 Core", "16 Core"]
        },
        'computeOptimized': {
            memory: ["16 GB", "32 GB", "64 GB"],
            vcpu: ["1 Core", "2 Core", "8 Core", "16 Core"]
        },
        'networkOptimized': {
            memory: ["256 MB", "512 MB", "1 GB", "2 GB", "4 GB", "16 GB", "32 GB", "64 GB"],
            vcpu: ["1 Core", "2 Core", "4 Core", "8 Core", "16 Core"]
        }
    };
    var classes = useStyles();
    var handleTabChange = props.handleTabChange, vmDetails = props.vmDetails, handleInstanceSelect = props.handleInstanceSelect;
    var _a = React.useState(vmDetails.optimized !== undefined ? vmDetails.optimized : 'generalPurpose'), configName = _a[0], setConfigName = _a[1];
    var _b = React.useState(vmDetails.memory !== undefined ? vmDetails.memory : ''), memory = _b[0], setMemoryDetails = _b[1];
    var _c = React.useState(vmDetails.cpu !== undefined ? vmDetails.cpu : ''), cpu = _c[0], setCpuDetails = _c[1];
    var _d = React.useState(false), openDialogBox = _d[0], setOpenDialogBox = _d[1];
    var _e = React.useState(''), dialogContent = _e[0], setDialogBoxContent = _e[1];
    var _f = React.useState(''), temporaryConfig = _f[0], setTemporaryConfig = _f[1];
    var initialSelectedArray = [{ name: 'generalPurpose', selected: true }, { name: 'computeOptimized', selected: false }, { name: 'storageOptimized', selected: false }, { name: 'networkOptimized', selected: false }];
    var selectedArray = vmDetails.optimized !== undefined ? initialSelectedArray.map(function (data) { return data.name === vmDetails.optimized ? __assign(__assign({}, data), { selected: true }) : __assign(__assign({}, data), { selected: false }); }) : initialSelectedArray;
    var _g = React.useState(selectedArray), selected = _g[0], setSelected = _g[1];
    var handleConfigButton = function (name) {
        setTemporaryConfig(name);
        if (memory !== '' && cpu === '') {
            Object.entries(memoryCpu).map(function (value) {
                if (value[0] === name && !value[1].memory.includes(memory)) {
                    setDialogBoxContent(memory + " is not available for " + name + ". Are you sure you want to proceed?");
                    setOpenDialogBox(true);
                }
                else if (value[0] === name && value[1].memory.includes(memory)) {
                    var selectArray = selected.map(function (data) { return data.name === name ? __assign(__assign({}, data), { selected: true }) : __assign(__assign({}, data), { selected: false }); });
                    setSelected(selectArray);
                    setConfigName(name);
                    setMemoryDetails('');
                    setCpuDetails('');
                    handleInstanceSelect(null);
                }
                return null;
            });
        }
        else if (memory === '' && cpu !== '') {
            Object.entries(memoryCpu).map(function (value) {
                if (value[0] === name && !value[1].vcpu.includes(cpu)) {
                    setDialogBoxContent(cpu + " is not available for " + name + ". Are you sure you want to proceed?");
                    setOpenDialogBox(true);
                }
                else if (value[0] === name && value[1].vcpu.includes(cpu)) {
                    var selectArray = selected.map(function (data) { return data.name === name ? __assign(__assign({}, data), { selected: true }) : __assign(__assign({}, data), { selected: false }); });
                    setSelected(selectArray);
                    setConfigName(name);
                    setMemoryDetails('');
                    setCpuDetails('');
                    handleInstanceSelect(null);
                }
                return null;
            });
        }
        else if (memory !== '' && cpu !== '') {
            Object.entries(memoryCpu).map(function (value) {
                if (value[0] === name && !value[1].memory.includes(memory) && !value[1].vcpu.includes(cpu)) {
                    setDialogBoxContent(memory + " and " + cpu + " is not available for " + name + ". Are you sure you want to proceed?");
                    setOpenDialogBox(true);
                }
                else if (value[0] === name && value[1].memory.includes(memory) && !value[1].vcpu.includes(cpu)) {
                    setDialogBoxContent(cpu + " is not available for " + name + ". Are you sure you want to proceed?");
                    setOpenDialogBox(true);
                }
                else if (value[0] === name && !value[1].memory.includes(memory) && value[1].vcpu.includes(cpu)) {
                    setDialogBoxContent(memory + " is not available for " + name + ". Are you sure you want to proceed?");
                    setOpenDialogBox(true);
                }
                else if (value[0] === name && value[1].memory.includes(memory) && value[1].vcpu.includes(cpu)) {
                    var selectArray = selected.map(function (data) { return data.name === name ? __assign(__assign({}, data), { selected: true }) : __assign(__assign({}, data), { selected: false }); });
                    setSelected(selectArray);
                    setConfigName(name);
                    setMemoryDetails('');
                    setCpuDetails('');
                    handleInstanceSelect(null);
                }
                return null;
            });
        }
        else {
            var selectArray = selected.map(function (data) { return data.name === name ? __assign(__assign({}, data), { selected: true }) : __assign(__assign({}, data), { selected: false }); });
            setSelected(selectArray);
            setConfigName(name);
        }
    };
    var handleDialogBoxClose = function () {
        var selectArray = selected.map(function (data) { return data.name === configName ? __assign(__assign({}, data), { selected: true }) : __assign(__assign({}, data), { selected: false }); });
        setSelected(selectArray);
        setConfigName(configName);
        setOpenDialogBox(false);
    };
    var handleDialogBoxCloseYes = function () {
        setMemoryDetails('');
        setCpuDetails('');
        handleInstanceSelect(null);
        var selectArray = selected.map(function (data) { return data.name === temporaryConfig ? __assign(__assign({}, data), { selected: true }) : __assign(__assign({}, data), { selected: false }); });
        setSelected(selectArray);
        setConfigName(temporaryConfig);
        setOpenDialogBox(false);
    };
    return (React.createElement("div", { className: "InstanceTab", "data-testid": "InstanceTab" },
        React.createElement("section", { className: "configButtons" },
            React.createElement(Button_1["default"], { className: selected[0].selected ? classes.buttonSelected : classes.button, variant: "outlined", disableRipple: true, id: "generalPurpose", onClick: function () { return handleConfigButton("generalPurpose"); } },
                React.createElement("b", null, "General Purpose")),
            React.createElement(Button_1["default"], { className: selected[1].selected ? classes.buttonSelected : classes.button, variant: "outlined", disableRipple: true, id: "computeOptimized", onClick: function () { return handleConfigButton("computeOptimized"); } },
                React.createElement("b", null, "CPU Optimized")),
            React.createElement(Button_1["default"], { className: selected[2].selected ? classes.buttonSelected : classes.button, variant: "outlined", disableRipple: true, id: "storageOptimized", onClick: function () { return handleConfigButton("storageOptimized"); } },
                React.createElement("b", null, "Storage Optimized")),
            React.createElement(Button_1["default"], { className: selected[3].selected ? classes.buttonSelected : classes.button, variant: "outlined", disableRipple: true, id: "networkOptimized", onClick: function () { return handleConfigButton("networkOptimized"); } },
                React.createElement("b", null, "Network Optimized"))),
        React.createElement("section", { style: { marginLeft: "2rem" } },
            React.createElement("h3", null, "Create Configuration"),
            React.createElement("div", null, memoryCpu.hasOwnProperty(configName) ?
                (React.createElement(React.Fragment, null,
                    React.createElement(FormControl_1["default"], { variant: "outlined", className: classes.formControl },
                        React.createElement(InputLabel_1["default"], { id: "cpuLabel" }, "CPU Cores"),
                        React.createElement(Select_1["default"], { labelId: "cpuLabel", id: "cpu", value: cpu, onChange: function (event) {
                                setCpuDetails(event.target.value);
                                handleInstanceSelect({ memory: memory, cpu: event.target.value, optimized: configName });
                            }, label: "CPU" }, Object.entries(memoryCpu).map(function (value) { return value[0] === configName ?
                            value[1].vcpu.map(function (vcpu) { return (React.createElement(MenuItem_1["default"], { value: vcpu }, vcpu)); })
                            : null; }))),
                    React.createElement(FormControl_1["default"], { variant: "outlined", className: classes.formControl },
                        React.createElement(InputLabel_1["default"], { id: "memoryLabel" }, "Memory"),
                        React.createElement(Select_1["default"], { labelId: "memoryLabel", id: "memory", value: memory, onChange: function (event) {
                                setMemoryDetails(event.target.value);
                                handleInstanceSelect({ memory: event.target.value, cpu: cpu, optimized: configName });
                            }, label: "Memory" }, Object.entries(memoryCpu).map(function (value) { return value[0] === configName ?
                            value[1].memory.map(function (memory) { return (React.createElement(MenuItem_1["default"], { value: memory }, memory)); })
                            : null; }))))) : null)),
        React.createElement("footer", { className: "footer" },
            React.createElement(BlackButton, { variant: "contained", onClick: function (event) {
                    handleTabChange(event, 0);
                    handleInstanceSelect(null);
                } }, "Back"),
            React.createElement(Button_1["default"], { variant: "contained", color: "primary", style: { marginRight: "2rem" }, onClick: function (event) { if (cpu !== '' && memory !== '') {
                    handleTabChange(event, 2);
                } } }, "Proceed")),
        React.createElement(Dialog_1["default"], { open: openDialogBox, onClose: handleDialogBoxClose, "aria-labelledby": "alertBox-dialog-title", "aria-describedby": "alertBox-dialog-memory-cpu-warning" },
            React.createElement(DialogTitle_1["default"], { id: "alert-dialog-title" }, "Warning"),
            React.createElement(DialogContent_1["default"], null,
                React.createElement(DialogContentText_1["default"], { id: "alertBox-dialog-memory-cpu-warning" }, dialogContent)),
            React.createElement(DialogActions_1["default"], null,
                React.createElement(BlackButton, { onClick: handleDialogBoxClose, color: "primary", variant: "contained" }, "No"),
                React.createElement(Button_1["default"], { variant: "contained", color: "primary", onClick: handleDialogBoxCloseYes, autoFocus: true }, "Yes")))));
};
exports["default"] = InstanceTab;
