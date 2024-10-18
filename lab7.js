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
    super("Минеральная вода", 0.5);
  }
}

class CoffeeBase extends Ingredient {
  constructor() {
    super("Кофе премиум", 1.5);
  }
}

class TeaBase extends Ingredient {
  constructor() {
    super("Чай зеленый", 1.0);
  }
}

class FruitBase extends Ingredient {
  constructor() {
    super("Смесь фруктов", 1.8);
  }
}

class JuiceBase extends Ingredient {
  constructor() {
    super("Свежевыжатый сок", 2.0);
  }
}

class WhippedCream extends Ingredient {
  constructor() {
    super("Сливки взбитые", 1.0);
  }
}

class Syrup extends Ingredient {
  constructor() {
    super("Карамельный сироп", 0.7);
  }
}

class Soda extends Ingredient {
  constructor() {
    super("Газированная вода", 0.4);
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
        drink.base.costValue += 0.7;
        return drink;
      case "0.8л":
        drink.base.costValue += 1.5;
        return drink;
      default:
        throw new Error("Неверный выбор объема!");
    }
  }
}

class ExtraItemFactory {
  static addExtraItem(drink) {
    const extraItemChoice = prompt(
      "Выберите дополнительный элемент (булочка/пирог/маффин/ничего): "
    ).toLowerCase();

    switch (extraItemChoice) {
      case "булочка":
        return new AddonDecorator(drink, new Ingredient("Булочка", 1.2));
      case "пирог":
        return new AddonDecorator(drink, new Ingredient("Пирог", 2.0));
      case "маффин":
        return new AddonDecorator(drink, new Ingredient("Маффин", 1.8));
      case "ничего":
        return drink;
      default:
        console.log("Неверный выбор дополнительного элемента!");
        return drink;
    }
  }
}

class DrinkPreparationProcess {
  prepareDrink() {
    this.heatWater();
    this.addIngredients();
    this.pourDrink();
    this.addAddon();
    this.addExtraItem();
    this.payment();
    this.delivery();
  }

  heatWater() {
    console.log("Вода нагревается...");
  }

  addIngredients() {
    throw new Error("Метод должен быть переопределен!");
  }

  pourDrink() {
    console.log("Напиток наливается в стакан...");
  }

  addAddon() {
    console.log("Добавки добавляются...");
  }

  addExtraItem() {
    console.log("Выбор дополнительного элемента (булочка и т.д.)...");
  }

  payment() {
    const paymentMethod = prompt(
      "Выберите способ оплаты (карта/наличные/QR-код): "
    ).toLowerCase();

    switch (paymentMethod) {
      case "карта":
        console.log("Оплата картой...");
        break;
      case "наличные":
        console.log("Оплата наличными...");
        break;
      case "qr-код":
        console.log("Оплата через QR-код...");
        break;
      default:
        console.log("Неверный способ оплаты!");
    }
  }

  delivery() {
    console.log("Выдача напитка...");
  }
}

class CoffeePreparation extends DrinkPreparationProcess {
  addIngredients() {
    console.log("Добавление премиум кофе...");
  }
}

class TeaPreparation extends DrinkPreparationProcess {
  addIngredients() {
    console.log("Добавление зеленого чая...");
  }
}

class JuicePreparation extends DrinkPreparationProcess {
  addIngredients() {
    console.log("Добавление свежевыжатого сока...");
  }
}

function orderDrink() {
  const drinkChoice = prompt(
    "Доступные напитки:\n1. Кофе\n2. Чай\n3. Свежевыжатый сок\nВыберите напиток (1-3): "
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
      drink = new AddonDecorator(drink, new Ingredient("Молоко", 0.6));
    } else if (addOption === "сахар") {
      drink = new AddonDecorator(drink, new Ingredient("Сахар", 0.3));
    } else if (addOption === "взбитые сливки") {
      drink = new AddonDecorator(drink, new WhippedCream());
    } else if (addOption === "нет") {
      break;
    } else {
      console.log("Неверный выбор добавки!");
    }
  }

  drink = ExtraItemFactory.addExtraItem(drink);

  console.log(`Вы заказали: ${drink.description()}`);
  console.log(`Общая стоимость: ${drink.cost().toFixed(2)}$`);

  switch (drinkChoice) {
    case "1":
      new CoffeePreparation().prepareDrink();
      break;
    case "2":
      new TeaPreparation().prepareDrink();
      break;
    case "3":
      new JuicePreparation().prepareDrink();
      break;
  }
}

orderDrink();
