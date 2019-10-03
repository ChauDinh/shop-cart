function Dog() {
  this.stomach = [];
}

Dog.prototype.eat = function(dog) {
  this.stomach.push(dog);
};

Dog.prototype.eatCat = function(cat) {
  this.stomach.push(cat);
};
