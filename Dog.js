function Dog() {
  this.stomach = [];
}

Dog.prototype.eat = function(dog) {
  this.stomach.push(dog);
};
