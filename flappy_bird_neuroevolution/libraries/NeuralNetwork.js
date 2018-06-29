class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

let tanh = new ActivationFunction(
  x => Math.tanh(x),
  y => 1 - (y * y)
);

class NeuralNetwork {
  constructor(a, b, c) {
    if (a instanceof NeuralNetwork) {
      this.inputNodes = a.inputNodes;
      this.hiddenNodes = a.hiddenNodes;
      this.outputNodes = a.outputNodes;

      this.weights_ih = a.weights_ih.copy();
      this.weights_ho = a.weights_ho.copy();

      this.bias_h = a.bias_h.copy();
      this.bias_o = a.bias_o.copy();
    } else {
      this.inputNodes = a;
      this.hiddenNodes = b;
      this.outputNodes = c;

      this.weights_ih = new Matrix(this.hiddenNodes, this.inputNodes);
      this.weights_ho = new Matrix(this.outputNodes, this.hiddenNodes);

      this.weights_ih.randomize();
      this.weights_ho.randomize();

      this.bias_h = new Matrix(this.hiddenNodes, 1);
      this.bias_o = new Matrix(this.outputNodes, 1);

      this.bias_h.randomize();
      this.bias_o.randomize();
    }
    this.setLearningRate();
    this.setActivationFunction();
  }

  setLearningRate(learning_rate = 0.1) {
    this.learningrate = learning_rate;
  }

  setActivationFunction(func = sigmoid) {
    this.activation_function = func;
  }

  predict(input_arr) {

    let inputs = Matrix.fromArray(input_arr);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(this.activation_function.func);

    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(this.activation_function.func);

    return outputs.toArray();
  }

  train(inputs_arr, labels_arr) {
    // predict first!
    let inputs = Matrix.fromArray(inputs_arr);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(this.activation_function.func);

    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(this.activation_function.func);

    // convert labels array into a column matrix
    let labels = Matrix.fromArray(labels_arr);

    // calculate output layer errors
    let output_errors = Matrix.subtract(labels, outputs);
    let gradients = Matrix.map(outputs, this.activation_function.dfunc);
    gradients.multiply(output_errors);
    gradients.multiply(this.learningrate);
    // Calculate hidden->output deltas
    let weight_ho_deltas = Matrix.multiply(gradients, Matrix.transpose(hidden));
    // Adjust the weights by deltas
    this.weights_ho.add(weight_ho_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_o.add(gradients);

    // Calculate the hidden layer errors
    let hidden_errors = Matrix.multiply(Matrix.transpose(Matrix.normaliseRows(this.weights_ho)), output_errors);
    let hidden_gradients = Matrix.map(hidden, this.activation_function.dfunc);
    hidden_gradients.multiply(hidden_errors);
    hidden_gradients.multiply(this.learningrate);
    // Calcuate input->hidden deltas
    let weight_ih_deltas = Matrix.multiply(hidden_gradients, Matrix.transpose(inputs));
    // Adjust the weights by deltas
    this.weights_ih.add(weight_ih_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_h.add(hidden_gradients);
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let nn = new NeuralNetwork(data.inputNodes, data.hiddenNodes, data.outputNodes);
    nn.weights_ih = Matrix.deserialize(data.weights_ih);
    nn.weights_ho = Matrix.deserialize(data.weights_ho);
    nn.bias_h = Matrix.deserialize(data.bias_h);
    nn.bias_o = Matrix.deserialize(data.bias_o);
    nn.learningrate = data.learningrate;
    return nn;
  }

  // Adding functions for neuro-evolution
  copy() {
    return new NeuralNetwork(this);
  }

  mutate(rate) {
    function mutate(val) {
      if (Math.random() < rate) {
        // return 2 * Math.random() - 1;
        return val + randomGaussian() * 0.5;
      } else {
        return val;
      }
    }
    this.weights_ih.map(mutate);
    this.weights_ho.map(mutate);
    this.bias_h.map(mutate);
    this.bias_o.map(mutate);
  }
}