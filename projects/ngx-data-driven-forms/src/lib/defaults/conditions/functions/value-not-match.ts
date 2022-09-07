import { ConditionFn } from '../../../core';

export const valueNotMatch: ConditionFn = (left: unknown, right: unknown) => {
  const l = left as any;
  const r = right as any;
  if (l === undefined) return false;
  return l !== r;
};
