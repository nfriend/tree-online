import { RecursiveArray } from 'lodash';
import flattenDeep from 'lodash.flattendeep';
import last from 'lodash.last';
import { FileStructure } from './FileStructure';
import { LINE_STRINGS } from './line-strings';

interface GenerateTreeOptions {
  charset: 'ascii' | 'utf-8';
}

const defaultOptions: GenerateTreeOptions = {
  charset: 'utf-8',
};

/**
 * Generates an ASCII tree diagram, given a FileStructure
 * @param structure The FileStructure object to convert into ASCII
 * @param options The rendering options
 */
export const generateTree = (
  structure: FileStructure,
  options: GenerateTreeOptions = defaultOptions,
): string =>
  flattenDeep([
    getAsciiLine(structure, options),
    structure.children.map(c => generateTree(c, options)) as RecursiveArray<
      string
    >,
  ]).join('\n');

/**
 * Returns a line of ASCII that represents
 * a single FileStructure object
 * @param structure The file to render
 * @param options The rendering options
 */
const getAsciiLine = (
  structure: FileStructure,
  options: GenerateTreeOptions,
): string => {
  const lines = LINE_STRINGS[options.charset];

  if (!structure.parent) {
    return lines.ROOT;
  }

  const chunks = [
    isLastChild(structure) ? lines.LAST_CHILD : lines.CHILD,
    structure.name,
  ];

  let current = structure.parent;
  while (current && current.parent) {
    chunks.unshift(isLastChild(current) ? lines.EMPTY : lines.DIRECTORY);
    current = current.parent;
  }

  return chunks.join('');
};

/**
 * A utility function do determine if a file or folder
 * is the last child of its parent
 * @param structure The file or folder to test
 */
const isLastChild = (structure: FileStructure): boolean =>
  last(structure.parent!.children) === structure;
