"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const app = (0, express_1.default)();
dotenv_1.default.config();
mongoose_1.default
    .connect("mongodb+srv://ext-db:QWej2AmVRBitUFl9@cluster0.q8c0ehp.mongodb.net/training?retryWrites=true&w=majority", {})
    .then(() => console.log("DB connection success!"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path.join(__dirname, "public")));
app.use("/user", users_route_1.default);
app.use((req, res) => {
    res.status(404).json({ message: "Page not found!" });
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500).json({ message: "bad request!" });
});
app.listen(process.env.PORT || 1060, function () {
    console.log("Express server listening on port %d in %s mode", app.settings.env);
});
