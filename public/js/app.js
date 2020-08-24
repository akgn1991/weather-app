
const weatherform = document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#message1')
const messagetwo=document.querySelector('#message2')
const messagethree=document.querySelector('#message3')
// const messagethree=document.getElementById('message3')

weatherform.addEventListener('submit',(e)=>{
e.preventDefault()
const location=search.value
if(location.length===0){
    messageone.textContent='Enter location to forcast the weather'
    messagetwo.textContent=''
}
else{
messageone.textContent='Loading...'
messagetwo.textContent=''

fetch('http://localhost:8080/weather?address='+location).then((response)=>{
    response.json().then((data1)=>{
        if(data1.error){
            messageone.textContent=data1.error
            messagetwo.textContent=''
        }else{
            messageone.textContent=data1.location
            messagetwo.textContent=data1.forecast
           
        }
        
    })
})
}
})