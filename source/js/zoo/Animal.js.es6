export default class Animal {

  constructor(name) {
    this._name = name;
  }

  talk() {
    document.write('<p>Hello, I am ' + this._name + '.</p>');
  }

}
