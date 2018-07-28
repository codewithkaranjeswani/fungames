class Point {
  constructor(x, y, userData) {
    this.x = x;
    this.y = y;
    this.userData = userData;
  }
}
//--------------------------------------------------------------------------
class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rSquared = this.r * this.r;
  }
  contains(point) {
    // check if the point is in the circle by checking if the euclidean distance of
    // the point and the center of the circle if smaller or equal to the radius of
    // the circle
    let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
    return d <= this.rSquared;
  }
  // intersects(range) {
  //   let xDist = Math.abs(range.x - this.x);
  //   let yDist = Math.abs(range.y - this.y);
  //   // radius of the circle
  //   let r = this.r;
  //   let w = range.w;
  //   let h = range.h;
  //   let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);
  //   // no intersection
  //   if (xDist > (r + w) || yDist > (r + h))
  //     return false;
  //   // intersection within the circle
  //   if (xDist <= w || yDist <= h)
  //     return true;
  //   // intersection on the edge of the circle
  //   return edges <= this.rSquared;
  // }
  intersects(range) {
    let d = dist(this.x, this.y, range.x, range.y);
    if (d <= 2 * r) {
      return true;
    } else {
      return false;
    }
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