import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  //Declaration and Initialisation
  message: string = '';
  products: any[] = [];   //declare products array

  //take object
  constructor(private http: HttpClient) { }
 
  //View the detail products by default on the webpage
  ngOnInit(): void {
    this.fetchProducts();  //Any operation that loaded by default , call it in ngOnInit() 
  }

  //Fetch the detail products:: To retrive/fetch the list of datas(products) from database and show in view page 
  fetchProducts() {
    this.http.get('http://localhost:3000/getProducts')   //getProducts to load data
      .subscribe((response: any) => { this.products = response },
        (error) => { console.error('Error fetching the product', error); }
      );
  }
  
  //Delete the product:: To delete product by particular id 
  //Refresh the page after deletion 
  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product ?')) {
      this.http.delete('http://localhost:3000/deleteProduct/' + id)
        .subscribe((response: any) => { this.message = response.message; this.fetchProducts(); },    //To refresh the page after deleting the product automatically, we call this.fetchProducts();
          (error) => { console.error('Error deleting the product', error); }
        );
    }
  }
}

/*
* Note::
* Any operation that you wanted to load by default onto the page 
* without calling any function, then you write that particular logic in the ngOnInit() method.  
*/
