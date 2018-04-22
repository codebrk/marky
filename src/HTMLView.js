'use strict';

const marky       = require("marky-markdown");
const React       = require("react");
const HTMLParser  = require('html-to-react').Parser;


class HTMLView extends React.Component {
    constructor() {
        super();
        this.state = {
            md: "hello"
        }
    }

    render() {
        let parser = new HTMLParser();
        return (
            <div id={"marky-view"}>
                {parser.parse(marky(this.props.md, {headingAnchorClass: 'marky-heading-anchor', highlightSyntax: false}))}
            </div>
        );
    }
}


module.exports = HTMLView;