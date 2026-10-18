# Shingai Choto | Personal Portfolio Website

A responsive, multi-page personal portfolio built with HTML, CSS, JavaScript, and Bootstrap 5. It presents my background, skills, experience, and projects, and loads the project list dynamically from a JSON file.

Built for MIS 4013, Homework 2: Interactive Personal Portfolio Website.

## About Me

I am pursuing an accelerated BBA and MS in Management Information Systems and Management Information Technology at the University of Oklahoma (expected May 2027). I focus on data analytics and database management, using Power BI, SQL, and ETL workflows to turn enterprise data into insights.

## Pages

| Page | File | What it includes |
|------|------|------------------|
| Home | `index.html` | Bio, photo, career goals, time-of-day greeting, and a button to the projects |
| Skills | `skills.html` | Skills grouped into five categories, shown as Bootstrap cards and badges |
| Experience and Education | `experience.html` | Education, professional experience, and leadership, shown as cards |
| Projects | `projects.html` | Project cards generated from JSON, with category filters and keyword search |
| Contact | `contact.html` | Email, LinkedIn, and GitHub links (no form) |

## Features

- **Responsive Bootstrap navbar** that is identical on every page and collapses on small screens
- **Bootstrap grid** for layouts that adapt to the window size
- **Bootstrap components:** navbar, cards, badges, buttons, and alerts
- **Dynamic projects:** `fetch()` reads `data/projects.json`, and JavaScript loops through the data to build each card, so no project is written by hand in the HTML
- **Category filtering** with JavaScript (All, Web App, Landing Page, Capstone Project, JavaScript) without leaving the page
- **Project search** by title, description, or technology
- **Dark and light mode** toggle that remembers your choice
- **Time-of-day greeting** on the home page and a **back-to-top** button
- **Custom CSS theme** with its own colors, fonts, spacing, cards, buttons, and navigation, layered on top of Bootstrap

## Tech Stack

- HTML5
- CSS3 (custom stylesheet, CSS variables, dark theme)
- JavaScript (ES6, `fetch`, DOM manipulation)
- Bootstrap 5.3.2 (loaded from the jsDelivr CDN)
- JSON for project data

## Project Structure

```
.
├── index.html
├── skills.html
├── experience.html
├── projects.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── data/
│   └── projects.json
└── images/
    └── profile.png
```

## Running Locally

The Projects page uses `fetch()`, so the site has to be served over HTTP. Opening the HTML files directly with `file://` will block the JSON request.

Use any local server, for example:

- **Visual Studio Code:** install the Live Server extension, then choose "Open with Live Server" on `index.html`
- **Visual Studio:** run the project with its built-in web server
- **Python:** run `python -m http.server 8000` in the project folder, then open `http://localhost:8000`

## Adding or Editing Projects

Projects live in `data/projects.json`. To add one, add an object like this:

```json
{
  "title": "Project Name",
  "category": "Web App",
  "description": "One or two sentences about the project.",
  "technologies": ["HTML", "CSS", "JavaScript"],
  "link": "https://github.com/shingai7/your-repo"
}
```

New categories get their own filter button automatically.

## Deployment

The site is static, so it can be deployed with GitHub Pages: in the repository settings, open Pages and publish from the main branch.

## Contact

- Email: shingai@ou.edu
- LinkedIn: https://www.linkedin.com/in/shingai-choto/
- GitHub: https://github.com/shingai7
