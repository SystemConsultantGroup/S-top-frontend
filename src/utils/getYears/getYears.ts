export function getYears() {
  const years = [];
  for (let i = 0; i < 6; i++) {
    years.push((new Date().getFullYear() - i).toString());
  }

  return years;
}
