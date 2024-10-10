export type CreateDTOFromModel<T> = Omit<T, 'createdAt' | 'updatedAt' | 'id'>;
export type UpdateDTOFromModel<T> = Partial<CreateDTOFromModel<T>>;
