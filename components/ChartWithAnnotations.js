import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts"

export default function ChartWithAnnotations({ data = [], events = [] }) {
  const annotations = events.length
    ? events.reduce((acc, evt) => {
        const x = new Date(evt.date).getTime()
        acc.push({
          x: x,
          stroke: "red",
          strokeWidth: 2,
          label: {
            position: "top",
            value: evt.description,
            fill: "red",
            fontSize: 12,
            offset: 5,
          },
        })
        return acc
      }, [])
    : []

  return (
    <LineChart
      width={700}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
      <YAxis />
      <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      {annotations.map((annotation, index) => (
        <ReferenceLine
          key={index}
          x={annotation.x}
          stroke={annotation.stroke}
          strokeWidth={annotation.strokeWidth}
          label={annotation.label}
        />
      ))}
    </LineChart>
  )
}
