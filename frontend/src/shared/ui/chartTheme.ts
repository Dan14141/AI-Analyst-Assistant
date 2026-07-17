/* Светлая тема графиков. Семантические цвета синхронны с tokens.css;
   серии различимы на белой поверхности, включая доверительные интервалы. */
export const chartTheme = {
  primary: '#0057D6',
  forecast: '#6C9EE8',
  ink: '#182B4D',
  green: '#167C59',
  lime: '#0057D6',
  blue: '#0077A6',
  amber: '#9B630D',
  red: '#C03649',
  grid: '#E6ECF4',
  axis: {
    stroke: '#CBD6E5',
    tick: { fill: '#5F6F87', fontSize: 11 },
    tickLine: false,
    axisLine: false,
  },
  tooltip: {
    contentStyle: {
      background: '#FFFFFF',
      border: '1px solid #DEE6F0',
      borderRadius: 8,
      fontSize: 12,
      color: '#182B4D',
    },
    labelStyle: { color: '#50627D', fontWeight: 500, marginBottom: 6 },
    cursor: { stroke: '#BECCDF', fill: 'rgba(0,87,214,0.04)' },
  },
  /** Палитра для линий сравнения сценариев. */
  series: ['#0057D6', '#0077A6', '#747AB0', '#9B630D', '#167C59', '#C03649', '#43648F', '#98668F', '#537D6D', '#9A684D'],
} as const
