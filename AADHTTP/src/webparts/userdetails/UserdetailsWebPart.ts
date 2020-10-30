import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'UserdetailsWebPartStrings';
import Userdetails from './components/Userdetails';
import { IUserdetailsProps } from './components/IUserdetailsProps';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';

export default class UserdetailsWebPart extends BaseClientSideWebPart<IUserdetailsProps> {
  private ApiUsersClient: AadHttpClient;
  protected onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      this.context.aadHttpClientFactory
        .getClient('https://pspversion1.onmicrosoft.com/b366f081-c722-4317-afb3-b679b9317f9f')
        .then((client: AadHttpClient): void => {
          this.ApiUsersClient = client;
          console.log(this.ApiUsersClient);
          resolve();
        }, err => reject(err));
    });
  }
  public render(): void {
    const element: React.ReactElement<IUserdetailsProps> = React.createElement(
      Userdetails,
      {
        description: this.properties.description,
        UserAPiClient:this.ApiUsersClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
