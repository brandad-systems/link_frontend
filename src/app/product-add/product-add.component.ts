import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductRequestModel} from "../../model/product-request.model";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";
import {FileUploadService} from "../services/file-upload.service";
import {HttpResponse} from "@angular/common/http";
import {ProductImage} from "../../model/product-image.model";
import {CategoryModel} from "../../model/category.model";
import {ConditionListModel} from "../../model/condition-list.model";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  selectedFiles!: FileList;
  slides: ProductImage[] = [];
  pricePerDay: string = "0.00";

  productAddForm: FormGroup = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      condition: ['', Validators.required],
      delivery: ['', Validators.required],
      pricePerDay: ['',Validators.required]
    }
  );
  currentSlide:number = 0;
  categoryList:CategoryModel []=[];
  conditionList: string []=[];



  constructor(private fb: FormBuilder, private productService: ProductService, private uploadService: FileUploadService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCategoriesList();
    this.getConditionList();
  }

  onSubmit() {
    let product: ProductRequestModel = this.productAddForm.value;
    this.productService.createProduct(product).subscribe(result =>
      this.router.navigate(['home'])
    );

  }

  uploadImages(event: any) {
    const files = event.target.files;
    let currentFile: File = event.target.files[0];

    this.uploadService.upload(currentFile).subscribe(event =>

      {
       if (event instanceof HttpResponse) {
         this.slides.push({
           headline: "test",
           src: 'http://127.0.0.1:9000/'+event.body.imagePath
         });
        }
      },
      err => {
      console.error("Something went wrong in uploading....")
      }
    );
  }

  getCategoriesList(){
    this.productService.getCategories().subscribe(result =>{
      this.categoryList=[...this.categoryList, ...result];
    });
  }

  private getConditionList() {
    this.productService.getConditions().subscribe(result =>{
      this.conditionList=[...this.conditionList, ...result.conditions];
    });
  }

  setCurrentSlide(idx: number) {
    this.currentSlide = idx;
  }


}
