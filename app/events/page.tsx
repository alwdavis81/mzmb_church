import { sanityFetch } from "@/sanity/lib/live";
import { Calendar, Cross, Music, Users, Star, BookOpen } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

async function getEvents(): Promise<Event[]> {
  const { data: events } = await sanityFetch({
    query: `*[_type == "event"] | order(date asc) {
      _id,
      title,
      date,
      description,
      category,
      image
    }`,
  });
  return (events as Event[]) ?? [];
}

type Event = {
  _id: string;
  title: string;
  date: string;
  description?: string;
  category?: string;
  image?: any;
};

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function EventIcon({ category }: { category?: string }) {
  const colors: Record<string, string> = {
    Worship: "var(--color-secondary)",
    Community: "#3B82F6",
    Music: "#8B5CF6",
    Special: "#F59E0B",
  };
  const color = colors[category ?? ""] ?? "var(--color-secondary)";
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: `${color}15`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color,
        flexShrink: 0,
      }}
    >
      {category === "Worship" && <Cross size={24} />}
      {category === "Community" && <Users size={24} />}
      {category === "Music" && <Music size={24} />}
      {category === "Special" && <Star size={24} />}
      {(!category || !["Worship", "Community", "Music", "Special"].includes(category)) && <Calendar size={24} />}
    </div>
  );
}

function WeeklySchedule() {
  const schedule = [
    { day: "Sunday", time: "10:00 AM", label: "Morning Worship", icon: <Cross size={28} /> },
    { day: "Wednesday", time: "7:00 PM", label: "Bible Study & Prayer", icon: <BookOpen size={28} /> },
    { day: "Thursday", time: "7:00 PM", label: "Choir Rehearsal", icon: <Music size={28} /> },
  ];
  return (
    <div className="grid-3" style={{ marginBottom: "3rem" }}>
      {schedule.map((s) => (
        <div
          key={s.day}
          className="card"
          style={{
            textAlign: "center",
            padding: "2rem 1.5rem",
            background: s.day === "Sunday" ? "var(--gradient-gold)" : "var(--color-surface)",
            color: s.day === "Sunday" ? "var(--color-primary)" : "inherit",
          }}
        >
          <div style={{ marginBottom: "0.75rem", height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>{s.day}</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: 700, color: s.day === "Sunday" ? "var(--color-primary)" : "var(--color-secondary)", marginBottom: "0.25rem" }}>
            {s.time}
          </p>
          <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}
function EventCard({ event }: { event: Event }) {
  return (
    <div className="event-card">
      <div className="event-card-image">
        {event.image ? (
          <Image src={urlFor(event.image).width(600).url()} alt={event.title} width={600} height={400} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
        ) : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <EventIcon category={event.category} />
          </div>
        )}
      </div>
      <div className="card-body">
        <span className="event-card-badge">{event.date}</span>
        <h3>{event.title}</h3>
        {event.description && (
          <p style={{ color: "var(--color-text-muted)" }}>{event.description}</p>
        )}
      </div>
    </div>
  );
}

export default async function EventsPage() {
  const events = await getEvents();

  const recurring = events.filter(
    (e) => e.date.toLowerCase().includes("every") || e.date.toLowerCase().includes("each")
  );

  const upcoming = events.filter(
    (e) => !e.date.toLowerCase().includes("every") && !e.date.toLowerCase().includes("each")
  );

  return (
    <>
      <header
        className="page-header text-center"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "white",
          padding: "4rem 0",
          marginBottom: "2rem",
        }}
      >
        <div className="container">
          <h1 className="text-center" style={{ color: "white", marginBottom: "0.5rem" }}>
            Events & Schedule
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              fontFamily: "var(--font-merriweather)",
              fontStyle: "italic",
              opacity: 0.9,
            }}
          >
            &ldquo;Join us in fellowship and worship.&rdquo;
          </p>
        </div>
      </header>

      <main className="container section">
        {/* Weekly Schedule */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ marginBottom: "1.5rem" }}>Weekly Schedule</h2>
          <WeeklySchedule />
        </div>

        {/* Regular / Recurring Events */}
        {recurring.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>Regular Events</h2>
            <div className="grid-2">
              {recurring.map((event: Event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Special Events */}
        {upcoming.length > 0 && (
          <div>
            <h2 style={{ marginBottom: "1.5rem" }}>Upcoming Special Events</h2>
            <div className="grid-2">
              {upcoming.map((event: Event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {(!events || events.length === 0) && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-text-muted)" }}>
            <Calendar size={48} style={{ marginBottom: "1rem", opacity: 0.4 }} />
            <h3>No Events Scheduled</h3>
            <p>Check back soon for upcoming events and gatherings.</p>
          </div>
        )}
      </main>
    </>
  );
}