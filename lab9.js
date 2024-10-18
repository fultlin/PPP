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

  dispensePrize() {
    console.log("Неправильная операция для текущего состояния");
  }
}

class NoCoinState extends MachineState {
  insertCoin() {
    console.log("Монета вставлена!");
    this.vendingMachine.setMachineState(this.vendingMachine.coinInsertedState);
  }
}

class CoinInsertedState extends MachineState {
  turnLever() {
    console.log("Рычаг повернут!");
    if (Math.random() * 100 <= 10) {
      console.log("Вы выиграли 2 приза! Поздравляем!");
      console.log(
        `Ваши призы: ${
          this.vendingMachine.prizes.pop() || "Больше призов нет"
        } и ${this.vendingMachine.prizes.pop() || "Больше призов нет"}`
      );
      this.vendingMachine.setMachineState(this.vendingMachine.doublePrizeState);
    } else if (Math.random() * 100 <= 15) {
      console.log("Вам выпала игрушка вместо жвачки!");
      console.log(
        `Ваша игрушка: ${
          this.vendingMachine.prizes.pop() || "Больше призов нет"
        }`
      );
      this.vendingMachine.setMachineState(
        this.vendingMachine.specialPrizeState
      );
    } else {
      console.log("Вам выпала жвачка!");
      this.vendingMachine.setMachineState(this.vendingMachine.singlePrizeState);
    }
    this.vendingMachine.currentState = "Без монеты";
  }
}

class SinglePrizeState extends MachineState {
  dispensePrize() {
    console.log("Приз выдан! Ожидание следующей монеты...");
    this.vendingMachine.setMachineState(this.vendingMachine.noCoinState);
  }
}

class DoublePrizeState extends MachineState {
  dispensePrize() {
    console.log("Выдано два приза! Ожидание следующей монеты...");
    this.vendingMachine.setMachineState(this.vendingMachine.noCoinState);
  }
}

class SpecialPrizeState extends MachineState {
  dispensePrize() {
    console.log("Специальный приз выдан! Ожидание следующей монеты...");
    this.vendingMachine.setMachineState(this.vendingMachine.noCoinState);
  }
}

class PrizeVendingMachine {
  prizes = [];
  currentState = "Без монеты";

  constructor() {
    this.noCoinState = new NoCoinState(this);
    this.coinInsertedState = new CoinInsertedState(this);
    this.singlePrizeState = new SinglePrizeState(this);
    this.doublePrizeState = new DoublePrizeState(this);
    this.specialPrizeState = new SpecialPrizeState(this);

    this.state = this.noCoinState;
  }

  setMachineState(newState) {
    this.state = newState;
  }

  insertCoin() {
    this.state.insertCoin();
    this.currentState = "Монета вставлена!";
  }

  turnLever() {
    this.state.turnLever();
    this.currentState = "Рычаг использован!";
  }

  dispensePrize() {
    this.state.dispensePrize();
    this.currentState = "Выдан приз!";
  }

  refillPrizes() {
    if (
      this.currentState === "Без монеты" ||
      this.currentState === "Монета вставлена!"
    ) {
      while (this.prizes.length < 5) {
        let randomIndex = Math.floor(Math.random() * availablePrizes.length);
        this.prizes.push(availablePrizes[randomIndex]);
      }
      console.log(this.prizes);
    } else {
      console.log("Невозможно пополнить призы в этом состоянии!");
    }
  }
}

const availablePrizes = [
  "Робот",
  "Гоночная машинка",
  "Кукла Барби",
  "Конструктор",
  "Динозавр игрушка",
  "Мячик",
];

const prizeMachine = new PrizeVendingMachine();

prizeMachine.insertCoin();
prizeMachine.refillPrizes();
prizeMachine.turnLever();
prizeMachine.dispensePrize();
