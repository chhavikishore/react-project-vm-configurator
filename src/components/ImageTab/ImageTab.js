exports.__esModule = true;
var React = require("react");
require("./ImageTab.css");
var Card_1 = require("@material-ui/core/Card");
var CardContent_1 = require("@material-ui/core/CardContent");
var CardMedia_1 = require("@material-ui/core/CardMedia");
var Typography_1 = require("@material-ui/core/Typography");
var Radio_1 = require("@material-ui/core/Radio");
var RadioGroup_1 = require("@material-ui/core/RadioGroup");
var FormControlLabel_1 = require("@material-ui/core/FormControlLabel");
var FormControl_1 = require("@material-ui/core/FormControl");
var FormLabel_1 = require("@material-ui/core/FormLabel");
var core_1 = require("@material-ui/core");
var linux_png_1 = require("../../images/linux.png");
var windows_png_1 = require("../../images/windows.png");
var ImageTab = function (props) {
    var vmImage = [
        {
            id: 1,
            name: "Linux 2 image",
            description: "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
            price: 243.61,
            image: "" + linux_png_1["default"],
            type: [{ id: 11, name: "64-bit (x86)" }, { id: 12, name: "64-bit (ARM)" }],
            regionsAvailability: ["us-east-1", "us-east-2", "us-west-1", "india-1"]
        },
        {
            id: 2,
            name: "Ubuntu Server 18.04 LTS",
            description: "Ubuntu Server comes with 5 years of support. It provides Ubuntu 18.04 tuned for optimal performance",
            price: 243.61,
            image: "" + linux_png_1["default"],
            type: [{ id: 21, name: "64-bit (x86)" }, { id: 22, name: "64-bit (ARM)" }],
            regionsAvailability: ["us-east-1", "us-east-2", "us-west-1", "india-1"]
        },
        {
            id: 3,
            name: "Red Hat Enterprise Linux 8",
            description: "Red Hat comes with 5 years of support. It provides Linux kernel 8 tuned for optimal performance",
            price: 300,
            image: "" + linux_png_1["default"],
            type: [{ id: 31, name: "64-bit (x86)" }, { id: 32, name: "64-bit (ARM)" }],
            regionsAvailability: ["us-east-1", "us-east-2", "us-west-1", "india-1"]
        },
        {
            id: 4,
            name: "Microsoft Windows Server 2019 Base",
            description: "Microsoft Windows Server comes with 5 years of support. It provides Microsoft Windows Server 2019 tuned for optimal performance",
            price: 338.77,
            image: "" + windows_png_1["default"],
            type: [{ id: 41, name: "64-bit (ARM)" }],
            regionsAvailability: ["us-east-1", "us-east-2"]
        },
        {
            id: 5,
            name: "SUSE Linux Enterprise Server",
            description: "SUSE Linux comes with 5 years of support. It provides Linux 18.04 tuned for optimal performance",
            price: 200.22,
            image: "" + linux_png_1["default"],
            type: [{ id: 51, name: "64-bit (x86)" }, { id: 52, name: "64-bit (ARM)" }],
            regionsAvailability: ["us-east-1", "us-east-2", "us-west-1", "india-1"]
        }
    ];
    var _a = React.useState(['64-bit (x86)', '64-bit (x86)', '64-bit (x86)', "64-bit (ARM)", '64-bit (x86)']), radioVal = _a[0], setRadioValue = _a[1];
    var region = props.region, handleVmSelect = props.handleVmSelect;
    var handleChangeRadio = function (event) {
        setRadioValue(function (a) { return a.map(function (ar, i) { return event.target.id === i.toString() ? event.target.value : ar; }); });
    };
    return (React.createElement("div", { className: "ImageTab", "data-testid": "ImageTab" }, vmImage.map(function (vm) { return region === "" ?
        (React.createElement(Card_1["default"], { className: "vmCard", key: vm.id, style: { margin: "2% 0%" } },
            React.createElement(CardMedia_1["default"], { className: "cardImage", image: vm.image, title: vm.name }),
            React.createElement(CardContent_1["default"], { className: "vmCardContent" },
                React.createElement("h3", null, vm.name),
                React.createElement(Typography_1["default"], { color: "textSecondary", gutterBottom: true }, vm.description)),
            React.createElement(CardContent_1["default"], { className: "vmCardRadioButton" },
                React.createElement(FormControl_1["default"], { component: "fieldset" },
                    React.createElement(RadioGroup_1["default"], { "aria-label": vm.name, id: vm.name, name: vm.name, value: radioVal[vm.id - 1], onChange: handleChangeRadio }, vm.type.map(function (vmtype) { return (React.createElement(FormControlLabel_1["default"], { value: vmtype.name, key: vmtype.id, control: React.createElement(Radio_1["default"], { id: "" + (vm.id - 1) }), label: vmtype.name })); })),
                    React.createElement(core_1.Button, { variant: "contained", color: "primary", onClick: function () { return handleVmSelect(vm, radioVal[vm.id - 1]); } }, "Select"))))) : vm.regionsAvailability.map(function (vmregion) { return vmregion.includes(region) ?
        (React.createElement(Card_1["default"], { className: "vmCard", key: vm.id, style: { margin: "2% 0%" } },
            React.createElement(CardMedia_1["default"], { className: "cardImage", image: vm.image, title: vm.name }),
            React.createElement(CardContent_1["default"], { className: "vmCardContent" },
                React.createElement("h3", null, vm.name),
                React.createElement(Typography_1["default"], { color: "textSecondary", gutterBottom: true }, vm.description)),
            React.createElement(CardContent_1["default"], { className: "vmCardRadioButton" },
                React.createElement(FormControl_1["default"], { component: "fieldset" },
                    React.createElement(FormLabel_1["default"], { component: "legend" }),
                    React.createElement(RadioGroup_1["default"], { "aria-label": vm.name, id: vm.name, name: vm.name, value: radioVal[vm.id - 1], onChange: handleChangeRadio }, vm.type.map(function (vmtype) { return (React.createElement(FormControlLabel_1["default"], { value: vmtype.name, key: vmtype.id, control: React.createElement(Radio_1["default"], { id: "" + (vm.id - 1) }), label: vmtype.name })); })),
                    React.createElement(core_1.Button, { variant: "contained", color: "primary", onClick: function () { return handleVmSelect(vm, radioVal[vm.id - 1]); } }, "Select"))))) : null; }); })));
};
exports["default"] = ImageTab;
