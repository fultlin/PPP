class Ingredient {
  constructor(name, cost) {
    this.name = name;
    this.costValue = cost;
  }

  description() {
    return this.name;
  }

  cost() {
    return this.costValue;
  }
}

class Water extends Ingredient {
  constructor() {
    super("Вода", 0.2);
  }
}

class CoffeeBase extends Ingredient {
  constructor() {
    super("Кофе", 1.0);
  }
}

class TeaBase extends Ingredient {
  constructor() {
    super("Чай", 0.8);
  }
}

class FruitBase extends Ingredient {
  constructor() {
    super("Фрукты", 1.2);
  }
}

class JuiceBase extends Ingredient {
  constructor() {
    super("Фруктовый сок", 1.5);
  }
}

class WhippedCream extends Ingredient {
  constructor() {
    super("Взбитые сливки", 0.7);
  }
}

class Syrup extends Ingredient {
  constructor() {
    super("Сироп", 0.5);
  }
}

class Soda extends Ingredient {
  constructor() {
    super("Газировка", 0.3);
  }
}

class AddonDecorator extends Ingredient {
  constructor(drink, addon) {
    super(addon.name, addon.cost());
    this.drink = drink;
    this.addon = addon;
  }

  description() {
    return `${this.drink.description()}, ${this.addon.description()}`;
  }

  cost() {
    return this.drink.cost() + this.addon.cost();
  }
}

class Drink {
  constructor(base, mainIngredient, topper) {
    this.base = base;
    this.mainIngredient = mainIngredient;
    this.topper = topper;
  }

  description() {
    return `${this.base.description()}, ${this.mainIngredient.description()}, ${this.topper.description()}`;
  }

  cost() {
    return this.base.cost() + this.mainIngredient.cost() + this.topper.cost();
  }
}

class DrinkFactory {
  createBase() {}
  createMainIngredient() {}
  createTopper() {}
}

class CoffeeFactory extends DrinkFactory {
  createBase() {
    return new Water();
  }

  createMainIngredient() {
    return new CoffeeBase();
  }

  createTopper() {
    return new WhippedCream();
  }
}

class TeaFactory extends DrinkFactory {
  createBase() {
    return new Water();
  }

  createMainIngredient() {
    return new TeaBase();
  }

  createTopper() {
    return new Syrup();
  }
}

class JuiceFactory extends DrinkFactory {
  createBase() {
    return new JuiceBase();
  }

  createMainIngredient() {
    return new FruitBase();
  }

  createTopper() {
    return new Soda();
  }
}

class VolumeFactory {
  static createVolume(drink, volumeChoice) {
    switch (volumeChoice) {
      case "0.4л":
        return drink; 
      case "0.6л":
        drink.base.costValue += 0.5; 
        return drink;
      case "0.8л":
        drink.base.costValue += 1.0;
        return drink;
      default:
        throw new Error("Неверный выбор объема!");
    }
  }
}

function orderDrink() {
  const drinkChoice = prompt(
    "Доступные напитки:\n1. Кофе\n2. Чай\n3. Фруктовый сок\nВыберите напиток (1-3): "
  );

  let drinkFactory;

  switch (drinkChoice) {
    case "1":
      drinkFactory = new CoffeeFactory();
      break;
    case "2":
      drinkFactory = new TeaFactory();
      break;
    case "3":
      drinkFactory = new JuiceFactory();
      break;
    default:
      console.log("Неверный выбор!");
      return;
  }

  const base = drinkFactory.createBase();
  const mainIngredient = drinkFactory.createMainIngredient();
  const topper = drinkFactory.createTopper();

  let drink = new Drink(base, mainIngredient, topper);

  const volumeChoice = prompt("Выберите объем (0.4л, 0.6л, 0.8л): ");

  try {
    drink = VolumeFactory.createVolume(drink, volumeChoice);
  } catch (error) {
    console.log(error.message);
    return;
  }

  while (true) {
    const addOption = prompt(
      "Хотите добавить добавку? (молоко/сахар/взбитые сливки/нет): "
    ).toLowerCase();

    if (addOption === "молоко") {
      drink = new AddonDecorator(drink, new Ingredient("Молоко", 0.5));
    } else if (addOption === "сахар") {
      drink = new AddonDecorator(drink, new Ingredient("Сахар", 0.2));
    } else if (addOption === "взбитые сливки") {
      drink = new AddonDecorator(drink, new WhippedCream());
    } else if (addOption === "нет") {
      break;
    } else {
      console.log("Неверный выбор добавки!");
    }
  }

  console.log(`Вы заказали: ${drink.description()}`);
  console.log(`Общая стоимость: ${drink.cost().toFixed(2)}$`);
}

orderDrink();
