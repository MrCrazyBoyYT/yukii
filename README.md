# Yukii 🎵

> A modern, customizable music card generator for Discord bots.

[![npm version](https://img.shields.io/npm/v/yukii)](https://www.npmjs.com/package/yukii)
[![npm downloads](https://img.shields.io/npm/dm/yukii)](https://www.npmjs.com/package/yukii)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/MrCrazyBoyYT/yukii?style=social)](https://github.com/MrCrazyBoyYT/yukii)
[![GitHub issues](https://img.shields.io/github/issues/MrCrazyBoyYT/yukii)](https://github.com/MrCrazyBoyYT/yukii/issues)

---

## ✨ Features

- 🎵 Beautiful music cards
- 🎨 12 built-in themes
- 🌈 Automatic dominant color extraction
- 🖼️ Custom thumbnails
- 📈 Progress bar
- ⏱️ Start & End timestamps
- ⚡ Powered by `@napi-rs/canvas`
- 💙 Easy to use

---

## 📦 Installation

```bash
npm install yukii
```

---

## 🚀 Usage

```js
const { AttachmentBuilder } = require("discord.js");
const { Yukii } = require("yukii");

(async () => {
    const card = new Yukii()
        .setName(track.title)
        .setAuthor(track.author)
        .setColor("auto")
        .setTheme("neonx")
        .setBrightness(69);

    if (track.thumbnail) {
        card.setThumbnail(track.thumbnail);
    } else {
        card.setThumbnail(client.user.displayAvatarURL());
    }

    card
        .setProgress(69)
        .setStartTime("0:00")
        .setEndTime(track.length);

    const buffer = await card.build();

    const attachment = new AttachmentBuilder(buffer, {
        name: "Yukii.png",
    });

    await message.channel.send({
        files: [attachment],
    });
})();
```

---

# 🎨 Theme Preview

| Square Theme | Round Theme |
|--------------|-------------|
| `.setTheme("classic")` ![classic](https://ik.imagekit.io/MrCrazyBoyYT/Images/Examples/classic.png) | `.setTheme("dynamic")` ![dynamic](https://ik.imagekit.io/MrCrazyBoyYT/Images/Examples/dynamic.png) |
| `.setTheme("neon")` ![neon](https://ik.imagekit.io/MrCrazyBoyYT/Images/Examples/neon.png) | `.setTheme("neonx")` ![neonx](https://ik.imagekit.io/MrCrazyBoyYT/Images/Examples/neonx.png) |
| `.setTheme("anime")` ![anime](https://ik.imagekit.io/MrCrazyBoyYT/Images/Examples/anime.png) | `.setTheme("animex")` ![animex](https://ik.imagekit.io/MrCrazyBoyYT/Images/Examples/animex.png) |
| `.setTheme("animes")` ![animes](https://ik.imagekit.io/MrCrazyBoyYT/Images/Examples/animes.png) | `.setTheme("animesx")` ![animesx](https://ik.imagekit.io/MrCrazyBoyYT/Images/Examples/animesx.png) |
| `.setTheme("ravyy")` ![ravyy](https://ik.imagekit.io/MrCrazyBoyYT/Images/Examples/ravyy.png) | `.setTheme("ravyyx")` ![ravyyx](https://ik.imagekit.io/MrCrazyBoyYT/Images/Examples/ravyyx.png?updatedAt=1782813254356) |
| `.setTheme("space")` ![space](https://ik.imagekit.io/MrCrazyBoyYT/Images/Examples/space.png) | `.setTheme("spacex")` ![spacex](https://ik.imagekit.io/MrCrazyBoyYT/Images/Examples/spacex.png) |

---

## 📚 API

```js
new Yukii()
```

### Methods

```js
.setName(string)
.setAuthor(string)
.setThumbnail(url)
.setTheme(string)
.setColor(hex | "auto")
.setBrightness(number)
.setProgress(number)
.setStartTime(string)
.setEndTime(string)
.build()
```

---

## 🎨 Available Themes

```text
classic
dynamic
neon
neonx
anime
animex
animes
animesx
ravyy
ravyyx
space
spacex
```

---

## ❤️ Support

| Community | Team |
|-----------|------|
| Discord: https://discord.gg/e4hpdeMvtV | **MrCrazyBoyYT** |
| Instagram: https://www.instagram.com/op_entity_666 | **N O N** |
| GitHub: https://github.com/MrCrazyBoyYT | **N O N** |
| npm: https://www.npmjs.com/package/yukii | **N O N** |

---

## 📄 License

GPL-3.0-or-later

Copyright © 2026 MrCrazyBoyYT
