
import { fetchItem } from '@digitalculture/ochre-sdk';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const { error, item: set } = await fetchItem(
    '240e6e06-9d05-4210-aa83-f4190639886d',
    'set',
    'spatialUnit'
  );

  if (error !== null) {
    throw new Error('Failed to load item set');
  }

  return { set };
};
