const chatBox = document.getElementById("chat-box");

function addMessage(message, sender){

    const div = document.createElement("div");

    div.classList.add("message");

    div.classList.add(sender);

    div.innerHTML = message;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage(){

    const input = document.getElementById("message");

    const message = input.value.trim();

    if(message==="") return;

    addMessage(message,"user");

    fetch("/chat",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            message:message
        })

    })

    .then(response=>response.json())

    .then(data=>{

        addMessage(data.reply,"bot");

    });

    input.value="";
}

document.getElementById("message")
.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        sendMessage();
    }

});