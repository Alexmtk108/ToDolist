function Counter(x = 0){
	let i = x;
	return function(){
		return i = i + 1;
	}
}

let idGenerate = Counter();
class Task{
	constructor(taskData,cnt){
		const _ = this;
		//Свойства
		if(!taskData) taskData = {};
		
		_.id = idGenerate();
		_.title = taskData['title'] || '';
		_.description = taskData['description'] || '';
		_.catID = taskData['catID'] || 0;	//ID Категории/////////
		_.date = taskData['date'] || '';
		_.marks = taskData['marks'] || [];	//Массив идентификаторов меток////////
		if(!taskData['date']){
      let date = new Date();
      taskData['date'] = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
    }
    _.date = taskData['date'];
    _.bufferId();
	}
	bufferId(){
    const _ = this;
    localStorage.setItem('bufferId',_.id);
  	}
}

//4 - Работа//////////////////////


let months = {
  'ru': [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]  
};

class List{
	constructor(){
		const _ = this;
		//Свойства
		// _.currentMonth = 0;
		// _.currentDay = 0;
		
		// _.tasks = {};
		// _.currentTask = {};
		_.currentLang = 'ru';
		_.task = {};
		_.lastTask = {};

		_.getTasks();
		console.log('Инициализация программы')
		_.currentFullDate = _.getCurrentDate();
		_.init();


	}		
	//Методы выборки
	getMonthDays(month){}
	getLabels(day){}
	getCategories(){}
	getTasks(month){
	    const _ = this;
	    if(localStorage.getItem('tasks')){
	        let tasks = JSON.parse(localStorage.getItem('tasks'));
	        for(let prop in tasks){
	          let currentTasks = tasks[prop];
	          for(let i=0;i < currentTasks.length;i++){
	            _.addTask(currentTasks[i]);
	          }
	        }
      		//_.tasks = JSON.parse(localStorage.getItem('tasks'));
    	}
  	}
  	getCurrentDate(dateStr=''){
    	const _ = this;
    	let date = new Date();
    		if(dateStr){
      		date = new Date(dateStr);
    		}
    let 
        month = date.getMonth(),
        year = date.getFullYear(),
        monthDay = date.getDate(),    
        weekDay = date.getDay();    
        
    if( (month == 3) || (month == 5) || (month == 8) || (month == 10) )
      _.daysInMonth = 30;
    else if(month == 1)
      _.daysInMonth = 28;
    else
      _.daysInMonth = 31;

    

    _.currentMonth = month;
    _.currentDay = monthDay;
    _.currentYear = year;
    _.currentWeekDay = weekDay;

    month+=1;
    if(month < 10){
      month = '0'+month;
    }    
    return ''+year+'-'+month+'-'+monthDay;
	}

  // Методы фильтрации и поиска
  	filter(){}
  	search(){}
	
	//Методы добавления
	addTask(taskData){
		const _ = this;
		let t = new Task(taskData);
		if(!_.tasks[t.date]){
			_.tasks[t.date] = [];
		}
		_.tasks[taskData['date']].push(t);
    	_.currentTask = t;
    	localStorage.setItem('tasks',JSON.stringify(_.tasks));
	}
	addCategory(){}
	addMark(){}

	// Методы отрисовки
	drawTable(){
		const _ = this;
		let calendarBody = document.querySelector('.calendar-body');
		calendarBody.innerHTML = _.createRows().innerHTML;
	}
	createButton(number = 1,style={}){
		const _ = this;
		let btn =  document.createElement('BUTTON');
	    btn.textContent = number;
	    if(style){
      		btn.style[style['name']] = style['value']; 
	    }
	    return btn;
  }
  createRows(){ 
    const _ = this;
    let 
      fullMonth = new Date(_.currentYear,_.currentMonth),
      firstDay = fullMonth.getDay(), // 3
      counter = 1,
      rowCnt = 5,
      daysInFirstWeek = 1,
      buffer=  document.createElement('DIV'),
      daysInRow = 7;

    if(!firstDay){
      daysInRow = 1;
      firstDay = 7
    } else {
      daysInRow-= (firstDay-1);
      daysInFirstWeek = daysInRow;
    }   

    if( (firstDay == 1) && (_.currentMonth == 1) ){
      rowCnt = 4;
    }  

    for(let i = 0; i < rowCnt; i++){
        if(i == 4){
          daysInRow = _.daysInMonth - (21+daysInFirstWeek);
        }
        let row = document.createElement('DIV');
        row.className = 'calendar-row';
        for(let j = 0; j < daysInRow ;j++){
          if( (j == 0) && (i == 0) )  {
            row.append(_.createButton(counter,
              {name:'gridColumn',value:firstDay
            }));
          }else{
            row.append(_.createButton(counter));
          }
          counter++;
        }
        buffer.append(row);
        daysInRow = 7;
    }
    return buffer;
  }

	//Методы редактирования
	update(){}
  	setMonthName(month=0){
    	const _ = this;
    	let monthCont = document.querySelector('.month span');
    	monthCont.textContent = months[_.currentLang][month];
	}	
	setYearName(year=0){
		const _ = this;
		let monthCont = document.querySelector('.years span');
		monthCont.textContent = year;
	}
	setDayNum(day=0){
		const _ = this;
		let dayCont = document.getElementById('.todayDay p');
		dayCont.textContent = monthDay;
	}


	
	//Методы удаления
	removeCategory(){}
	removeMark(){}
	removeTask(){}
	// Инициализация программы
	init(){
	    const _ = this;
	    _.setMonthName(_.currentMonth);
	    _.setYearName(_.currentYear);
	    _.drawTable();
	}
}

let l = new List();
//console.log('zzz');
// let list = new List()
// list.addTask({
// 	title: 'Покушать',
// 	description: 'Нужно кушать',
// 	catID: 2,
// 	date: '2019-12-31',
// 	marks: [1,3,4]
// })
// list.addTask({
// 	title: 'Пить',
// 	description: 'Нужно кушать',
// 	catID: 2,
// 	date: '2019-12-31',
// 	marks: [1,3,4]
// })
// list.addTask({
// 	title: 'Ходить',
// 	description: 'Нужно кушать',
// 	catID: 2,
// 	date: '2025-10-31',
// 	marks: [1,3,4]
// })
  