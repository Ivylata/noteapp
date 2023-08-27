const btn1 = document.getElementById("btn");
const app1 = document.getElementById("app");

getNote().forEach((note) => {
    const note1 = createNoteElement(note.id, note.content );
    app1.insertBefore(note1,btn1);
});

function createNoteElement(id, content){
const element = document.createElement("textarea")
element.classList.add("note");
element.placeholder = "Empty Note";
element.value = content;

element.addEventListener("dblclick",()=>{
    const warning = confirm("Do you want to delete this note?");
    if(warning){
        deletenote(id,element);
    }
});

element.addEventListener("input",()=>{
    updatenote(id,element.value);
});

return element;
}

function deletenote(id, element){
    const notes = getNote().filter((note)=>note.id !== id);
 saveNote(notes);
 app1.removeChild(element);
}

function updatenote(id, content){

    const notes = getNote();
    const target = notes.filter((note)=>note.id == id)[0];
    target.content = content;
    saveNote(notes);
}

function addNote(){

    const notes = getNote();
    const noteObj ={
        id : Math.floor(Math.random() *100000),
        content: "",
    };
   const note1 = createNoteElement(noteObj.id, noteObj.content);
   app1.insertBefore(note1,btn1);

   notes.push(noteObj);
   saveNote(notes)
}
function saveNote(notes){

    localStorage.setItem("note-app",JSON.stringify(notes))

}

function getNote(){
   return JSON.parse(localStorage.getItem("note-app") || "[]");
}
btn1.addEventListener("click", addNote); 