import {combineExtensions} from 'micromark-util-combine-extensions';
import {gfmFootnote} from 'micromark-extension-gfm-footnote';
import {gfmStrikethrough} from 'micromark-extension-gfm-strikethrough';
import {gfmTable} from 'micromark-extension-gfm-table';
import {gfmTaskListItem} from 'micromark-extension-gfm-task-list-item';
import {
    gfmFootnoteFromMarkdown,
    gfmFootnoteToMarkdown,
} from 'mdast-util-gfm-footnote';
import {
    gfmStrikethroughFromMarkdown,
    gfmStrikethroughToMarkdown,
} from 'mdast-util-gfm-strikethrough';
import {gfmTableFromMarkdown, gfmTableToMarkdown} from 'mdast-util-gfm-table';
import {
    gfmTaskListItemFromMarkdown,
    gfmTaskListItemToMarkdown,
} from 'mdast-util-gfm-task-list-item';

const emptyOptions = {};

function gfmWithoutAutolinkLiteral(options) {
    return combineExtensions([
        gfmFootnote(),
        gfmStrikethrough(options),
        gfmTable(),
        gfmTaskListItem(),
    ]);
}

function gfmFromMarkdownWithoutAutolinkLiteral() {
    return [
        gfmFootnoteFromMarkdown(),
        gfmStrikethroughFromMarkdown(),
        gfmTableFromMarkdown(),
        gfmTaskListItemFromMarkdown(),
    ];
}

function gfmToMarkdownWithoutAutolinkLiteral(options) {
    return {
        extensions: [
            gfmFootnoteToMarkdown(options),
            gfmStrikethroughToMarkdown(),
            gfmTableToMarkdown(options),
            gfmTaskListItemToMarkdown(),
        ],
    };
}

export default function remarkGithubSafe(options) {
    const settings = options || emptyOptions;
    const data = this.data();

    const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
    const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
    const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);

    micromarkExtensions.push(gfmWithoutAutolinkLiteral(settings));
    fromMarkdownExtensions.push(gfmFromMarkdownWithoutAutolinkLiteral());
    toMarkdownExtensions.push(gfmToMarkdownWithoutAutolinkLiteral(settings));
}
