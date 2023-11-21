import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
   
  message:string='';
  products:any[] = [];   //declare products array

  constructor(private http:HttpClient){}

  ngOnInit():void{
    this.fetchProducts();
  }
  
  fetchProducts(){
    this.http.get('http://localhost:3000/getProducts')
    .subscribe((response:any)=>
    {this.products =response},
    (error)=>{console.error('Error fetching the product',error);}
    );
  }

  deleteProduct(id:number){
    if(confirm('Are you sure you want to delete this product ?')){
      this.http.delete('http://localhost:3000/deleteProduct/' + id)
      .subscribe((response:any)=>
      {this.message =response.message; this.fetchProducts();},    //To refresh the page after deleting the product automatically, we call this.fetchProducts();
      (error)=>{console.error('Error deleting the product',error);}
      );
    }
  }
}

/*
* Note::
* Any operation that you wanted to load by default onto the page 
* without calling any function, then you write that particular logic in the ngOnInit() method.  
*/
