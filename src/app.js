const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast=require('./utils/forecast')
const geocode= require('./utils/geocode')
    

const app=express()
//Define paths for express config 
const publicpath= path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')


//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

//setup static directory to serve
app.use(express.static(publicpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Index',
        Content:'WEATHER FORECAST',
        createdby:'someone'        
           }) 
})

app.get('/help',(req,res)=>{
    res.render('help',{
      title:'Help',
      Content:'Help of site development',
      createdby:'someone'
        
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        Content:'About of site development',
        createdby:'someone'
    })
})

app.get('/weather',(req,res)=>{
    const address=req.query.address
    if(!address){
        return res.send({
            error:'Please provide address to weather forecast'
        })
    }
        else geocode(address,(error,{latitude,longitude,location}={})=> {
        if(error){
            return res.send({error})  //res.send({error:error})
        }
        forecast(latitude,longitude,(error,{data,url}={})=>{
            if(error){
                return res.send({error})
            }
        // console.log(url)
        // console.log(location)
        // console.log(address) 
    res.send({
        address,//address:address,
        location,//location : location,
        forecast:data,
        url
            })
                })
            })
        })


app.get('/products',(req,res)=>{
    if(!req.query.search){ 
        return res.send({
            error:'Please provide search tern to search'
        })
    }
        console.log(req.query.search)
        res.send({
        products:[]
    })
})

    app.get('/help/*',(req,res)=>{
        res.render('404',{
            errormsg:'Help article not found',
            Content:'404 error page',
            
        })
    })
    app.get('*',(req,res)=>{
        res.render('404',{
            errormsg:'page not there',
            Content:'404 error page',
           
        })
    })
app.listen(8080,()=>{
    console.log('Port 8080 opened!!!!!!')

})


