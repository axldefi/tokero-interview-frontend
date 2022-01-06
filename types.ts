export interface GetOperationTypeResults{
    data: OperationType[]
}

export interface Data{
    count: number;
    pages: number;
    next: number;
    prev: null;
}
    
export interface OperationType {
    id:   number;
    name: string;
}
