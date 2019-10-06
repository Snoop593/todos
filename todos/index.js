let event1 = {
	id:1,
	date:  new Date(),
	event:"Автомойка",
	checked:false
}
let event2 = {
	id:2,
	date: new Date(),
	event:"Библиотека",
	checked:false
}

let event3={
	id:3,
	date: new Date(),
	event:"Парикмахерская",
	checked:false
}

let data = [event1,event2,event3];
let dateSelect = document.querySelector('input')
let context = document.querySelector('.context')
let left = document.querySelector('.left')

window.onload = ()=>{

	let today =  new Date();
	dateSelect.valueAsDate = today;
	loadEvent(today)
}

function loadTodayEvent(){
	let selectedDate = new Date(dateSelect.value);
	selectedDate.setHours(0,0,0,0);
	return data.filter(e=>{
		let com = e.date;
		com.setHours(0,0,0,0)
		if(com.getTime()===selectedDate.getTime())
			return e;
	})
}

function loadEvent(e){
	let todayEvent = loadTodayEvent(e) 	
	clear(context)
	let len = todayEvent.length
	left.innerHTML = `${len} ${len>1 ? "items" : "item"} left`
	if(len===0)context.innerHTML = "have a rest!"
	else{
		switch(e){
			case 'active':{
				todayEvent = todayEvent.filter(e=>e.checked===false)
				break;
			}
			case 'completed':{
				todayEvent = todayEvent.filter(e=>e.checked===true)
				break;
			}
		}
		let todo = todayEvent.map(e=>{
			let el = document.createElement("div")
			el.innerHTML = e.event
			el.id = e.id
			let check = document.createElement("input")
			check.type = "checkbox";
			check.checked=e.checked
			if(e.checked){
				el.style.textDecoration='line-through';
				el.style.backgroundColor='rgba(0,0,0,0.7)';
			} 
			check.addEventListener('change',changeEvent,false)
			el.append(check)
			return el
		})
		context.append(...todo)
	}
}

function clear(e){
	while(e.firstChild) e.removeChild(e.firstChild);
}

function changeEvent(e){
	let id = e.target.parentNode.id
	let a = data.find(el=>el.id==id)
	a.checked=!a.checked
	let el = document.getElementById(id);
	if(a.checked){
		el.style.textDecoration='line-through';
		el.style.backgroundColor='rgba(0,0,0,0.7)';
	}
	else{
		el.style.textDecoration='';
		el.style.backgroundColor='';
	}
}