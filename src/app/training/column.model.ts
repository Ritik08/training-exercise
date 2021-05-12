export interface Column {
  columnDef: string;
  header: string;
  isSortable: boolean;
  cell: Function;
}
