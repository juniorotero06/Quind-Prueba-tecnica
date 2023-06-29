class Punto2Controller {
  findLetterIndices(req, res) {
    const { message } = req.body;

    if (this.containsLetter(message, "a")) {
      const indices = this.getLetterIndices(message, "a");
      const shiftedIndices = this.shiftIndices(indices, 1);
      const responseMessage = this.generateResponseMessage(shiftedIndices, "a");
      return res.send({ message: responseMessage });
    } else {
      return res.send({
        message: "La cadena de caracteres NO contiene la letra 'a'",
      });
    }
  }

  containsLetter(text, letter) {
    return text.includes(letter);
  }

  getLetterIndices(text, letter) {
    const indices = [];
    let index = text.indexOf(letter);
    while (index !== -1) {
      indices.push(index);
      index = text.indexOf(letter, index + 1);
    }
    return indices;
  }

  shiftIndices(indices, shift) {
    return indices.map((index) => index + shift);
  }

  generateResponseMessage(indices, letter) {
    const indicesString = indices.join(", ");
    return `La letra '${letter}' se encuentra en la posición: ${indicesString}`;
  }
}

module.exports = Punto2Controller;
