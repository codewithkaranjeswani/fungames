class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.vals = [];

    for (let i = 0; i < this.rows; i++) {
      this.vals[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.vals[i][j] = 0;
      }
    }
  }

  copy() {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.vals[i][j] = this.vals[i][j];
      }
    }
    return m;
  }

  display() {
    console.table(this.vals);
  }

  copy() {
    let a = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        a.vals[i][j] = this.vals[i][j];
      }
    }
    return a;
  }

  static fromArray(arr) {
    let n = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      n.vals[i][0] = arr[i];
    }
    return n;
  }

  toArray() {
    let arr = [];
    if (this.cols == 1) {
      for (let i = 0; i < this.rows; i++) {
        arr[i] = this.vals[i][0];
      }
      return arr;
    } else {
      console.log('The Matrix has more than 1 columnns. So can\'t convert into an array!');
      return;
    }
  }

  setValue(n) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.vals[i][j] = n;
      }
    }
  }

  randomize() {
    // each element of the matrix has a random value between -1 and 1
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.vals[i][j] = Math.random() * 2 - 1;
      }
    }
  }

  add(n) {
    if (n instanceof Matrix) {
      if (this.rows != n.rows || this.cols != n.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      } else {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            this.vals[i][j] += n.vals[i][j];
          }
        }
        return this;
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.vals[i][j] += n;
        }
      }
      return this;
    }
  }

  static subtract(a, b) {
    if (a.rows != b.rows || a.cols != b.cols) {
      console.log('Columns and Rows of A must match Columns and Rows of B.');
      return;
    } else {
      let ans = new Matrix(a.rows, a.cols);
      for (let i = 0; i < ans.rows; i++) {
        for (let j = 0; j < ans.cols; j++) {
          ans.vals[i][j] = a.vals[i][j] - b.vals[i][j];
        }
      }
      return ans;
    }
  }

  static transpose(input) {
    let a = new Matrix(input.cols, input.rows);
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        a.vals[i][j] = input.vals[j][i];
      }
    }
    return a;
  }

  multiply(n) {
    if (n instanceof Matrix) {
      // hadamard product
      if (this.rows != n.rows || this.cols != n.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      } else {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            this.vals[i][j] *= n.vals[i][j];
          }
        }
        return this;
      }
    } else {
      // scalar product
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.vals[i][j] *= n;
        }
      }
      return this;
    }
  }

  static multiply(m, n) {
    // Matrix Product
    if (m.cols != n.rows) {
      console.log('Columns of A must match rows of B.');
      return;
    } else {
      let ans = new Matrix(m.rows, n.cols);
      for (let i = 0; i < m.rows; i++) {
        for (let j = 0; j < n.cols; j++) {
          for (let k = 0; k < m.cols; k++) {
            ans.vals[i][j] += (m.vals[i][k] * n.vals[k][j]);
          }
        }
      }
      return ans;
    }
  }

  static normaliseRows(input) {
    let a = new Matrix(input.rows, input.cols);
    for (let i = 0; i < a.rows; i++) {
      let sum = 0;
      for (let j = 0; j < a.cols; j++) {
        sum += input.vals[i][j];
      }
      for (let j = 0; j < a.cols; j++) {
        a.vals[i][j] = input.vals[i][j] / sum;
      }
    }
    return a;
  }

  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.vals[i][j] = func(this.vals[i][j]);
      }
    }
  }

  static map(matrix, func) {
    let result = new Matrix(matrix.rows, matrix.cols);
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        matrix.vals[i][j] = func(matrix.vals[i][j]);
      }
    }
    return matrix;
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let matrix = new Matrix(data.rows, data.cols);
    matrix.vals = data.vals;
    return matrix;
  }
}