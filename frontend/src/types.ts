// Solution from https://github.com/pmndrs/zustand/discussions/991
// To remove manual store typing
export type InferZustandParams<T extends { setState: any; getState: any }> = [T['setState'], T['getState'], T];
export type ZustandStoreType<T extends { getState: () => unknown }> = ReturnType<T['getState']>;
