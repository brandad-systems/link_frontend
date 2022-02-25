import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CategoryModel} from "../../model/category.model";
import {ConditionListModel} from "../../model/condition-list.model";
import {ProductRequestModel} from "../../model/product-request.model";
import {ProductResponseModel} from "../../model/product-response.model";

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  let baseUrl: String = 'http://localhost:8080/api/v1/product';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach( () =>{
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get categories from backend', () => {
    //given
    let expected: CategoryModel [] = [{category: 'test', subcategories: ['test1', 'test2']}];
    //then
    service.getCategories().subscribe(result => {
        expect(result).toEqual(expected);
      });
    const request = httpTestingController.expectOne(`${baseUrl}/categories`);
    expect(request.request.method).toEqual('GET');
    //when
    request.flush(expected);
  });

  it('should get conditions from backend', () => {
    //given
    let expected: ConditionListModel =  {conditions: ['gut', 'schlecht']};
    //when
    service.getConditions().subscribe(result => {
      //then
      expect(result).toEqual(expected);
    });
    //then
    const request = httpTestingController.expectOne(`${baseUrl}/conditions`);
    expect(request.request.method).toEqual('GET');
    //when
    request.flush(expected);
  });

  it('should send new product to backend', () => {
    //given
    let product: ProductRequestModel = {title: 'testproduct', category: 'werkzeug', description: 'test', condition: 'gut', pricePerDay: 1.00, pictureIds: ['pid1']};
    let expected: ProductResponseModel = {id:'3AE8B',title: 'testproduct', category: 'werkzeug', description: 'test', condition: 'gut', pricePerDay: 1.00, pictureIds: ['pid1']};
    //when
    service.createProduct(product).subscribe(result => {
      //then
      expect(result).toEqual(expected);
    });
    //then
    const request = httpTestingController.expectOne(`${baseUrl}`);
    expect(request.request.method).toEqual("POST");
    expect(request.request.body).toEqual(product);
    //when
    request.flush(expected);
  });



});
