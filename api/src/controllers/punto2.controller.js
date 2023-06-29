class Punto2Controller {
  findLetterIndices(req, res) {
    const { message } = req.body;

    if (Punto2Controller.containsLetter(message, "a")) {
      const indices = Punto2Controller.getLetterIndices(message, "a");
      const shiftedIndices = Punto2Controller.shiftIndices(indices, 1);
      const responseMessage = Punto2Controller.generateResponseMessage(
        shiftedIndices,
        "a"
      );
      return res.send({ message: responseMessage });
    } else {
      return res.send({
        message: "La cadena de caracteres NO contiene la letra 'a'",
      });
    }
  }

  static containsLetter(text, letter) {
    return text.includes(letter);
  }

  static getLetterIndices(text, letter) {
    const indices = [];
    let index = text.indexOf(letter);
    while (index !== -1) {
      indices.push(index);
      index = text.indexOf(letter, index + 1);
    }
    return indices;
  }

  static shiftIndices(indices, shift) {
    return indices.map((index) => index + shift);
  }

  static generateResponseMessage(indices, letter) {
    const indicesString = indices.join(", ");
    return `La letra '${letter}' se encuentra en la posición: ${indicesString}`;
  }
}

module.exports = Punto2Controller;
