exports.__esModule = true;
var React = require("react");
require("./CostEstimation.css");
var Card_1 = require("@material-ui/core/Card");
var CardContent_1 = require("@material-ui/core/CardContent");
var core_1 = require("@material-ui/core");
var CostEstimation = function (props) {
    return (React.createElement("div", { className: "CostEstimation", "data-testid": "CostEstimation" },
        React.createElement(Card_1["default"], null,
            React.createElement(CardContent_1["default"], null,
                React.createElement("h3", null, "Cost Estimates"),
                props.costDetails.length > 0 ? props.costDetails.map(function (priceDetail) { return (React.createElement("div", { className: "details", key: priceDetail.name },
                    React.createElement("div", { className: "vmName" },
                        React.createElement("b", null, priceDetail.name)),
                    React.createElement("div", null, "$" + priceDetail.price))); }) : null,
                React.createElement(core_1.Divider, null),
                props.costDetails.length > 0 ?
                    (React.createElement("div", { className: "totalPrice" },
                        React.createElement("h3", null,
                            "$",
                            props.totalCost,
                            "/mo"))) : null))));
};
exports["default"] = CostEstimation;
