import { Component, OnInit } from '@angular/core';
import {TodoService} from "./shared/todo.service";
import {element} from "protractor";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(200, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]),

    ])
  ]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  //Have to declare a private parameter inside the component constructor
  constructor(private todoService: TodoService) { }
  edit = false

  ngOnInit(): void {
    this.todoService.getToDoItems().snapshotChanges().subscribe(item => {
      this.toDoListArray = [] //initialize to empty array first
      item.forEach(element => {
        var x = element.payload.toJSON(); //returns a JSON object
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })
      //Whenever we make changes inside the database,
      //subscribe function will be called and our array will be updated.


      //We can also sort our array based on their checked/unchecked status
      this.toDoListArray.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })
      //Unchecked items will be on top of the list
    });
  }

  //On clicking plus button this function will receive the input
  onAdd(itemTitle){
    this.todoService.addItems(itemTitle.value); //we pass in text box's value into it
    itemTitle.value = null; //then we reset the text box to its initial state
  }

  //Toggle between check or uncheck

  alterState($key: string, isChecked){
    this.todoService.setStateOfItem($key, !isChecked);
  }

  onDelete($key: string){
    this.todoService.removeItem($key);
  }

  onEdit($key: string, itemTitle){
    this.todoService.editItems($key, itemTitle.value)
  }

}
