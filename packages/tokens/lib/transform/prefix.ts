import { type Transform } from 'style-dictionary';

export default {
  name: 'custom/name/prefix',
  type: 'name' as const,
  transitive: true,
  matcher: undefined,
  transformer: (token, platform) => {
    const namespace = platform?.options?.namespace;
    if (!namespace)
      throw new Error("To build tokens for the 'paldea' brand, a namespace must be provided.");
    return namespace + '-' + token.name;
  }
} as Transform;
