import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //To complete toDoList items from firebasedb
  toDoList: AngularFireList<any>
  constructor(private firebasedb: AngularFireDatabase) {}

  //In order to retrieve all the to do list items into the toDoList variable:

  getToDoItems() {
    this.toDoList = this.firebasedb.list('items');
    return this.toDoList;
  }


  //If we want to add items into firebasedb:
  addItems(title: string){
    this.toDoList.push({    //push comes from AngularFireList obj
      title: title,
      isChecked: false,
    });
  }


  editItems($key: string, title: string) {
    this.toDoList.update($key, {title: title})
  }


  setStateOfItem($key: string, flag: boolean){
    this.toDoList.update($key, {isChecked: flag});
  }

  removeItem($key: string){
    this.toDoList.remove($key).then(r => status);
  }


}
