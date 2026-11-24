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
  bg.jpg            background image (compressed copy of Background.jpeg)
  evan-munasinghe.jpeg, *-logo.*   photo and company logos
  thumbs/           compressed project screenshots used on the cards
  tech/             technology logos (SVG)
  Projects/         original full-size project screenshots
```

## Common edits

**Add a project:** copy one `<article class="card project">` block in `index.html`. Set `data-cat` to `business`, `web`, or `uni` so the filters pick it up.

**Add a project screenshot:** make a small copy so the page stays fast, then point the card's `<img>` at it.

```bash
sips -s format jpeg -s formatOptions 72 -Z 800 "assets/Projects/your-shot.png" --out assets/thumbs/name.jpg
```

**Add a technology logo:** download it from Simple Icons and add a chip in the Tech expertise section.

```bash
curl -o assets/tech/name.svg https://cdn.simpleicons.org/<slug>
# dark logos: https://cdn.simpleicons.org/<slug>/white
```

**Update the CV:** edit `cv.html`, then regenerate the PDF the Download CV button serves.

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer \
  --print-to-pdf=assets/Evan-Munasinghe-CV.pdf cv.html
```

**Change colours:** edit the variables in `:root` at the top of `styles.css` (`--purple` and `--cyan` are the two accent colours).

## Deploy

The site is served by GitHub Pages from the `main` branch, on the custom domain evanmunasinghe.dev (DNS managed in Vercel, `CNAME` file in the repo). Push to `main` and it updates within a minute or two.

## Credits

- Tech logos: [Simple Icons](https://simpleicons.org) (CC0) and [Devicon](https://devicon.dev) (MIT)
- Icons: [Font Awesome](https://fontawesome.com) Free
- Font: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts

© 2026 Evan Munasinghe
