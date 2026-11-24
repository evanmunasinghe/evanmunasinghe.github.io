# Evan Munasinghe — Portfolio

Personal portfolio of **Evan Munasinghe**, full-stack developer and founder of Aureus Technologies, Sri Lanka.

Live at **https://evanmunasinghe.dev**

## What's inside

- **Hero** with a typing role line, photo, and social links
- **Why work with me**: three short value cards
- **Tech expertise**: skills grouped by area, each with its logo
- **Experience & education** timeline
- **Projects showcase** with screenshots, live links, and filters (Business systems, Web & mobile, University)
- **Contact form** that opens WhatsApp with the message already filled in

It's a plain static site: HTML, CSS, and a small amount of vanilla JavaScript. No build step, no framework, no dependencies to install.

## Run it locally

```bash
python3 -m http.server
```

Then open http://localhost:8000.

## Project structure

```
index.html          page content
styles.css          all styling (colours are CSS variables at the top)
script.js           typing effect, mobile menu, active nav link, project filter, contact form
assets/
  bg.webp           background image
  evan-munasinghe.jpeg, *-logo.*   photo and company logos
  thumbs/           compressed project screenshots used on the cards
  case/             full-width screenshots for the case-study pages
  tech/             technology logos (SVG)
```

## Common edits

**Add a project:** copy one `<article class="card project">` block in `index.html`. Set `data-cat` to `business`, `web`, or `uni` so the filters pick it up.

**Add a project screenshot:** make a small copy so the page stays fast, then point the card's `<img>` at it.

```bash
cwebp -q 78 -resize 800 0 your-shot.png -o assets/thumbs/name.webp
```

**Add a technology logo:** download it from Simple Icons and add a chip in the Tech expertise section.

```bash
curl -o assets/tech/name.svg https://cdn.simpleicons.org/<slug>
# dark logos: https://cdn.simpleicons.org/<slug>/white
```

**Update the CV:** edit `cv.html` and push. A GitHub Action (`.github/workflows/cv.yml`) rebuilds `assets/Evan-Munasinghe-CV.pdf` and commits it. To build it locally instead:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer \
  --print-to-pdf=assets/Evan-Munasinghe-CV.pdf cv.html
```

**Add an icon:** download its SVG from Font Awesome Free, copy the `<path>` into a new `<symbol id="name" viewBox="...">` in `assets/icons.svg`, then use it with `<svg class="fa" aria-hidden="true"><use href="assets/icons.svg#name"/></svg>`.

**Add a case study:** copy `projects/invotron.html`, change the text, and add a `cwebp`-compressed screenshot to `assets/case/`. Link it from the project card and add the URL to `sitemap.xml` and `llms.txt`.

**Change colours:** edit the variables in `:root` at the top of `styles.css` (`--purple` and `--cyan` are the two accent colours).

## Deploy

The site is served by GitHub Pages from the `main` branch, on the custom domain evanmunasinghe.dev (DNS managed in Vercel, `CNAME` file in the repo). Push to `main` and it updates within a minute or two.

## Credits

- Tech logos: [Simple Icons](https://simpleicons.org) (CC0) and [Devicon](https://devicon.dev) (MIT)
- Icons: [Font Awesome](https://fontawesome.com) Free (CC BY 4.0), bundled as an SVG sprite in `assets/icons.svg`
- Font: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (SIL OFL), self-hosted in `assets/fonts/`

© 2026 Evan Munasinghe
