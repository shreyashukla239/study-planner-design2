export default function StatCard({ value, label, grad }) {
  return <div className="stat" style={{ background: grad }}><b>{value}</b><span>{label}</span></div>
}
