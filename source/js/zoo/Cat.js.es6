import Animal from './Animal';

export var catName1 = 'Felix';
export var catName2 = 'Garfield';

export class Cat extends Animal {

  talk() {
    document.write('<p>Meow, I am ' + this._name + '.</p>');
  }

}
