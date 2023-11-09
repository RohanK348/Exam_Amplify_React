import accounting from 'accounting'

export function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function formatPercent(percent) {
  return `${accounting
    .formatMoney(percent, '', 1, ',', '.')
    .replace(/\.00$/g, '')}%`
}

export function formatCurrency(value) {
  return accounting.formatMoney(value, '$', 2, ',', '.').replace(/\.00$/g, '')
}

export function formatNumber(value) {
  return accounting.formatMoney(value, '', 2, ',', '.').replace(/\.00$/g, '')
}
