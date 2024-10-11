// Solution from https://github.com/pmndrs/zustand/discussions/991
// To remove manual store typing
export type InferZustandParams<T extends { setState: unknown; getState: unknown }> = [T['setState'], T['getState'], T];
export type ZustandStoreType<T extends { getState: () => unknown }> = ReturnType<T['getState']>;

export type CreatePayloadFromModel<T> = Omit<T, 'createdAt' | 'updatedAt' | 'id'>;
export type UpdatePayloadFromModel<T> = Partial<CreatePayloadFromModel<T>>;
