export interface IListItem {
  empid: number;
  name: string;
  city: string;
  gender: string;
  technology: string;
  language: string;
}

export interface IListItemColl {
  value: IListItem[];
}
