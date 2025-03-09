import StyleDictionary from 'style-dictionary';
import config from './config';
import * as customFormatters from './format';
import customTransforms from './transform';
/**
 * @see https://styledictionary.com/reference/utils/format-helpers/
 */
async function buildTokens() {
  try {
    StyleDictionary.registerFormat(customFormatters.cssNsVariables);
    StyleDictionary.registerTransform(customTransforms.prefix as any);
    StyleDictionary.extend(config).buildAllPlatforms();
  } catch (e) {
    console.error('Failed to build tokens');
    console.error(e);
  }
}

await buildTokens().then(() => {
  console.log('Done!');
});
