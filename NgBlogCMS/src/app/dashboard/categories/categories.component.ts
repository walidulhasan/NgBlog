import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { CategoryModel } from 'src/app/models/category-model';
import { AuthorService } from 'src/app/services/author.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  addCatForm:FormGroup=new FormGroup({});
  Categories:any = [];
  CatEditInfo:any;
  dataSource: MatTableDataSource<CategoryModel> = new MatTableDataSource(this.Categories);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['CategoryId', 'Name', 'Action'];

  //spinner
  saving:boolean=false;

  //show hide id field
  showId:boolean = false;

  //show hide clear button
  showClearBtn:boolean = false;

  //todays date
  today:any="";
  token: any;
  authorDetails: any;

  constructor(private formBuilder:FormBuilder,
    private catservice:CategoryService,
    private _snackBar: MatSnackBar,
    private titleservice:Title,
    private authorservice:AuthorService) {
    this.titleservice.setTitle("Categories");
  }

  ngOnInit(): void {
    this.initialForm();
    this.getCats();
    this.getU();
  }

  getU(){
    this.token = localStorage.getItem('Mahmud_auth');
    if(this.token){
      this.authorservice.authorById(JSON.parse(atob(this.token.split('.')[1]))["iss"]).subscribe(x=>{
        this.authorDetails=x;
        if (this.authorDetails.role != "Admin") {
          window.location.href="/dashboard";
        }
      })
    }
  }

  //initial form fields
  initialForm(){
    this.addCatForm=this.formBuilder.group({
      'Id' : new FormControl(''),
      'Name' : new FormControl('',Validators.required)
    });
  }

  //get all author list
  getCats(){
    this.catservice.listCategories().subscribe(data => {
      this.Categories = data;
      this.dataSource.data=this.Categories;
      this.dataSource.paginator = this.paginator;
    });
  }

  //create createCat
  createCat(){
    //start loading
    this.saving=true;
    //get data from form
    const aId = {
      id: this.addCatForm.value["Id"],
    };
    const catSave={
      title: this.addCatForm.value["Name"],
    }
    const catUpdate={
      categoryid: this.addCatForm.value["Id"],
      title: this.addCatForm.value["Name"]
    }
    setTimeout(() => {
      if (aId.id == '') {
        this.catservice.addCat(catSave).subscribe(data=>{
          this.addCatForm.reset({});
          this.saving=false;
          this.getCats();
          let snackBarRef = this._snackBar.open('Category saved successfully', 'Ok');
          snackBarRef.afterDismissed().subscribe(() => {

          });
        },err=>{
          console.log(err);
        })
      }
      else if (aId.id != '') {
        this.catservice.catUpdateBy(aId.id, catUpdate).subscribe(data=>{
          this.addCatForm.reset({});
          this.showClearBtn = false;
          this.saving=false;
          this.getCats();
          let snackBarRef = this._snackBar.open('Category updated successfully', 'Ok');
          snackBarRef.afterDismissed().subscribe(() => {

          });
        },err=>{
          console.log(err);
        })
      }
    }, 1500);
  }

  //clear form
  clearForm(){
    this.addCatForm.reset();
    this.showId = false;
    this.showClearBtn = false;
  }

  //edit cat
  editCat(id:any){
    this.showId=true;
    this.showClearBtn = true;
    const newLocal = this;
    newLocal.catservice.CatById(id).subscribe(a=>{
      this.CatEditInfo=a;
      this.addCatForm=this.formBuilder.group({
        'Id' : new FormControl(this.CatEditInfo.categoryId,Validators.required),
        'Name' : new FormControl(this.CatEditInfo.title,Validators.required),
      });
    })
  }
}
