/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createApp = void 0;
const tslib_1 = __webpack_require__(2);
const express_1 = tslib_1.__importDefault(__webpack_require__(3));
const cors_1 = tslib_1.__importDefault(__webpack_require__(4));
const static_1 = __webpack_require__(5);
const router_1 = tslib_1.__importDefault(__webpack_require__(6));
const db = tslib_1.__importStar(__webpack_require__(24));
const createApp = () => {
    db.connectDB();
    const app = (0, express_1.default)();
    app.use('/assets/images', express_1.default.static(filePath));
    app.use((0, cors_1.default)(static_1.corsOptions));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use('/api', router_1.default);
    return app;
};
exports.createApp = createApp;


/***/ }),
/* 2 */
/***/ ((module) => {

"use strict";
module.exports = require("tslib");

/***/ }),
/* 3 */
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.corsOptions = void 0;
exports.corsOptions = {
    origin: 'https://dusantopic.onrender.com',
    preflightContinue: true,
    optionsSuccessStatus: 200,
};


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(2);
const express_1 = __webpack_require__(3);
const projectRouter_1 = tslib_1.__importDefault(__webpack_require__(7));
const userRoutes_1 = tslib_1.__importDefault(__webpack_require__(17));
const techRouter_1 = tslib_1.__importDefault(__webpack_require__(21));
const router = (0, express_1.Router)();
router.use('/projects', projectRouter_1.default);
router.use('/user', userRoutes_1.default);
router.use('/tech', techRouter_1.default);
exports["default"] = router;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(2);
const express_1 = __webpack_require__(3);
const projectController_1 = __webpack_require__(8);
const uploadMiddleware_1 = tslib_1.__importDefault(__webpack_require__(12));
const authMiddleware_1 = __webpack_require__(15);
const projectRouter = (0, express_1.Router)();
projectRouter.get('/', projectController_1.getAllProjects);
projectRouter.get('/:id', projectController_1.getSingleProject);
projectRouter.post('/create', authMiddleware_1.authMiddleware, uploadMiddleware_1.default.array('photos'), projectController_1.createProject);
projectRouter.delete('/delete/:id', authMiddleware_1.authMiddleware, projectController_1.deleteProject);
exports["default"] = projectRouter;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteProject = exports.createProject = exports.getSingleProject = exports.getAllProjects = void 0;
const tslib_1 = __webpack_require__(2);
const ProjectModel_1 = tslib_1.__importDefault(__webpack_require__(9));
const helpers_1 = __webpack_require__(11);
const getAllProjects = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield ProjectModel_1.default.find().sort([['createdAt', 'descending']]);
        if (!projects)
            return res.status(400).json({ message: 'No project found' });
        return res.status(200).json(projects);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching projects', error });
    }
});
exports.getAllProjects = getAllProjects;
const getSingleProject = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const project = yield ProjectModel_1.default.findById(id).populate('technologies');
        if (!project)
            return res.status(400).json({ message: 'No project found' });
        return res.status(200).json(project);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching project', error });
    }
});
exports.getSingleProject = getSingleProject;
const createProject = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { title, description, technologies } = req.body;
    const url = req.protocol + '://' + req.get('host');
    try {
        const photos = req.files.map((file) => url + '/assets/images/' + file.filename);
        if (!photos)
            (0, helpers_1.responseMessage)(400, res, 'No photos');
        const projectData = {
            title,
            description,
            technologies,
            photos,
        };
        const project = yield ProjectModel_1.default.create(projectData);
        return res.status(201).json(project);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating project', error });
    }
});
exports.createProject = createProject;
const deleteProject = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ message: 'Project id is required' });
    try {
        const deleteProject = yield ProjectModel_1.default.findByIdAndDelete(id);
        if (!deleteProject)
            return res.status(404).json({ message: 'No project found' });
        return res.status(200).json({ message: 'Project successfully deleted!' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting project', error });
    }
});
exports.deleteProject = deleteProject;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(2);
const mongoose_1 = tslib_1.__importStar(__webpack_require__(10));
const projectSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    technologies: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Technology',
        },
    ],
    photos: [
        {
            type: String,
            required: true,
        },
    ],
}, {
    timestamps: true,
});
exports["default"] = mongoose_1.default.model('Project', projectSchema);


/***/ }),
/* 10 */
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.responseMessage = void 0;
const responseMessage = (status, res, message) => {
    return res.status(status).json({
        msg: message,
    });
};
exports.responseMessage = responseMessage;


/***/ }),
/* 12 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable @typescript-eslint/no-var-requires */
const multer = __webpack_require__(13);
const path = __webpack_require__(14);
const filePath = path.join(process.cwd(), 'apps', 'porfolio-be', 'src', 'assets', 'images');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        const filename = file.fieldname + '-' + uniqueSuffix + extension;
        cb(null, filename);
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});
module.exports = upload;


/***/ }),
/* 13 */
/***/ ((module) => {

"use strict";
module.exports = require("multer");

/***/ }),
/* 14 */
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authMiddleware = void 0;
const jwt = __webpack_require__(16);
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const payload = jwt.verify(token, process.env.NX_JWT_SECRET);
        req.user = {
            id: payload.id,
            email: payload.email,
            username: payload.username,
        };
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.authMiddleware = authMiddleware;


/***/ }),
/* 16 */
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(3);
const userController_1 = __webpack_require__(18);
const authMiddleware_1 = __webpack_require__(15);
const userRouter = (0, express_1.Router)();
userRouter.post('/login', userController_1.LoginUser);
userRouter.post('/register', userController_1.RegisterUser);
userRouter.post('/logout', authMiddleware_1.authMiddleware, userController_1.LogoutUser);
userRouter.get('/', userController_1.getUsers);
exports["default"] = userRouter;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUsers = exports.LogoutUser = exports.LoginUser = exports.RegisterUser = void 0;
const tslib_1 = __webpack_require__(2);
const jwt = __webpack_require__(16);
const UserModel_1 = tslib_1.__importDefault(__webpack_require__(19));
const bcrypt_1 = __webpack_require__(20);
const helpers_1 = __webpack_require__(11);
const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.NX_JWT_SECRET, {
        expiresIn: '1d',
    });
};
const RegisterUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const salt = yield (0, bcrypt_1.genSalt)(10);
    const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
    const user = yield UserModel_1.default.create({
        email,
        password: hashedPassword,
    });
    if (!user)
        return (0, helpers_1.responseMessage)(400, res, 'Invalid User Data');
    return res.status(201).json({
        email: user.email,
        token: generateToken(user.id, user.email),
    });
});
exports.RegisterUser = RegisterUser;
const LoginUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield UserModel_1.default.findOne({ email });
    if (!user)
        return (0, helpers_1.responseMessage)(400, res, 'Invalid email or password!');
    const matchPassword = yield (0, bcrypt_1.compare)(password, user.password);
    if (!matchPassword)
        return (0, helpers_1.responseMessage)(400, res, 'Invalid email or password!');
    return res.status(201).json({
        email: user.email,
        token: generateToken(user.id, user.email),
    });
});
exports.LoginUser = LoginUser;
const LogoutUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    try {
        const user = yield UserModel_1.default.findByIdAndUpdate(userId, { token: null });
        if (!user)
            throw new Error('User not found');
        (0, helpers_1.responseMessage)(200, res, 'Logout successful');
    }
    catch (error) {
        (0, helpers_1.responseMessage)(500, res, 'Server Error');
    }
});
exports.LogoutUser = LogoutUser;
const getUsers = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const projects = yield UserModel_1.default.find().sort([['createdAt', 'descending']]);
    if (!projects)
        return res.status(400).json({ message: 'No project found' });
    return res.status(200).json(projects);
});
exports.getUsers = getUsers;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(2);
const mongoose_1 = tslib_1.__importStar(__webpack_require__(10));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports["default"] = mongoose_1.default.model('User', userSchema);


/***/ }),
/* 20 */
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(3);
const techController_1 = __webpack_require__(22);
const techRouter = (0, express_1.Router)();
techRouter.get('/', techController_1.getAllTech);
techRouter.post('/add', techController_1.addTech);
exports["default"] = techRouter;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addTech = exports.getAllTech = void 0;
const tslib_1 = __webpack_require__(2);
const TechnologyModel_1 = tslib_1.__importDefault(__webpack_require__(23));
const helpers_1 = __webpack_require__(11);
const getAllTech = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const tech = yield TechnologyModel_1.default.find();
    if (!tech)
        return (0, helpers_1.responseMessage)(404, res, 'No technologies found');
    return res.status(200).json(tech);
});
exports.getAllTech = getAllTech;
const addTech = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const techData = {
        name,
    };
    const tech = yield TechnologyModel_1.default.create(techData);
    return res.status(201).json(tech);
});
exports.addTech = addTech;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(2);
const mongoose_1 = tslib_1.__importStar(__webpack_require__(10));
const techSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports["default"] = mongoose_1.default.model('Technology', techSchema);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.connectDB = void 0;
const tslib_1 = __webpack_require__(2);
const mongoose_1 = tslib_1.__importDefault(__webpack_require__(10));
const connectDB = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const dbName = 'mongodb+srv://dtopic12:dtopic12@myWebsite.2ts2qui.mongodb.net/?retryWrites=true&w=majority';
    try {
        yield mongoose_1.default.connect(dbName);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const app_1 = __webpack_require__(1);
const app = (0, app_1.createApp)();
const port = process.env.NX_PORT || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map