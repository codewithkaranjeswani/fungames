class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
//--------------------------------------------------------------------------
class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return (point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h);
  }

  intersects(range) {
    return (!(range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h))
  }
}
//--------------------------------------------------------------------------
class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary; // boundary is going to be a rectangle
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    let northeast = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.northeast = new QuadTree(northeast, this.capacity);
    let northwest = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    this.northwest = new QuadTree(northwest, this.capacity);
    let southeast = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.southeast = new QuadTree(southeast, this.capacity);
    let southwest = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.southwest = new QuadTree(southwest, this.capacity);
    this.divided = true;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }
    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }
      if (this.northeast.insert(point))
        return true;
      else if (this.northwest.insert(point))
        return true;
      else if (this.southeast.insert(point))
        return true;
      else if (this.southwest.insert(point))
        return true;
      else
        console.log("Error, point went into no tree!");
    }
  }

  query(range, found) {
    if (!found) {
      found = [];
    }
    if (!this.boundary.intersects(range)) {
      // empty array
      return;
    } else {
      for (let p of this.points) {
        if (range.contains(p)) {
          found.push(p);
        }
      }
    }
    if (this.divided) {
      this.northeast.query(range, found);
      this.northwest.query(range, found);
      this.southeast.query(range, found);
      this.southwest.query(range, found);
    }
    return found;
  }

  show() {
    stroke(255);
    noFill();
    strokeWeight(1);
    rectMode(CENTER);
    rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
    if (this.divided) {
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }
    strokeWeight(4);
    stroke(255);
    for (let p of this.points) {
      point(p.x, p.y);
    }
  }
}
//--------------------------------------------------------------------------