export function calcularDiasUteis(dataInicial: Date, dataFinal: Date) {
  let data = new Date(dataInicial);
  let diasUteis = 0;
  while (data <= dataFinal) {
    if (data.getDay() !== 0 && data.getDay() !== 6) {
      diasUteis++;
    }
    data.setDate(data.getDate() + 1);
  }
  return diasUteis;
}
