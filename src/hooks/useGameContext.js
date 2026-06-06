import { useContext } from 'react';

import { gameContext } from '@/contexts';

export function useGameContext() {
  return useContext(context);
}
