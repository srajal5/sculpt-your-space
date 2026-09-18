import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const resumeHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Srajal Puri - Resume</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: #111827;
        margin: 0;
        padding: 40px;
        line-height: 1.45;
        font-size: 13px;
      }
      .header {
        border-bottom: 2px solid #3b82f6;
        padding-bottom: 15px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .name {
        font-size: 26px;
        font-weight: 800;
        color: #1e3a8a;
        margin: 0;
      }
      .title {
        font-size: 14px;
        font-weight: 600;
        color: #4b5563;
        margin-top: 4px;
      }
      .contact-info {
        text-align: right;
        font-size: 11px;
        color: #4b5563;
        line-height: 1.6;
      }
      .contact-info a {
        color: #2563eb;
        text-decoration: none;
      }
      h2 {
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #1e3a8a;
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 4px;
        margin-top: 18px;
        margin-bottom: 10px;
      }
      .item {
        margin-bottom: 12px;
      }
      .item-header {
        display: flex;
        justify-content: space-between;
        font-weight: 700;
        font-size: 13px;
      }
      .item-sub {
        display: flex;
        justify-content: space-between;
        color: #4b5563;
        font-style: italic;
        font-size: 12px;
        margin-bottom: 4px;
      }
      ul {
        margin: 4px 0 8px 18px;
        padding: 0;
      }
      li {
        margin-bottom: 3px;
        color: #374151;
      }
      .skills-grid {
        display: grid;
        grid-template-columns: 140px 1fr;
        gap: 6px;
        font-size: 12px;
      }
      .skills-label {
        font-weight: 700;
        color: #1f2937;
      }
      .skills-list {
        color: #4b5563;
      }
      .badge {
        display: inline-block;
        background: #eff6ff;
        color: #1d4ed8;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 600;
        margin-left: 6px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div>
        <h1 class="name">SRAJAL PURI</h1>
        <div class="title">AI / Generative AI / Full-Stack Engineer</div>
        <div style="font-size: 12px; color: #4b5563; margin-top: 4px;">Pune, Maharashtra, India</div>
      </div>
      <div class="contact-info">
        <div>Email: <a href="mailto:Srajalpuri55@gmail.com">Srajalpuri55@gmail.com</a></div>
        <div>GitHub: <a href="https://github.com/srajal5">github.com/srajal5</a></div>
        <div>LinkedIn: <a href="https://www.linkedin.com/in/srajalpuri">linkedin.com/in/srajalpuri</a></div>
      </div>
    </div>

    <h2>Education</h2>
    <div class="item">
      <div class="item-header">
        <span>Master of Computer Applications (MCA) <span class="badge">CGPA: 8.95</span></span>
        <span>Aug 2025 – Present</span>
      </div>
      <div class="item-sub">
        <span>Dr. D. Y. Patil School of Science and Technology</span>
        <span>Pune, India</span>
      </div>
      <div>Specializing in Artificial Intelligence, Generative AI, and Scalable Full-Stack Engineering.</div>
    </div>

    <h2>Flagship Engineering Projects</h2>
    <div class="item">
      <div class="item-header">
        <span>IntelliForge — High-Throughput AI Intelligence Pipeline</span>
        <span>2026</span>
      </div>
      <div class="item-sub">
        <span>Python, AsyncIO, MongoDB, OpenRouter LLMs, REST APIs</span>
        <span><a href="https://github.com/srajal5/IntelliForge">github.com/srajal5/IntelliForge</a></span>
      </div>
      <ul>
        <li>Architected an asynchronous Python pipeline ingesting 5,400+ intelligence records across fragmented multi-source streams.</li>
        <li>Implemented entity resolution, deduplication, 24-hour freshness checks, checkpointing, and robust rate-limited retries.</li>
        <li>Orchestrated OpenRouter LLMs with structured validation, automated chunking, fallback handling, and credential redaction.</li>
        <li>Achieved 100% test reliability with 363/363 passing unit/integration tests and zero SAST security vulnerabilities.</li>
      </ul>
    </div>

    <div class="item">
      <div class="item-header">
        <span>Sentinel AI — Real-Time CCTV Surveillance Platform</span>
        <span>2025</span>
      </div>
      <div class="item-sub">
        <span>FastAPI, YOLOv8, OpenCV, React.js, MongoDB, Tailwind CSS</span>
        <span><a href="https://github.com/srajal5">github.com/srajal5</a></span>
      </div>
      <ul>
        <li>Engineered a real-time computer vision platform detecting road accidents and violence incidents directly from CCTV feeds.</li>
        <li>Integrated YOLOv8 object detection with an OpenCV video ingestion pipeline for low-latency visual preprocessing.</li>
        <li>Built FastAPI backend with MongoDB incident persistence, automated emergency alerting, and response coordination.</li>
        <li>Designed a responsive telemetry dashboard displaying live incident tracking and spatial analytics.</li>
      </ul>
    </div>

    <div class="item">
      <div class="item-header">
        <span>NutriTrackAI — Conversational Nutrition & Fitness Intelligence</span>
        <span>2026</span>
      </div>
      <div class="item-sub">
        <span>React, Node.js, Express.js, MongoDB, OpenRouter, Recharts</span>
        <span><a href="https://nutritrack-eight.vercel.app/">nutritrack-eight.vercel.app</a></span>
      </div>
      <ul>
        <li>Built an intelligent conversational nutrition coach converting natural language meal logs into structured macronutrient records.</li>
        <li>Integrated OpenRouter LLM endpoints with MongoDB Atlas storage, statistical charts, and reactive user progress analytics.</li>
      </ul>
    </div>

    <h2>Professional Experience</h2>
    <div class="item">
      <div class="item-header">
        <span>Web Development Intern — Orinson Technologies</span>
        <span>Jul 2024 – Aug 2024</span>
      </div>
      <div class="item-sub">
        <span>React.js, JavaScript, Tailwind CSS, REST APIs</span>
        <span>Pune, India</span>
      </div>
      <ul>
        <li>Engineered interactive web application interfaces with React.js supporting 800+ active users.</li>
        <li>Delivered a 30% improvement in mobile UI usability and responsiveness through component modularization.</li>
      </ul>
    </div>

    <div class="item">
      <div class="item-header">
        <span>Google Cloud Generative AI Virtual Internship</span>
        <span>Apr 2024 – Jun 2024</span>
      </div>
      <div class="item-sub">
        <span>Google Cloud Platform, Vertex AI, Large Language Models</span>
        <span>Virtual</span>
      </div>
      <ul>
        <li>Implemented Generative AI workflows, prompt design patterns, and foundational model deployment on Google Cloud.</li>
      </ul>
    </div>

    <h2>Technical Competencies</h2>
    <div class="skills-grid">
      <div class="skills-label">Languages:</div>
      <div class="skills-list">Python, JavaScript / TypeScript, Java, SQL</div>
      <div class="skills-label">AI & ML:</div>
      <div class="skills-list">Generative AI, LLM APIs (OpenRouter), YOLOv8, OpenCV, Machine Learning, PyTorch</div>
      <div class="skills-label">Full-Stack & APIs:</div>
      <div class="skills-list">FastAPI, React.js, Node.js, Express.js, Tailwind CSS, RESTful API Architecture</div>
      <div class="skills-label">Databases & Cloud:</div>
      <div class="skills-list">MongoDB, Google Cloud Platform (Vertex AI), MySQL, PostgreSQL, Supabase</div>
      <div class="skills-label">Tools & DevOps:</div>
      <div class="skills-list">Git, GitHub, Postman, Linux, AsyncIO, CI/CD Workflows</div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(resumeHtml, { waitUntil: 'load' });
  
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'resume.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' }
  });

  console.log('Resume successfully generated at:', outputPath);
  await browser.close();
}

generateResume().catch(console.error);
