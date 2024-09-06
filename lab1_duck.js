class FlyBehavior {
    fly() {
        console.log("Я не умею летать");
    }
}

class FlyWithWings extends FlyBehavior {
    fly() {
        console.log("Я летаю на крыльях");
    }
}

class FlyWithRocket extends FlyBehavior {
    fly() {
        console.log("Я летаю на ракете");
    }
}

class FlyWithRemoteControl extends FlyBehavior {
    fly() {
        console.log("Я летаю на радиоуправлении");
    }
}

class QuackBehavior {
    quack() {
        console.log("Я не умею крякать");
    }
}

class LoudQuack extends QuackBehavior {
    quack() {
        console.log("Я крякаю громко");
    }
}

class RareQuack extends QuackBehavior {
    quack() {
        console.log("Я крякаю редко");
    }
}

class LongQuack extends QuackBehavior {
    quack() {
        console.log("Я крякаю протяжно");
    }
}

class Duck {
    constructor(name, quackBehavior, flyBehavior) {
        this.name = name;
        this.quackBehavior = quackBehavior;
        this.flyBehavior = flyBehavior;
    }

    display() {
        console.log(`${this.name}`);
        this.quackBehavior.quack();
        this.flyBehavior.fly();
    }

    setQuackBehavior(quackBehavior) {
        this.quackBehavior = quackBehavior;
    }

    setFlyBehavior(flyBehavior) {
        this.flyBehavior = flyBehavior;
    }
}

console.log("Симуляция уток:");
console.log('------------')
const saxonyDuck = new Duck("Саксонская утка", new RareQuack(), new FlyWithWings());
saxonyDuck.display();
console.log('------------')

const rubberDuck = new Duck("Резиновая утка", new QuackBehavior(), new FlyBehavior());
rubberDuck.display();
console.log('------------')

const decoyDuck = new Duck("Утка-приманка", new LoudQuack(), new FlyBehavior());
decoyDuck.display();
decoyDuck.setFlyBehavior(new FlyWithRemoteControl());
decoyDuck.display(); 
console.log('------------')

const redheadDuck = new Duck("Красноголовая утка", new QuackBehavior(), new FlyWithWings());
redheadDuck.display();
redheadDuck.setQuackBehavior(new LongQuack());
redheadDuck.display();