class Eggs extends pokemon{
    constructor(name, type, image, eclosion_time){
        super(name,type,image);
        this.eclosion_time = eclosion_time;
    }
}

let egg = new Eggs("toto", "feu", "url");
console.log(egg.hello());