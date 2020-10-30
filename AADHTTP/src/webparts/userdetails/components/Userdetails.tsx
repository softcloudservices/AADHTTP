import * as React from 'react';
import styles from './Userdetails.module.scss';
import { IUserdetailsProps } from './IUserdetailsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';
import {IListItem, IListItemColl} from '../components/IlistItems';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { IListViewState } from '../components/IListViewState';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
const viewFields: IViewField[] = [
{
  name: "empid",
  displayName: "EMPID",
  isResizable: true,
  sorting: true,
  minWidth: 0,
  maxWidth: 100
},
{
  name: "name",
  displayName: "Name",
  isResizable: true,
  sorting: true,
  minWidth: 0,
  maxWidth: 200
},
{
  name: "city",
  displayName: "City Name",
  isResizable: true,
  sorting: true,
  minWidth: 0,
  maxWidth: 150
},
{
  name: "gender",
  displayName: "Gender",
  isResizable: true,
  sorting: true,
  minWidth: 0,
  maxWidth: 75
},
{
  name: "technology",
  displayName: "Technology",
  isResizable: true,
  sorting: true,
  minWidth: 0,
  maxWidth: 120
},
{
  name: "language",
  displayName: "Language",
  isResizable: true,
  sorting: true,
  minWidth: 0,
  maxWidth: 120
},];

// const groupByFields: IGrouping[] = [
//   {
//     name: "Status",
//     order: GroupOrder.ascending
//   },];
export default class Userdetails extends React.Component<IUserdetailsProps,IListViewState > {
  private _items: IListItem[] = [];

  constructor(props: IUserdetailsProps, state: IListViewState) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      error: null
    };
  }

  public componentDidMount(): void {
    this._getItems();
  }
  public render(): React.ReactElement<IUserdetailsProps> {
    //console.log(this.state.items);
    const { items = [] } = this.state;
    return (
      <div >
        {
          this.state.loading && <Spinner label="Getting data from 3rd party API" size={SpinnerSize.large} />
        }
        {
          this.state.items && this.state.items.length > 0 ?(
<ListView
          items={this.state.items}
          viewFields={viewFields}
         // groupByFields={groupByFields}
          compact={true}
          selectionMode={SelectionMode.single}
          showFilter={true}
          filterPlaceHolder="Search..."
        />
          ):!this.state.loading && (
            this.state.error ?
              <span >{this.state.error}</span> :
              <span >No documents found</span>
          )}


      </div>
    );

  }
  public _getItems = (): void => {
    this.props.UserAPiClient.get('https://aadhttpdemo.azurewebsites.net/api/values', AadHttpClient.configurations.v1)
    .then((res: HttpClientResponse): Promise<any> => {
      return res.json();
    }).then((orders: any): void => {
      console.log(orders);
      this._items = orders;
      this.setState({
        items: orders,
        loading: false
      });
    }, (err: any): void => {
      console.log("erro");
    });
  }
}
