import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
export default function ProgressChart({ data, dataKey, color = '#6fcf7f', height = 180, grid = false, unit = '' }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} barSize={14}>
        {grid && <CartesianGrid vertical={false} stroke="#eee" />}
        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
        {grid && <YAxis allowDecimals={false} axisLine={false} tickLine={false} width={30} tick={{ fontSize: 11 }} />}
        <Tooltip formatter={v => v + unit} cursor={{ fill: 'rgba(0,0,0,.04)' }} />
        <Bar dataKey={dataKey} fill={color} radius={[8, 8, 8, 8]} background={{ fill: '#eef0f3', radius: 8 }} />
      </BarChart>
    </ResponsiveContainer>
  )
}
