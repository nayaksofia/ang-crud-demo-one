//dependencies
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const mysql=require('mysql2')


//define the express operation
const app= express();
const port =3000;


//defining the cors - cross origin by receiving the data in json format 
app.use(cors());
app.use(bodyParser.json());

//establish the connection with dB
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'db2',
    insecureAuth: true
});


//Verifying whether db is connected or not
db.connect(err=>{
    if(err){
        console.error('Connection is not established with the dB', err);
    }
    else{
        console.log('Connected to the db');
    }
});

app.listen(port,()=> {console.log('server port established on 3000')})

//to get all the products
app.get('/getProducts',(req,res)=> {
  const sql='select * from product';
  db.query(sql,(err,result)=>{
    if(err){
        console.error('Error in fetching all the products',err);
        res.status(500).json({error:'An error occured'});
    }else{
        res.status(200).json(result);
    }
    
  });
   
});

//to get a product on id
app.get('/getProduct/:id',(req,res)=> {
    const id=req.params.id;
    const sql='select * from product where id = ?';
    db.query(sql,[id],(err,result)=>{
      if(err){
          console.error('Error in fetching the product by id',err);
          res.status(500).json({error:'An error occured'});
      }else{
          res.status(200).json(result);
      }
      
    });
     
  });

//to insert product into db 
app.post('/addProduct', (req,res)=>{
        const {id,name,orderdate,ordertime}=req.body;
        const sql='insert into  product values(?,?,?,?)';//dynamic value
        db.query(sql,[id,name,orderdate,ordertime],(err,result)=>{
            if(err){
                console.error('Error in adding the product',err);
                res.status(500).json({error:'An error occured'});
            }else{
                res.status(200).json({message:'Product Added Successfully'});
            }
        });
       
    });

//updating of product
app.put('/updateProduct', (req,res)=>{
        const {id,name,orderdate,ordertime}=req.body;
        const sql='update product set name=?, orderdate=?, ordertime=? where id= ?';//dynamic value
        db.query(sql,[name,orderdate,ordertime,id],(err,result)=>{
            if(err){
                console.error('Error in updating the product',err);
                res.status(500).json({error:'An error occured'});
            }else{
                res.status(200).json({message:'Product Updated Successfully'});
            }
        });
       
    });

//deletion of product
app.delete('/deleteProduct/:id',(req,res)=> {
    const id=req.params.id;
    const sql='delete from product where id = ?';
    db.query(sql,[id],(err,result)=>{
      if(err){
          console.error('Error in deleteing the product by id',err);
          res.status(500).json({error:'An error occured'});
      }else{
          res.status(200).json({message:'Product Deleted Successfully'});
      }
    });  
  });