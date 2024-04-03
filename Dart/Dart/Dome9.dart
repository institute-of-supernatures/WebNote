class Rect {
  num height;
  num width;

  Rect(this.height, this.width);

  get area {
    return this.height * this.width;
  }

  set setheight(vl) {
    this.height = vl;
  }
}

main() {
  Rect rec = new Rect(20, 20);
  rec.setheight = 10;
  print("面积： ${rec.area}");
}
