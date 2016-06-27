import Animal from '../Animal';

export default class Dog extends Animal {

  constructor(name) {
    super(name);
  }

  talk() {
    document.write('<p>Woof woof, I am ' + this._name + '.</p>');
  }

}
