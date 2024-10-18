class MachineState {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertCoin() {
    console.log("Неправильная операция для текущего состояния");
  }

  turnLever() {
    console.log("Неправильная операция для текущего состояния");
  }

  deliverPrize() {
    console.log("Неправильная операция для текущего состояния");
  }
}

class NoCoinState extends MachineState {
  insertCoin() {
    console.log("Монета вставлена!");
    this.vendingMachine.totalCoins++;
    this.vendingMachine.setMachineState(this.vendingMachine.coinInsertedState);
  }
}

class CoinInsertedState extends MachineState {
  turnLever() {
    console.log("Рычаг повернут");
    globalServer.totalCoins += 1;
    if (Math.random() * 100 <= 10) {
      console.log("Вам выпало 2 приза! Поздравляем!");
      console.log(
        `Ваши призы: ${
          this.vendingMachine.availablePrizes.pop() || "Подарков больше нет"
        } и ${
          this.vendingMachine.availablePrizes.pop() || "Подарков больше нет"
        }`
      );
      this.vendingMachine.totalPrizes += 2;
      this.vendingMachine.setMachineState(this.vendingMachine.doublePrizeState);
      globalServer.totalPrizes += 2;
    } else if (Math.random() * 100 <= 15) {
      console.log("Вам выпала игрушка вместо жвачки!");
      console.log(
        `Ваша игрушка: ${
          this.vendingMachine.availablePrizes.pop() || "Подарков больше нет"
        }`
      );
      this.vendingMachine.totalPrizes++;
      this.vendingMachine.setMachineState(
        this.vendingMachine.specialPrizeState
      );
      globalServer.totalPrizes += 1;
    } else {
      console.log("Вам выпала жвачка!");
      this.vendingMachine.totalGums++;
      globalServer.totalGums += 1;
      this.vendingMachine.setMachineState(this.vendingMachine.gumPrizeState);
    }
  }
}

class GumPrizeState extends MachineState {
  deliverPrize() {
    console.log("Приз выдан! Ожидание следующей монеты...");
    this.vendingMachine.setMachineState(this.vendingMachine.noCoinState);
  }
}

class DoublePrizeState extends MachineState {
  deliverPrize() {
    console.log("Выдано два приза! Ожидание следующей монеты...");
    this.vendingMachine.setMachineState(this.vendingMachine.noCoinState);
  }
}

class SpecialPrizeState extends MachineState {
  deliverPrize() {
    console.log("Игрушка вместо жвачки выдана! Ожидание следующей монеты...");
    this.vendingMachine.setMachineState(this.vendingMachine.noCoinState);
  }
}

class PrizeMachine {
  constructor(locationName) {
    this.locationName = locationName;
    this.availablePrizes = [];
    this.totalCoins = 0;
    this.totalGums = 0;
    this.totalPrizes = 0;
    this.currentState = null;

    this.noCoinState = new NoCoinState(this);
    this.coinInsertedState = new CoinInsertedState(this);
    this.gumPrizeState = new GumPrizeState(this);
    this.doublePrizeState = new DoublePrizeState(this);
    this.specialPrizeState = new SpecialPrizeState(this);

    this.setMachineState(this.noCoinState);
  }

  setMachineState(newState) {
    this.currentState = newState;
  }

  insertCoin() {
    this.currentState.insertCoin();
  }

  turnLever() {
    this.currentState.turnLever();
  }

  deliverPrize() {
    this.currentState.deliverPrize();
  }

  refillPrizes() {
    if (this.availablePrizes.length < 5) {
      while (this.availablePrizes.length < 5) {
        this.availablePrizes.push(
          prizesList[Math.round(Math.random() * (prizesList.length - 1))]
        );
      }
    }
    console.log(this.availablePrizes);
  }

  getMachineReport() {
    return {
      locationName: this.locationName,
      totalCoins: this.totalCoins,
      totalGums: this.totalGums,
      totalPrizes: this.totalPrizes,
      availablePrizes: this.availablePrizes.length,
    };
  }
}

const prizesList = [
  "Мишка",
  "Гоночная машинка",
  "Кукла",
  "Конструктор LEGO",
  "Игрушечный самолетик",
];

class PrizeMachineProxy {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertCoin() {
    this.vendingMachine.insertCoin();
  }

  turnLever() {
    this.vendingMachine.turnLever();
  }

  getReport() {
    console.log(`Отчёт для локации: ${this.vendingMachine.locationName}`);
    const report = this.vendingMachine.getMachineReport();
    console.log(`Монет использовано: ${report.totalCoins}`);
    console.log(`Выдано жвачек: ${report.totalGums}`);
    console.log(`Выдано призов: ${report.totalPrizes}`);
    console.log(`Доступно призов: ${report.availablePrizes}`);
  }
}

class CentralServer {
  totalCoins = 0;
  totalGums = 0;
  totalPrizes = 0;

  getCentralReport() {
    console.log(
      `Отчёт со всех локаций: \nВсего жвачек: ${this.totalGums}\nВсего подарков: ${this.totalPrizes}\nВсего монет: ${this.totalCoins}`
    );
  }
}

const globalServer = new CentralServer();

const moscowMachine = new PrizeMachine("Москва");
const spbMachine = new PrizeMachine("Санкт-Петербург");
const stavMachine = new PrizeMachine("Ставрополь");

const moscowProxy = new PrizeMachineProxy(moscowMachine);
const spbProxy = new PrizeMachineProxy(spbMachine);
const stavProxy = new PrizeMachineProxy(stavMachine);

moscowProxy.insertCoin();
moscowProxy.turnLever();
moscowProxy.getReport();

spbProxy.insertCoin();
spbProxy.turnLever();
spbProxy.getReport();

stavProxy.insertCoin();
stavProxy.turnLever();
stavProxy.getReport();

globalServer.getCentralReport();
