import {Injectable} from '@angular/core';
import {Item} from "../models/Item";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemObservable = new BehaviorSubject<Array<Item>>([]);

  constructor(private httpClient: HttpClient) {
    this.readItems();
  }

  getItemList() {
    return this.itemObservable.asObservable();
  }

  createItem(item:Item) {
    let body = {
      "title": item.title,
      "description": item.description,
      "category": item.category,
      "price": item.price,
      "imageUrl": item.imageUrl,
    }
    let headers = new HttpHeaders();
    headers.set("CONTENT-TYPE","APPLICATION/json")
    this.httpClient.post(`${environment.apiUrl}/item`, body,{headers: headers}).subscribe((response:any) => {
      console.log("Create item response")
      console.log(response);
      alert(response.message);
      this.readItems();
    });
  }

  updateItem(item:Item) {
    let body = {
      "id": item.id,
      "title": item.title,
      "description": item.description,
      "category": item.category,
      "price": item.price,
      "imageUrl": item.imageUrl,
    }
    this.httpClient.patch(`${environment.apiUrl}/item`, body).subscribe((response:any) => {
      console.log("Update item response")
      console.log(response);
      alert(response.message);
      this.readItems();
    });
  }

  deleteItem(id:string) {
    this.httpClient.delete(`${environment.apiUrl}/item${id}`).subscribe((response:any) => {
      console.log("Delete item response")
      console.log(response);
      alert(response.message);

      this.readItems();
    });
  }

  readItems() {
    this.httpClient.get(`${environment.apiUrl}/items`).subscribe((response:any) => {
      console.log(response);

      this.itemObservable.next(response.data);
    });
  }
}
