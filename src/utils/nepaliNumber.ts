export function toNepaliNumber(num: number | string): string {
  const nepaliDigits = ["०","१","२","३","४","५","६","७","८","९"];
  return num.toString().split("").map(ch =>
    ch >= "0" && ch <= "9" ? nepaliDigits[+ch] : ch
  ).join("");
}
