class MenuIterator {
  hasNext() {}
  next() {}
  remove() {}
}

class ArrayListIterator extends MenuIterator {
  constructor(items) {
    super();
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
      throw new Error(
        "Вы не можете удалить элмент пока не перешли к следующему!"
      );
    }
    this.items.splice(--this.position, 1);
  }
}

class VectorListIterator extends MenuIterator {
  constructor(items) {
    super();
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
      throw new Error(
        "Вы не можете удалить элмент пока не перешли к следующему!"
      );
    }
    this.items.splice(--this.position, 1);
  }
}

class PizzeriaMenu {
  name = "Пиццерия";
  constructor() {
    this.menuItems = [];
    this.addItem("Ананасная");
    this.addItem("Четыре сыра");
    this.addItem("Пепперони");
  }

  addItem(item) {
    this.menuItems.push(item);
  }

  createIterator() {
    return new ArrayListIterator(this.menuItems);
  }
}

class CoffeeShopMenu {
  name = "Кофейня";
  constructor() {
    this.menuItems = [];
    this.addItem("Чай");
    this.addItem("Чёрный кофе");
    this.addItem("Латте");
  }

  addItem(item) {
    this.menuItems.push(item);
  }

  createIterator() {
    return new VectorListIterator(this.menuItems);
  }
}

function printMenu(iterator) {
  console.log(iterator.name);
  const iter = iterator.createIterator();
  while (iter.hasNext()) {
    console.log(iter.next());
  }
}

const pizzeriaMenu = new PizzeriaMenu();
const coffeeShopMenu = new CoffeeShopMenu();

printMenu(pizzeriaMenu);
console.log("-----------------------------");
printMenu(coffeeShopMenu);
