import {XmlEditorConfig} from './editorConfig';
import {wordNodeConfig} from '../elementEditors/wordNodeData';
import {lineBreakNodeConfig} from '../elementEditors/lineBreakData';
import {noteNodeConfig} from './noteData';
import {aoManuscriptsConfig} from '../elementEditors/aoManuscriptsConfigData';
import {gapConfig} from './gapConfigData';
import {paragraphSeparatorConfig} from './paragraphSeparatorConfig';
import {XmlElementNode} from '../xmlModel/xmlModel';
import {reCountNodeNumbers} from './NoteNodeEditor';
import {clbNodeConfig} from '../elementEditors/clbData';

// FIXME: recount footnote & clb node numbers!

export const selectedNodeClass = 'bg-teal-400';

export const tlhXmlEditorConfig: XmlEditorConfig = {
  nodeConfigs: {
    docID: {replace: () => <span/>},
    'AO:Manuscripts': aoManuscriptsConfig,
    lb: lineBreakNodeConfig,

    clb: clbNodeConfig,

    // Words
    w: wordNodeConfig,

    // Word contents
    aGr: {styling: () => ['akkadogramm']},
    sGr: {styling: () => ['sumerogramm']},
    d: {styling: () => ['determinativ']},

    del_in: {replace: () => <span>[</span>},
    del_fin: {replace: () => <span>]</span>},
    ras_in: {replace: () => <span>*</span>},
    ras_fin: {replace: () => <span>*</span>},
    laes_in: {replace: () => <span>⸢</span>},
    laes_fin: {replace: () => <span>⸣</span>},

    gap: gapConfig,
    subscr: {replace: (node) => <sub>{node.attributes.c}</sub>},

    space: {
      replace: (node) => <>{Array.from({length: parseInt(node.attributes.c) || 0}).map((_, i) => <span key={i}>&nbsp;</span>)}</>
    },

    parsep: paragraphSeparatorConfig,
    parsep_dbl: paragraphSeparatorConfig,

    corr: {
      styling: () => ['corr'],
      replace: (node) => <span>{node.attributes.c}</span>
    },
    note: noteNodeConfig
  },
  beforeExport: (rootNode: XmlElementNode) => {
    reCountNodeNumbers(rootNode, 'node', 'n');
    reCountNodeNumbers(rootNode, 'clb', 'nr');
    return rootNode;
  },
  afterExport: (exported: string) => exported
    .replaceAll('®', '\n\t')
    // FIXME: collides with fragments! {€1}
    .replaceAll('{', '\n\t\t{')
    .replaceAll('+=', '\n\t\t   += ')
    .replaceAll('<w', '\n <w')
    .replaceAll('<lb', '\n\n<lb')
    .replaceAll(' mrp', '\n\tmrp')
    .replaceAll('@', ' @ ')
};