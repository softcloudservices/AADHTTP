import {IListItem, IListItemColl} from '../components/IlistItems';
export interface IListViewState{
  items?: IListItem[];
  loading: boolean;
  error: string;
}
