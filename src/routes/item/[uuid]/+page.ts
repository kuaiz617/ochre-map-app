
import { fetchItem } from '@digitalculture/ochre-sdk';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const { error, item } = await fetchItem(params.uuid, 'spatialUnit');

  if (error !== null) {
    throw new Error('Failed to load item');
  }

  return { item };
};
