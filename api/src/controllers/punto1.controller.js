class Punto1Controller {
  sortNumbers(req, res) {
    const { integerList } = req.body;

    if (this.containsNegativeNumber(integerList)) {
      return res.send({ data: "Los números deben ser positivos" });
    }

    const sortedNumbers = this.sortDescending(integerList);

    return res.send({ data: sortedNumbers });
  }

  containsNegativeNumber(numberList) {
    return numberList.some((number) => parseInt(number) < 0);
  }

  sortDescending(numberList) {
    return [...numberList].sort().reverse().join("");
  }
}

module.exports = Punto1Controller;
