import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  //Declaration and Initialisation
  id: number = 0;
  name: string = '';
  orderdate: string = '';
  ordertime: string = '';
  message: string = '';

  //Create object to http client inside constructor 
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  //Add Product Method 
  addProduct() {
    //creating JSHON object
    const product = {
      id: this.id,
      name: this.name,
      orderdate: this.orderdate,
      ordertime: this.ordertime
    };

    this.http.post('http://localhost:3000/addProduct', product)
      .subscribe((response: any) => { this.message = response.message },

        (error) => { console.error('Error adding the product', error); }
      )
  }

}

/* Notes For Self:: 
 * [(ngModel)] is going to update the data here .
 * Create an object to http client inside constructor. 
 * Let's create a JSHON Object here. It is given as input to the /addProduct of server.js file. 
*/