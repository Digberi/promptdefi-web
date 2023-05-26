import { FC as TFC, ReactNode } from 'react';

type EmptyObject = object;

export type CFC<P = EmptyObject> = TFC<P & { children?: ReactNode }>;
