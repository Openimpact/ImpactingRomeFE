import {
  QueryFilter,
  RegularCollections,
  RestClient,
  UnpackList,
  createItem,
  createItems,
  deleteItem,
  readItem,
  readItems,
  updateItem,
} from "@directus/sdk";
import { CustomDirectusTypes } from "./types";

export class Repository<Collection extends keyof CustomDirectusTypes> {
  collectionName: RegularCollections<CustomDirectusTypes>;
  client: RestClient<CustomDirectusTypes>;
  constructor(
    client: RestClient<CustomDirectusTypes>,
    collectionName: RegularCollections<CustomDirectusTypes>
  ) {
    this.collectionName = collectionName;
    this.client = client;
  }

  async createItem(item: Partial<UnpackList<CustomDirectusTypes[Collection]>>) {
    return await this.client.request(createItem(this.collectionName, item));
  }

  async createItems(
    items: Partial<UnpackList<CustomDirectusTypes[Collection]>>[]
  ) {
    return await this.client.request(createItems(this.collectionName, items));
  }

  async readItem(key: string | number, fields?: string[] | undefined) {
    const response = await this.client.request(
      readItem(this.collectionName, key, { fields })
    );
    console.log(JSON.stringify(response, null, 2));
    return response;
  }

  async readItems(
    fields?: string[],
    filter?: QueryFilter<CustomDirectusTypes, Collection>,
    limit?: number
  ) {
    return await this.client.request(
      //@ts-ignore
      readItems(this.collectionName, { fields, filter: {
        ...filter,
        "status": {
          "_in" : ["published","draft"]
        }
      }, limit: limit ?? 180 })
    );
  }
  async search(fields?: string[], search?: string, limit?: number) {
    return await this.client.request(
      //@ts-ignore
      readItems(this.collectionName, {
        fields,
        search,
        limit: limit ?? 100,
      })
    );
  }

  async updateItem(
    key: string | number,
    item: Partial<UnpackList<CustomDirectusTypes[Collection]>>
  ) {
    return await this.client.request(
      updateItem(this.collectionName, key, item)
    );
  }

  async deleteItem(key: string | number) {
    return await this.client.request(deleteItem(this.collectionName, key));
  }
}
