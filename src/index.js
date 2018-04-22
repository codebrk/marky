'use strict';

const React       = require("react");
const ReactDOM    = require("react-dom");
const Editor      = require("./Editor");


window.Marky = class {
    constructor(root, config) {
        ReactDOM.render(
            <Editor config={config}/>,
            root
        );
    }
};
