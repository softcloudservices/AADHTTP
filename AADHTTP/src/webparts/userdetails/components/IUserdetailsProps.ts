import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';
export interface IUserdetailsProps {
  description: string;
  UserAPiClient:AadHttpClient;
}
