import StyleDictionary, { type Format } from 'style-dictionary';

export default {
  name: 'cf/css/namespaced-variables',
  /**
   * This format generates a CSS file with a class selector for the given
   * namespace (defaults to 'paldea') and applies all the variables as CSS
   * custom properties to both the namespace selector and the root element.
   *
   * The generated CSS file will look like this:
   *
   * .paldea-theme, :root {
   *   --variable-name: value;
   *   --variable-name: value;
   * }
   *
   * @param args - The object containing Style Dictionary arguments.
   * @param args.dictionary - The dictionary of tokens.
   * @param args.file - The file being processed.
   * @param args.options - The options for the format.
   * @param args.options.outputReferences - Whether to include references in
   * the output.
   * @param args.options.namespace - The namespace to use for the generated
   * CSS class selector.
   */
  formatter: function (args) {
    const { dictionary, file, options } = args;
    const { outputReferences, namespace = 'paldea' } = options;
    const namespaceSelector = `.${namespace}-theme`;
    const header = StyleDictionary.formatHelpers.fileHeader({
      file,
      commentStyle: 'long'
    });
    return `${header}\n${namespaceSelector},\n:root {\n${StyleDictionary.formatHelpers.formattedVariables({ dictionary, outputReferences, format: 'css' })}\n}\n`;
  }
} as Format;
