class MenuIterator {
  constructor(items) {
    this.items = items;
    this.position = 0;
  }

  hasNext() {
    return this.position < this.items.length;
  }

  next() {
    return this.items[this.position++];
  }

  remove() {
    if (this.position <= 0) {
      throw new Error("Нельзя удалить элемент до перехода к следующему!");
    }
    this.items.splice(--this.position, 1);
  }
}

class ListArrayIterator extends MenuIterator {
  constructor(items) {
    super();
    this.items = items;
    this.position = 0;
  }
}

class MapListIterator extends MenuIterator {
  constructor(items) {
    super();
    this.items = items;
    this.position = 0;
  }
}

class PizzaShopMenu {
  name = "Пицца-шоп";
  constructor() {
    this.menuList = [];
    this.addDish("Маргарита", 320);
    this.addDish("Сырная", 420);
    this.addDish("Мясная", 380);
  }

  addDish(dish, price) {
    this.menuList.push({ dish, price });
  }

  createIterator() {
    return new ListArrayIterator(this.menuList);
  }
}

class CafeMenu {
  name = "Кафе";
  constructor() {
    this.menuList = [];
    this.addDish("Зелёный чай", 130);
    this.addDish("Американо", 140);
    this.addDish("Капучино", 160);
  }

  addDish(dish, price) {
    this.menuList.push({ dish, price });
  }

  createIterator() {
    return new MapListIterator(this.menuList);
  }
}

class DumplingShopMenu {
  name = "Пельменная";
  constructor() {
    this.menuList = {};
    this.addDish("Пельмени с курицей", 260);
    this.addDish("Пельмени с бараниной", 360);
    this.addDish("Пельмени с сыром", 310);
  }

  addDish(name, price) {
    this.menuList[name] = price;
  }

  createIterator() {
    return new ObjectMapIterator(this.menuList);
  }
}

class ObjectMapIterator extends MenuIterator {
  constructor(items) {
    super();
    this.items = Object.entries(items);
    this.position = 0;
  }

  next() {
    const [key, value] = this.items[this.position++];
    return { dish: key, price: value };
  }
}

class OrderSummary {
  constructor() {
    this.orderDetails = [];
    this.totalCost = 0;
  }

  addDish(dish, price) {
    this.orderDetails.push({ dish, price });
    this.totalCost += price;
  }

  printSummary() {
    console.log("Ваш заказ:");
    this.orderDetails.forEach((orderItem) => {
      console.log(`${orderItem.dish}: ${orderItem.price} руб.`);
    });
    console.log(`Общая стоимость: ${this.totalCost} руб.`);
  }
}

function displayMenuAndOrder(iterator, order) {
  while (iterator.hasNext()) {
    const menuDish = iterator.next();
    console.log(`${menuDish.dish}: ${menuDish.price} руб.`);
    order.addDish(menuDish.dish, menuDish.price);
  }
}

const pizzaShopMenu = new PizzaShopMenu();
const cafeMenu = new CafeMenu();
const dumplingShopMenu = new DumplingShopMenu();

const menusExecutor = new MenuIterator([
  pizzaShopMenu,
  cafeMenu,
  dumplingShopMenu,
]);
const orderSummary = new OrderSummary();

while (menusExecutor.hasNext()) {
  const place = menusExecutor.next();
  console.log(`\nМеню ${place.name}:`);
  displayMenuAndOrder(place.createIterator(), orderSummary);
}

orderSummary.printSummary();
