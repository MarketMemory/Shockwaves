import { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns';

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, TimeScale, annotationPlugin);

export default function ChartWithAnnotations({ data, events }) {
  const chartRef = useRef();

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'DJI Index',
        data: data.map(d => d.value),
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
        tension: 0.2,
      }
    ]
  };

  // Create vertical line annotations for each event
  const annotations = events.reduce((acc, event, i) => {
    acc[`line${i}`] = {
      type: 'line',
      xMin: event.date,
      xMax: event.date,
      borderColor: 'red',
      borderWidth: 2,
      label: {
        display: true,
        content: event.title,
        color: 'red',
        position: 'start',
      }
    };
    return acc;
  }, {});

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Dow Jones Industrial Average (DJI) met gebeurtenissen'
      },
      annotation: {
        annotations
      },
      tooltip: {
        callbacks: {
          afterBody: (tooltipItems) => {
            const item = tooltipItems[0];
            const matchingEvent = events.find(e => e.date === item.label);
            return matchingEvent ? [`Gebeurtenis: ${matchingEvent.title}`, matchingEvent.description] : [];
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month'
        }
      }
    }
  };

  return <div style={{ maxWidth: 900, margin: 'auto' }}>
    <Line ref={chartRef} data={chartData} options={options} />
  </div>;
}
