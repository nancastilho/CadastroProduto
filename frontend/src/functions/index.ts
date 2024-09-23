const dataAtual = new Date();
export const converterDataParaBrasil = (dataUTC: any) => {
  const partes = dataUTC.split("T");
  const dataFormatada =
    partes[0] + "T" + partes[1].split(":").slice(0, 2).join(":");

  return dataFormatada;
};

export const formatarDataBrasil = (dataUTCString: any) => {
  const partes = dataUTCString.split("T");
  const datacerta = partes[0].split("-");
  const dataFormatada =
    `${datacerta[2]}-${datacerta[1]}-${datacerta[0]}` +
    " " +
    partes[1].split(":").slice(0, 2).join(":");

  return dataFormatada;
};

export function getDataFormatada(): string {
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth() + 1; 
  const dia = dataAtual.getDate();

 
  const mesFormatado = mes < 10 ? `0${mes}` : mes;
  const diaFormatado = dia < 10 ? `0${dia}` : dia;

  return `${ano}${mesFormatado}${diaFormatado}`;
}

export function formatCPF(value: any) {
  const cpf = value.replace(/\D/g, "");

  const cpfMasked = cpf.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    "$1.$2.$3-$4"
  );

  return cpfMasked;
}

export function CalcTotal(a: number, b: number) {
  const total = a * b;

  return total;
}

export const formatDate = (dateString?: string): string => {
  const date = new Date(dateString || dataAtual);
  return date.toISOString().split("T")[0];
};

export const debounce = (func: any, delay: number) => {
  let debounceTimer: any;
  return (...args: any[]) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};

export function formatCurrency(
  value: any,
  locale = "pt-BR",
  currency = "BRL",
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  }).format(value);
}
