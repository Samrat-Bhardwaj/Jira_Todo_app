let inputBox = document.querySelector(".input-box");
let tasks= document.querySelector(".task-list");
// event listeners 

// async code 
inputBox.addEventListener("keypress",function(e){
    // here e is the even given by event listener 
    if(e.code=="Enter" && inputBox.value!=""){
        console.log(inputBox.value);

        // naya li bana
        var li=document.createElement("li");

        // li m naya text ghusa
        li.innerText=inputBox.value;

        // class banadi us li ki 
        li.setAttribute("class","task");

        // ul m li ghusa
        tasks.append(li);

        // box khali
        inputBox.value="";

        // ye code yahi aayega because li jab banega tabhi delete karskte
        li.addEventListener("click",function(e){
            if(e.detail==3){
                li.remove();
            }
        })
    }
})