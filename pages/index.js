import { useState } from 'react';
import ChartWithAnnotations from '../components/ChartWithAnnotations';
import djiData from '../data/dji.json';

export default function Home() {
  const [events, setEvents] = useState(djiData.events);
  const [form, setForm] = useState({ date: '', title: '', description: '' });

  function handleAddEvent(e) {
    e.preventDefault();
    setEvents([...events, form]);
    setForm({ date: '', title: '', description: '' });
  }

  return (
    <main style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>DJI Interactive Chart met Gebeurtenissen</h1>
      <ChartWithAnnotations data={djiData.prices} events={events} />
      <section style={{ marginTop: 40 }}>
        <h2>Nieuwe gebeurtenis toevoegen</h2>
        <form onSubmit={handleAddEvent} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input required type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          <input required type="text" placeholder="Titel" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <input required type="text" placeholder="Beschrijving" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <button type="submit">Toevoegen</button>
        </form>
      </section>
      <section style={{ marginTop: 40 }}>
        <h3>Gebeurtenissen</h3>
        <ul>
          {events.map(e => (
            <li key={e.date + e.title}><b>{e.date}:</b> {e.title} - {e.description}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
