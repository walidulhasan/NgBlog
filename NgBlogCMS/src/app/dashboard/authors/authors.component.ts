import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';

import { Authorsmodel } from 'src/app/models/authorsmodel';
import { AuthorService } from 'src/app/services/author.service';

var md5=require("blueimp-md5");

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  addAuthorForm:FormGroup=new FormGroup({});
  authors:any = [];
  authorEditInfo:any;
  dataSource: MatTableDataSource<Authorsmodel> = new MatTableDataSource(this.authors);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['AuthorId', 'Image', 'Name', 'Email', 'Action'];


  //spinner
  saving:boolean=false;

  //show hide id field
  showId:boolean = false;

  //show hide clear button
  showClearBtn:boolean = false;

  //token
  today:any="";
  token: any;
  authorDetails: any;

  constructor(private formBuilder:FormBuilder,
    private authorservice:AuthorService,
    private _snackBar: MatSnackBar,
    private titleservice:Title) {
    this.titleservice.setTitle("Authors");
  }

  getCommenterPic(email:string){
    return "https://gravatar.com/avatar/"+md5(email);
  }

  ngOnInit(): void {
    this.getAuthors();
    this.getU();
    this.initialForm();
  }

  getU(){
    this.token = localStorage.getItem('Mahmud_auth');
    if(this.token){
      this.authorservice.authorById(JSON.parse(atob(this.token.split('.')[1]))["iss"]).subscribe(x=>{
        this.authorDetails=x;
        if (this.authorDetails?.role != "Admin") {
          window.location.href="/dashboard";
        }
      })
    }
  }

  //initial form fields
  initialForm(){
    this.addAuthorForm=this.formBuilder.group({
      'Id' : new FormControl(''),
      'Name' : new FormControl('',Validators.required),
      'Dob' : new FormControl('',Validators.required),
      'About' : new FormControl('',Validators.required),
      'Role' : new FormControl('',Validators.required),
      'Email' : new FormControl('',Validators.required),
      'Password' : new FormControl('',Validators.required),
    });
  }

  //create user
  createAuthor(){
    //start loading
    this.saving=true;
    //get data from form
    const aId = {
      id: this.addAuthorForm.value["Id"],
    };
    const authorSave={
      name: this.addAuthorForm.value["Name"],
      about: this.addAuthorForm.value["About"],
      dob: this.addAuthorForm.value["Dob"],
      role: this.addAuthorForm.value["Role"],
      email: this.addAuthorForm.value["Email"],
      password: this.addAuthorForm.value["Password"]
    }
    const authorUpdate={
      authorId: this.addAuthorForm.value["Id"],
      name: this.addAuthorForm.value["Name"],
      about: this.addAuthorForm.value["About"],
      dob: this.addAuthorForm.value["Dob"],
      role: this.addAuthorForm.value["Role"],
      email: this.addAuthorForm.value["Email"],
      password: this.addAuthorForm.value["Password"]
    }
    setTimeout(() => {
      if (aId.id == '') {
        this.authorservice.addAuthor(authorSave).subscribe(data=>{
          this.addAuthorForm.reset({});
          this.saving=false;

          let snackBarRef = this._snackBar.open('Author saved successfully', 'Ok');
          snackBarRef.afterDismissed().subscribe(() => {
            this.getAuthors();
          });
        },err=>{
          console.log(err);
        })
      }
      else if (aId.id != '') {
        this.authorservice.authorUpdateBy(aId.id, authorUpdate).subscribe(data=>{
          this.addAuthorForm.reset({});
          this.saving=false;
          this.showClearBtn = false;
          this.getAuthors();
          let snackBarRef = this._snackBar.open('Author updated successfully', 'Ok');
          snackBarRef.afterDismissed().subscribe(() => {

          });
        },err=>{
          console.log(err);
        })
      }
    }, 1500);
  }

  //get all author list
  getAuthors(){
    this.authorservice.listAuthors().subscribe(data => {
      this.authors = data;
      this.dataSource.data=this.authors;
      this.dataSource.paginator = this.paginator;
    });
  }

  //edit author
  editAuthor(id:any){
    this.showId=true;
    this.showClearBtn = true;
    const newLocal = this;
    newLocal.authorservice.authorById(id).subscribe(a=>{
      this.authorEditInfo=a;
      this.addAuthorForm=this.formBuilder.group({
        'Id' : new FormControl(this.authorEditInfo.authorId,Validators.required),
        'Name' : new FormControl(this.authorEditInfo.name,Validators.required),
        'Dob' : new FormControl(this.authorEditInfo.dob,Validators.required),
        'Role' : new FormControl(this.authorEditInfo.role,Validators.required),
        'About' : new FormControl(this.authorEditInfo.about,Validators.required),
        'Email' : new FormControl(this.authorEditInfo.email,Validators.required),
        'Password' : new FormControl(this.authorEditInfo.password,Validators.required),
      });
    })
  }

  //clear form
  clearForm(){
    this.addAuthorForm.reset();
    this.showId = false;
    this.showClearBtn = false;
  }

}
