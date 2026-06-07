export function formatarData(data: string): string {
  const [ano, mes, dia] = data.split("-");
  const anoAtual = new Date().getFullYear().toString();
  return ano === anoAtual ? `${dia}/${mes}` : `${dia}/${mes}/${ano}`;
}

export function isAtrasada(dataPrazo?: string): boolean {
  const hoje = new Date();
  const prazo = new Date(dataPrazo || "");
  hoje.setHours(0, 0, 0, 0);
  return prazo < hoje;
}
