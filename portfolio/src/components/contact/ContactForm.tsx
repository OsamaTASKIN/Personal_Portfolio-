"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/constants";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const project = String(form.get("project") ?? "");
    const budget = String(form.get("budget") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject: ${project}\nBudget: ${budget}\n\n${message}`);
    setSent(true);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  return <form className="contact-form" onSubmit={handleSubmit}>
    <div className="contact-field contact-field-half">
      <label htmlFor="name">Your name</label>
      <input id="name" name="name" type="text" autoComplete="name" placeholder="Osama" required />
    </div>
    <div className="contact-field contact-field-half">
      <label htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
    </div>
    <div className="contact-field contact-field-half">
      <label htmlFor="project">What are we building?</label>
      <select id="project" name="project" defaultValue="" required>
        <option value="" disabled>Select a project type</option>
        <option>Website or digital experience</option>
        <option>Product or platform</option>
        <option>AI or automation system</option>
        <option>CRM or marketing workflow</option>
        <option>Something else</option>
      </select>
    </div>
    <div className="contact-field contact-field-half">
      <label htmlFor="budget">Approximate budget</label>
      <select id="budget" name="budget" defaultValue="">
        <option value="">Still figuring it out</option>
        <option>$2k – $5k</option>
        <option>$5k – $10k</option>
        <option>$10k – $25k</option>
        <option>$25k+</option>
      </select>
    </div>
    <div className="contact-field contact-field-message">
      <label htmlFor="message">Tell me about the idea</label>
      <textarea id="message" name="message" rows={5} placeholder="The challenge, the ambition, and when you would like to launch…" required />
    </div>
    <div className="contact-form-footer">
      <p>{sent ? "Your email app should be open — send it when ready." : "I usually reply within 1–2 working days."}</p>
      <button className="contact-submit" type="submit"><span>Send enquiry</span><span aria-hidden="true">↗</span></button>
    </div>
  </form>;
}
