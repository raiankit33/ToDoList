import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from './sercice/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todolist';
  allList: any = [];
  pending: any;
  checkbox: any
  isLoadings: boolean = false
  afterClick: any;
  allLists: any = [];
  completeList: any = [];
  isActive:boolean = true;
  isCompleted:boolean = false
  taskdonelength:any
  constructor(private service: ServiceService) {

  }

  ngOnInit(): void {
    this.getEntries()
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
  })

  checkForm = new FormGroup({
    checkname: new FormControl('', Validators.required),
  })


  addToDolistData() {
    let payload = {
      name: this.form.value.name
    }
    console.log(payload)
    
    this.isLoadings = true
    this.service.addTodoList(payload).subscribe((res: any) => {
      this.getEntries()
      this.isLoadings = false
      this.form.reset()
    })
  }

  active() {
   this.isActive = true
   this.isCompleted = false
  }

  completed() {
 this.isCompleted = true
 this.isActive =false
  }

  getEntries() {
    this.service.getTodoList().subscribe((res: any) => {
      this.allList = res.entries
      this.allLists = this.allList.filter((res: any) => res.completed == false).sort((a:any,b:any)=> {
        var da :any= new Date(a.createdAt);
         var db :any= new Date(b.createdAt);
      return db- da;
      })
    
      this.pending = this.allLists.length

      this.completeList = this.allList.filter((r: any) => r.completed == true).sort((a:any,b:any)=> {
        var da :any= new Date(a.createdAt);
         var db :any= new Date(b.createdAt);
      return db- da;
      })
      this.taskdonelength = this.completeList.length
      this.checkForm.get('checkname')?.setValue(true);
    })
  }

  deleteEntries(data: any) {
    let delPayload = {
      "docid": data._id,
      "docrev": data._rev
    }
  //   let index = this.allLists.findIndex((element:any) => element._id === data._id)
  //   this.allLists.splice(index,1) 
   

  //  let indexs = this.completeList.findIndex((element:any) => element._id === data._id)
  //  this.completeList.splice(indexs,1) 

    this.service.deleteTOdoList(delPayload).subscribe((res: any) => {
    
      this.getEntries()
    })
  }


  powerButton(e: any, data: any) {
    if (e.target.checked == true) {
      console.log("true")
      this.afterClick = true;
      let index = this.allLists.findIndex((element:any) => element._id === data._id)
      this.allLists.splice(index,1)
      
  
      this.completeList.push({
        "_id": data._id,
        "_rev": data._rev,
        "completed": this.afterClick,
        "createdAt": data.createdAt,
        "name": data.name
      }) 
      // console.log(this.completeList)
      this.updateEntries(data)
    }
    else {
      console.log("false")
      this.afterClick = false;
      let index = this.completeList.findIndex((element:any) => element._id === data._id)
      this.completeList.splice(index,1)
  
      this.allLists.push({
        "_id": data._id,
        "_rev": data._rev,
        "completed": this.afterClick,
        "createdAt": data.createdAt,
        "name": data.name
      }) 
      this.updateEntries(data)
    }
  }


  updateEntries(data: any) {


    let delPayload = {
      "doc": {
        "_id": data._id,
        "_rev": data._rev,
        "completed": this.afterClick,
        "createdAt": data.createdAt,
        "name": data.name
      }

    }
   // console.log(delPayload)


    this.service.updateTodoList(delPayload).subscribe((res: any) => {
      this.getEntries()
    })
  }

}
