import React from "react";
import { Link } from "react-router-dom";

const collections = [
  {
    number: "01 / LIVING",
    title: "Slow living",
    detail: "Pieces to settle into",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
    alt: "Sunlit living room with a warm, natural palette",
  },
  {
    number: "02 / DETAILS",
    title: "Little details",
    detail: "The finishing touches",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
    alt: "Thoughtfully styled home with collected furniture and decor",
  },
  {
    number: "03 / RETREAT",
    title: "Rest & reset",
    detail: "A softer place to land",
    image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1000&q=85",
    alt: "Calm bedroom in warm neutral tones",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Thoughtful finds, closer to home</p>
          <h1>Make room for <em>what you love.</em></h1>
          <p>
            A home comes together one meaningful piece at a time. Find one-of-a-kind
            decor from independent sellers and give good things a second story.
          </p>
          <div className="cta-row">
            <Link className="button" to="/browse">Explore the collection <span aria-hidden="true">&nbsp;↗</span></Link>
            <Link className="button secondary" to="/sell">Share your finds</Link>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90"
            alt="Inviting modern living room with natural textures and warm light"
          />
          <span className="image-caption">Spaces that feel like you.</span>
        </div>
      </section>

      <section className="trust-strip" aria-label="Our marketplace values">
        <div className="trust-item"><span className="trust-icon" aria-hidden="true">✳</span> One-of-a-kind home finds</div>
        <div className="trust-item"><span className="trust-icon" aria-hidden="true">⌂</span> Independent local sellers</div>
        <div className="trust-item"><span className="trust-icon" aria-hidden="true">♡</span> A more considered home</div>
      </section>

      <section className="collection-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Find your feeling</p>
            <h2>A little inspiration for every room.</h2>
          </div>
          <Link className="text-link" to="/browse">See all finds <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="collection-grid">
          {collections.map(collection => (
            <Link className="collection-card" to="/browse" key={collection.number}>
              <div className="collection-image">
                <img src={collection.image} alt={collection.alt} loading="lazy" />
                <span className="collection-number">{collection.number}</span>
              </div>
              <div className="collection-meta">
                <h3>{collection.title}</h3>
                <span>{collection.detail}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="story-section">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1200&q=85"
            alt="Quiet, sunlit home interior with natural wood and soft furnishings"
            loading="lazy"
          />
        </div>
        <div className="story-copy">
          <p className="eyebrow">A marketplace with heart</p>
          <h2>Good design feels even better when it has a story.</h2>
          <p>
            Meet the people behind the pieces. Browse considered homewares from
            sellers who believe the best rooms are collected, not copied.
          </p>
          <Link className="button" to="/browse">Meet your next favorite <span aria-hidden="true">&nbsp;↗</span></Link>
        </div>
      </section>

      <section className="feature-grid" aria-label="How Hearth and Home works">
        <article className="info-card">
          <h3>Find the one</h3>
          <p>Search by keyword, category, or state to uncover the pieces that feel just right.</p>
        </article>
        <article className="info-card">
          <h3>Shop small, live well</h3>
          <p>Connect directly with independent sellers and discover the story behind each find.</p>
        </article>
        <article className="info-card">
          <h3>Pass a good thing on</h3>
          <p>Have something special to share? Give it a new home with a listing of your own.</p>
        </article>
      </section>
    </>
  );
}
