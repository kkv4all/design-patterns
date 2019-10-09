interface Subject{
    registerObserver(o:Observer);
    removeObserver(o:Observer);
    notifyObservers();
}

interface Observer{
    update(temprature:number);
}

//Subject Class
class WeatherStation implements Subject {
    private temprature: number;
    private observers: Observer[]=[];
    
    registerObserver(o: Observer) {
        this.observers.push(o);
    }
    removeObserver(o: Observer) {
        let index = this.observers.indexOf(o);
        this.observers.splice(index,1);
    }
    notifyObservers() {
        for(let observer of this.observers){
            observer.update(this.temprature);
        }
    }

    setTemprature(temp:number){
        console.log('Weather Station: new temprature measurement: '+temp);
        this.temprature = temp;
        this.notifyObservers();
    }
}
//Observer Class
class TempratureDisplay implements Observer{
    private subject:Subject;

    constructor(weatherstation: Subject){
        this.subject = weatherstation;
        weatherstation.registerObserver(this);
    }

    update(temprature: number) {
        console.log('TempratureDisplay: '+temprature);
    }
}

class Fan implements Observer{
    private subject:Subject;

    constructor(weatherstation: Subject){
        this.subject = weatherstation;
        weatherstation.registerObserver(this);
    }

    update(temprature: number) {
        if(temprature>25){
            console.log('Fan: its hot here, turning on my self');
            //Here some real logic
        }else{
            console.log('Fan: its nice and cool here, turning my self off..');
            //Here some real logic
        }
    }
}

let weatherstation = new WeatherStation();

let tempratureDisplay = new TempratureDisplay(weatherstation);
let fan = new Fan(weatherstation);


weatherstation.setTemprature(20);
weatherstation.setTemprature(30);