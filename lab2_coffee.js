class Drink {
  cost() {
    throw new Error("Метод 'cost' должен быть переопределен");
  }

  description() {
    throw new Error("Метод 'description' должен быть переопределен");
  }
}

class Coffee extends Drink {
  cost() {
    return 5.0;
  }

  description() {
    return "Кофе";
  }
}

class Tea extends Drink {
  cost() {
    return 3.0;
  }

  description() {
    return "Чай";
  }
}

// Декораторы для добавок
class MilkDecorator extends Drink {
  constructor(drink) {
    super();
    this.drink = drink;
  }

  cost() {
    return this.drink.cost() + 1.0;
  }

  description() {
    return this.drink.description() + ", с молоком";
  }
}

class SugarDecorator extends Drink {
  constructor(drink) {
    super();
    this.drink = drink;
  }

  cost() {
    return this.drink.cost() + 0.5;
  }

  description() {
    return this.drink.description() + ", с сахаром";
  }
}

class WhippedCreamDecorator extends Drink {
  constructor(drink) {
    super();
    this.drink = drink;
  }

  cost() {
    return this.drink.cost() + 2.0;
  }

  description() {
    return this.drink.description() + ", со взбитыми сливками";
  }
}

// Функция для заказа напитка
function orderDrink() {
  const drinkChoice = prompt(
    "Доступные напитки:\n1. Кофе\n2. Чай\nВыберите напиток (1 или 2): "
  );

  let drink;

  if (drinkChoice === "1") {
    drink = new Coffee();
  } else if (drinkChoice === "2") {
    drink = new Tea();
  } else {
    console.log("Неверный выбор!");
    return;
  }

  while (true) {
    const addOption = prompt(
      "Хотите добавить добавку? (молоко/сахар/взбитые сливки/нет): "
    ).toLowerCase();

    if (addOption === "молоко") {
      drink = new MilkDecorator(drink);
    } else if (addOption === "сахар") {
      drink = new SugarDecorator(drink);
    } else if (addOption === "взбитые сливки") {
      drink = new WhippedCreamDecorator(drink);
    } else if (addOption === "нет") {
      break;
    } else {
      console.log("Неверный выбор добавки!");
    }
  }

  console.log(`Вы заказали: ${drink.description()}`);
  console.log(`Общая стоимость: ${drink.cost()}$`);
}

orderDrink();
