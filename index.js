var event1 = {
	id:1,
	date:  new Date(),
	event:"Автомойка",
	checked:false
}
var event2 = {
	id:2,
	date: new Date(+2),
	event:"Библиотека",
	checked:false
}

var event3={
	id:3,
	date: new Date(),
	event:"Парикмахерская",
	checked:false
}

var data = [event1,event2,event3];
var inputs = document.querySelectorAll('input')
var section = document.querySelector('section')
var item = document.querySelector('.item')
var sort = document.querySelector('.sort')
var er = document.querySelector('.error')
var delButton = document.querySelector('.mulDel')
var state = ""
var selectedId = [];

window.onload = new function(){
	var today =  new Date();
	inputs[0].value = (today.getMonth()+1)+"."+today.getDate()+"."+today.getFullYear();
	loadEvent("all")
}

function loadEvent(e){
	state = e;
	if(!checkCorrectDate(inputs[0].value)){
		er.innerHTML="Введите корректную дату"
		return
	}
	clear(section)
	var events = data.slice()
	switch(e){
		case 'all':{
			sort.innerHTML="Все:"
			break;
		}
		case 'active':{
			events = events.filter(function(e){return e.checked===false})
			sort.innerHTML="Активные:"
			break;
		}
		case 'completed':{
			events = events.filter(function(e){return e.checked===true})
			sort.innerHTML="Завершенные:"
			break;
		}
		case 'allToday':{
			events = events.filter(function(e){return eqDate(checkCorrectDate(inputs[0].value),e.date)})
			sort.innerHTML="На заданный день:"
			break;
		}
	}
	events.sort(function(a,b){return a.date-b.date})
	for(var i=0;i<events.length;i++){
		var e = events[i]
		if(i==0 || !eqDate(e.date,events[i-1].date)){
			var d = document.createElement("div")
			d.classList.add('date')
			d.innerHTML = (e.date.getMonth()+1)+"."+e.date.getDate()+"."+e.date.getFullYear();
			section.appendChild(d)
		}
		var el = document.createElement("div")
		el.addEventListener('click',addMultiDelete,false)
		el.innerHTML = e.event
		el.id = e.id
		var index = selectedId.indexOf(e.id.toString())
		if(index!=-1){
			el.className+=' selected'
		}
		var check = document.createElement("input")
		check.type = "checkbox";
		check.classList.add('check')
		check.checked=e.checked
		if(e.checked)el.className+=' checked'
		check.addEventListener('click',changeEvent,false)
		var del = document.createElement("input")
		del.type="button"
		del.value="x"
		del.classList.add('del')
		del.addEventListener('click',deleteEvent,false)
		el.appendChild(check)
		el.appendChild(del)
		section.appendChild(el)
	}
	var len = events.length
	if(len===0)section.innerHTML = "Таких задач нет!"
	item.innerHTML = len+ (len>1 ? " items" : " item")+" left"
}



function clear(e){
	while(e.firstChild) e.removeChild(e.firstChild);
	item.innerHTML = ""
	sort.innerHTML = ""
	er.innerHTML=""
}

function addEvent(){
	if(inputs[1].value=="" || inputs[0].value==""){
		er.innerHTML="Заполните поля ввода"
	}
	else if(!checkCorrectDate(inputs[0].value)){
		er.innerHTML="Введите корректную дату"
	}
	else{
		data.push({id:data.length+1,date:checkCorrectDate(inputs[0].value),event:inputs[1].value,checked:false})
		loadEvent(state)
		inputs[1].value=""
	}
}

function multiDelete(){
	selectedId.forEach(function(e,i){
		if(document.getElementById(e)){
			deleteEvent(e)
			selectedId.splice(i,1);
		}
	})
	if(selectedId.length==0) delButton.style.visibility = "hidden"
}

function addMultiDelete(e){
	var id = e.target.id
	var index = selectedId.indexOf(id)
	var el = document.getElementById(id);
	if(index==-1){
		selectedId.push(id);
		el.className+=' selected'
	}
	else{
		selectedId.splice(index,1);
		el.className=el.className.replace('selected','')
	}
	if(selectedId.length>0) delButton.style.visibility = "visible"
	else delButton.style.visibility = "hidden"
}

function deleteEvent(e){
	var id,a;
	if(typeof e!='string'){
		e.stopPropagation()
		id = e.target.parentNode.id
	}
	else id=e
	for(var i=0;i<data.length;i++){
		if(data[i].id==id){
			a = i;
			break;
		}
	}
	data.splice(a,1);
	loadEvent(state)
}

function changeEvent(e){
	e.stopPropagation()
	var id = e.target.parentNode.id
	var a;
	for(var i=0;i<data.length;i++){
		if(data[i].id==id){
			a = data[i];
			break;
		}
	}
	a.checked=!a.checked
	var el = document.getElementById(id);
	if(a.checked)el.className+=' checked'
	else el.className=el.className.replace(' checked','')
}

function eqDate(a,b){
	a.setHours(0,0,0,0);
	b.setHours(0,0,0,0);
	if(a.getTime()===b.getTime()) return true
	return false
}

function checkCorrectDate(a){
	var arr = a.split(/[./:,-]/g);
	var d = new Date()
	d.setFullYear(arr[2]);
	d.setMonth(arr[0]-1);
	d.setDate(arr[1]);
	if(d.getFullYear()==arr[2] && (d.getMonth()+1)==arr[0] && d.getDate()==arr[1]) return d;
	return false
}