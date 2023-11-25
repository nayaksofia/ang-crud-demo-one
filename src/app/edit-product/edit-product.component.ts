import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  //Declaration and Initialisation
  id: number = 0;
  name: string = '';
  orderdate: string = '';
  ordertime: string = '';
  message: string = '';

  //Take object route and router 
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }


  //Need to display the deatils by default and updated: ngOnInit()
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {   //Here, I put assignment operator(=) in place of strictly-equal operator(==) ::my mistake
        this.id = +idParam;
        this.fetchProduct(); //calling fetchProduct()
      } else {
        console.error("id is missing or null");
      }
    }
    )
  }

  //Need to fetch the detail list of product by id : using fetchProduct()
  //getProduct/:id 
  fetchProduct() {
    this.http.get('http://localhost:3000/getProduct/' + this.id)
      .subscribe((response: any) => {
        const product = response[0];

        this.name = product.name;
        this.orderdate = product.orderdate;  //Issue: Date is updating but before it , not showing in edit page .
        this.ordertime = product.ordertime;
        this.message = response.message;
      },
        (error) => { console.error('Error fetching the product', error); }
      );
  }

  //Need to update the product , which is in JSHON format 
  updateProduct() {

    //creating JSHON object
    const product = {
      id: this.id,
      name: this.name,
      orderdate: this.orderdate,
      ordertime: this.ordertime
    };

    console.log('Updating product:', product); // Log the data you're sending

    this.http.put('http://localhost:3000/updateProduct', product)
      .subscribe((response: any) => { 
        console.log('Product update response:', response);
        this.message = response.message; 
        this.router.navigate(['/view']);     //you will be redirected to the respective view 
      }, 

        (error) => { console.error('Error updating the product', error); 
      }
      );
  }

}
