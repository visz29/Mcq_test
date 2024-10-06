
const language = [
    {
      question: "What is the output of the following code?\n\nlet numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers[3]);",
      options: {
        a: "4",
        b: "5",
        c: "3",
        d: "2"
      },
      answer: "a"
    },
    {
      question: "Which method is used to add new elements to the end of an array?",
      options: {
        a: "append()",
        b: "push()",
        c: "addToEnd()",
        d: "insertEnd()"
      },
      answer: "b"
    },
    {
      question: "What does the following code do?\n\nlet fruits = ['apple', 'banana', 'orange'];\nfruits.pop();",
      options: {
        a: "Removes the first element",
        b: "Removes the last element",
        c: "Adds a new element to the end",
        d: "Adds a new element to the beginning"
      },
      answer: "b"
    },
    {
      question: "How do you access the value 'banana' from the following array?\n\nlet fruits = ['apple', 'banana', 'orange'];",
      options: {
        a: "fruits[0]",
        b: "fruits[1]",
        c: "fruits['banana']",
        d: "fruits.value('banana')"
      },
      answer: "b"
    },
    {
      question: "Which method can be used to remove an element from a specific index in an array?",
      options: {
        a: "remove()",
        b: "delete()",
        c: "splice()",
        d: "pop()"
      },
      answer: "c"
    }
  ];

let question_array = []
let result_array = []
function create_structure_array(){
    language.forEach((e,i)=>{
        let question = document.createElement("div")
    question.className = "question"
    question.innerHTML = `<h1 id="${i}">${e.question}</h1>`

    for(j=97; j<=100 ; j++){
        let div = document.createElement("div")
        div.className = "ques"
        div.id = String.fromCharCode(j)
        div.innerText = eval("e.options."+String.fromCharCode(j))
        question.appendChild(div)


    }
    question_array.push(question)
    })
    // console.log(question_array);
    
}
create_structure_array()

let index = 0

function question_show(i){
    let main = document.querySelector("main")

    if(main.childElementCount == 2){
        main.removeChild(main.children[1])
    }
    main.appendChild(question_array[i])
    
    
    if(i == language.length-1){
        let btns = document.querySelectorAll(".btn")
        // console.log(btns[1]);
        btns[1].innerText = "Submit"
        // btns[1].className = "btn submit"
        btns[1].style.backgroundColor = "#19ffc7a8"
        console.log("submit function call");
             
    }else{
        let btns = document.querySelectorAll(".btn")
        // console.log(btns[1]);
        btns[1].innerText = "Next"
        // btns[1].className = "btn"
        btns[1].style.backgroundColor = "transparent"
    }
    click_ans()
}


question_show(index)

let buttons = document.querySelectorAll("button")
buttons.forEach((e)=>{
    e.addEventListener("click",()=>{
        
        if(e.innerText == "Next" && index < language.length-1){
            index++
            question_show(index)
        }else if(e.innerText == "Prev" && index > 0){
            index--
            question_show(index)
        }else if(e.innerText == "Submit" && index == language.length-1){
            submit()
            // console.log("submit");
            
        }       
    }) 
})

function click_ans(){
let ques = document.querySelectorAll(".ques")

ques.forEach((e,i)=>{
    e.addEventListener("click",()=>{
        e.style.background = "rgba(144, 238, 144, 0.344)"
        
        ques.forEach((el,j)=>{
            if(j != i){
                el.style.background = "transparent"
            }
        })
        
    })
    
})
}

function submit(){
    console.log("submit function");
    let compulsory = 0
    result_count = 0
    question_array.forEach((e)=>{
        // console.log(e.children[4]);
        let childs = e.children
        let user_qs_no = e.children[0].id
        
        for(i=1; i<=4  ;i++ ){
            if(e.children[i].style.background != "transparent" && e.children[i].style.background.length != 0){
                compulsory++
                console.log(e.children[i].id,user_qs_no);
                if(language[user_qs_no].answer == e.children[i].id){
                    result_array[user_qs_no] = 1
                    result_count++
                }else{
                    result_array[user_qs_no] = 0

                }
            }     
        }
    })
    console.log(compulsory);
    if(compulsory < language.length){
        alert("Please complete the test")
    }else{
        console.log(result_array);
        let result_box = document.querySelector(".result")
        result_box.style.display = "flex";
        result_box.innerHTML = `${language.length}/${result_count}`
        
        let answer_box = document.querySelector(".answers")
        answer_box.style.display = "flex";
        show_answers()
    }
}

function show_answers(){
    let answer_box = document.querySelector(".answers")
    answer_box.addEventListener("click",(e)=>{
        answer_box.innerHTML = ""
        answer_box.style.display = "flex";

        answer_box.className = "minAnswers"
        answer_box.style.top = `${window.innerHeight-5}px`
        
        
        // answer_box.style.background = "#ccb5ef";
        // answer_box.style.flexDirection = "column";
        // answer_box.style.width = "100%";
        // answer_box.style.height = "auto";
        // answer_box.style.top = "120%";
        // answer_box.style.alignItems = "flex-start";
        // answer_box.style.position = "relative";

        question_array.forEach((e,i)=>{
            console.log(e);
            let h1 = document.createElement("h1")
            h1.innerHTML = `Answer : ${language[i].answer}`
            // e.style.margin = "5%";
            // e.style.color = "white"
            e.appendChild(h1)
            answer_box.appendChild(e)
            if(result_array[i] == 0){
                let childs = e.children
                for(j=1; j<=4  ;j++ ){
                    e.children[j].innerText = `${e.children[j].id} : `+ e.children[j].innerText
                    if(e.children[j].style.background != "transparent" ){
                        e.children[j].style.background = "rgb(243 45 80" 
                        e.children[j].style.borderRadius = "calc(0.5vh + 0.5vw)" 
                        
                    }     
                }
            } 
            
            if(result_array[i] == 1){
                for(j=1; j<=4; j++){
                    e.children[j].innerText = `${e.children[j].id} : `+ e.children[j].innerText
                    e.children[j].style.borderRadius = "calc(0.5vh + 0.5vw)" 
                }
            }
        })
        answer_box.style.pointerEvents="none";
        e.preventDefault()
        window.scrollBy(0, 50)
        
        
    })
    
}

