class Punto1Controller {
  sortNumbers(req, res) {
    const { integerList } = req.body;

    if (Punto1Controller.containsNegativeNumber(integerList)) {
      return res.send({ data: "Los números deben ser positivos" });
    }

    const sortedNumbers = Punto1Controller.sortDescending(integerList);

    return res.send({ data: sortedNumbers });
  }

  static containsNegativeNumber(numberList) {
    return numberList.some((number) => parseInt(number) < 0);
  }

  static sortDescending(numberList) {
    return [...numberList].sort().reverse().join("");
  }
}

module.exports = Punto1Controller;
