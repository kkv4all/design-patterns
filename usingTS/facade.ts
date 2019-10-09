class BluRayPlayer{
    on(){
        console.log("BluRay Player turning ON....");
    }

    turnOff(){
        console.log("BluRay turning OFF....");
    }

    play(){
        console.log("Playing bluray disc");
    }
}

class Amplifier {
    on(){
        console.log("Amp is turning ON...");
    }

    turnOff(){
        console.log("Amp is turning OFF...");
    }
    setSource(source: string){
        console.log("Setting source to "+ source);
    }

    setVolume(volumeLevel:number){
        console.log("Setting Volume to "+volumeLevel);
    }
}

class Lights{
    dim(){
        console.log("Lights are diming")
    }
}

class TV{
    turnOn(){
        console.log("TV turning On....");
    }
    trunOff(){
        console.log("TV turning OFF..");
    }
}

class PopcornMaker {
    turnOn(){
        console.log("Popcorn Maker turning ON..");
    }
    turnOff(){
        console.log("Popcorn maker turning OFF..");
    }
    pop(){
        console.log("poping corn!!");
    }
}

class HomeTheaterFacade{
    private bluray: BluRayPlayer;
    private amp: Amplifier;
    private tv: TV;
    private light: Lights;
    private popcornMaker: PopcornMaker;

    constructor(amp: Amplifier, bluray: BluRayPlayer,lights : Lights,tv:TV,popcorn: PopcornMaker){
        this.amp = amp;
        this.bluray =bluray;
        this.light = lights;
        this.tv = tv;
        this.popcornMaker = popcorn;
    }

    watchMovie(){
        this.popcornMaker.turnOn();
        this.popcornMaker.pop();

        this.light.dim();
        
        this.tv.turnOn();
        
        this.amp.on();
        this.amp.setSource('bluray');
        this.amp.setVolume(15);

        this.bluray.on();
        this.bluray.play();
    }

    public endMovie(){
        this.popcornMaker.turnOff();
        this.amp.turnOff();
        this.tv.trunOff();
        this.bluray.turnOff();
    }
}

let bluray =new BluRayPlayer();
let amp = new Amplifier();
let lights = new Lights();
let tv = new TV();
let popcornMaker = new PopcornMaker();

let myHomeTheater = new HomeTheaterFacade(amp,bluray,lights,tv,popcornMaker);

myHomeTheater.watchMovie();
myHomeTheater.endMovie();