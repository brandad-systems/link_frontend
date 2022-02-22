import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../model/product.model";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";
import {FileUploadService} from "../services/file-upload.service";
import {HttpResponse} from "@angular/common/http";
import {ProductImage} from "../../model/productImages.model";
import {Slide} from "../carousel/carousel.interface";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  selectedFiles!: FileList;
  slides: ProductImage[] = []

  /*slides: Slide[] = [
    {
      headline: "For Your Current Mood",
      src:
        "https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
    },
    {
      headline: "Miouw",
      src:
        "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
    },
    {
      headline: "In The Wilderness",
      src:
        "https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80"
    },
    {
      headline: "Focus On The Writing",
      src:
        "https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
    }
  ];
*/

  productAddForm: FormGroup = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      condition: ['', Validators.required],
      delivery: ['', Validators.required]
    }
  );

  constructor(private fb: FormBuilder, private productService: ProductService, private uploadService: FileUploadService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let product: Product = this.productAddForm.value;
    this.productService.addProduct(product).subscribe(result =>
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


}
