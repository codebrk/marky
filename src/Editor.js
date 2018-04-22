'use strict';

const React       = require("react");
const HTMLView    = require("./HTMLView");
const CodeMirror  = require("codemirror/lib/codemirror");
const mode        = require("codemirror/mode/markdown/markdown");


class Editor extends React.Component {
    constructor() {
        super();

        if (localStorage.getItem("marky") === null) {
            this.state = {
                md: ''
            };
        } else {
            this.state = {
                md: localStorage.getItem("marky")
            }
        }
        this.renderHTMLView = this.renderHTMLView.bind(this);
    }

    componentDidMount() {
        let config = {
            lineNumbers: true,
            highlightFormatting: true,
            maxBlockquoteDepth: true,
            xml: true,
            fencedCodeBlockHighlighting: true,
            allowAtxHeaderWithoutSpace: true,
            gitHubSpice: true,
            strikethrough: true,
            emoji: true,
            mode: 'text/x-markdown',
            lineWrapping: true
        };

        if (this.props.config) {
            let _self = this;
            Object.keys(this.props.config).map(key => {
                config[key] = _self.props.config[key];
            });
        }
        let mirror = CodeMirror.fromTextArea(this.editor, config);

        mirror.on("change", cm => {
            localStorage.setItem("marky", cm.getValue());
            this.setState({
                md: cm.getValue()
            });
        });
    }

    renderHTMLView() {
        return <HTMLView md={this.state.md} />;
    }

    render() {
        return (
            <div id={"marky"}>
                <textarea id={"marky-editor"} ref={e => this.editor = e} value={this.state.md}/>
                {this.renderHTMLView()}
            </div>
        );
    }
}


module.exports = Editor;