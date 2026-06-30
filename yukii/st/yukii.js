const canvas = require("@napi-rs/canvas");
const { colorFetch } = require("../fn/colorFetch");
const path = require("path");

const THEMES = Object.freeze({
    classic: require("../themes/classic"),
    dynamic: require("../themes/dynamic"),
    neon: require("../themes/neon"),
    neonx: require("../themes/neonx"),
    ravyy: require("../themes/ravyy"),
    ravyyx: require("../themes/ravyyx"),
    anime: require("../themes/anime"),
    animex: require("../themes/animex"),
    animes: require("../themes/animes"),
    animesx: require("../themes/animesx"),
    space: require("../themes/space"),
    spacex: require("../themes/spacex")
});

// Register all custom fonts
canvas.GlobalFonts.registerFromPath(path.join(__dirname, "font", "KaushanScript-Regular.ttf"), "mayank");
canvas.GlobalFonts.registerFromPath(path.join(__dirname, "font", "circularstd-black.otf"), "circular-std");
canvas.GlobalFonts.registerFromPath(path.join(__dirname, "font", "notosans-jp-black.ttf"), "noto-sans-jp");
canvas.GlobalFonts.registerFromPath(path.join(__dirname, "font", "notosans-black.ttf"), "noto-sans");
canvas.GlobalFonts.registerFromPath(path.join(__dirname, "font", "notoemoji-bold.ttf"), "noto-emoji");
canvas.GlobalFonts.registerFromPath(path.join(__dirname, "font", "notosans-kr-black.ttf"), "noto-sans-kr");
canvas.GlobalFonts.registerFromPath(path.join(__dirname, "font", "Space.ttf"), "space");
canvas.GlobalFonts.registerFromPath(path.join(__dirname, "font", "AkayaTelivigala-Regular.ttf"), "spacex");
canvas.GlobalFonts.registerFromPath(path.join(__dirname, "font", "BerkshireSwash-Regular.ttf"), "ariana");
canvas.GlobalFonts.registerFromPath(path.join(__dirname, "font", "Chewy-Regular.ttf"), "chewy");
canvas.GlobalFonts.registerFromPath(path.join(__dirname, "font", "CaveatBrush-Regular.ttf"), "ravyy");
canvas.GlobalFonts.registerFromPath(path.join(__dirname, "font", "Satisfy-Regular.ttf"), "sneha");

class Yukii {
    constructor(options) {
        this.name = options?.name ?? null;
        this.author = options?.author ?? null;
        this.color = options?.color ?? null;
        this.theme = options?.theme ?? null;
        this.brightness = options?.brightness ?? null;
        this.thumbnail = options?.thumbnail ?? null;
        this.progress = options?.progress ?? null;
        this.starttime = options?.startTime ?? null;
        this.endtime = options?.endTime ?? null;
    }

    setName(name) { this.name = name; return this; }
    setAuthor(author) { this.author = author; return this; }
    setColor(color) { this.color = color; return this; }
    setTheme(theme) { this.theme = theme || "neonx"; return this; }
    setBrightness(brightness) { this.brightness = brightness; return this; }
    setThumbnail(thumbnail) { this.thumbnail = thumbnail; return this; }
    setProgress(progress) { this.progress = progress; return this; }
    setStartTime(starttime) { this.starttime = starttime; return this; }
    setEndTime(endtime) { this.endtime = endtime; return this; }

    async build() {
        if (!this.name) throw new Error("Missing name parameter");
        if (!this.author) throw new Error("Missing author parameter");

        if (!this.color) this.setColor("ff0000");
        if (!this.theme) this.setTheme("classic");
        if (!this.brightness) this.setBrightness(0);
        if (!this.thumbnail) this.setThumbnail("https://picsum.photos/512");
        if (!this.progress) this.setProgress(0);
        if (!this.starttime) this.setStartTime("0:00");
        if (!this.endtime) this.setEndTime("0:00");

        let validatedProgress = Number(this.progress);

        if (Number.isNaN(validatedProgress) || validatedProgress < 0 || validatedProgress > 100) {
            throw new Error("Invalid progress parameter, must be between 0 to 100");
        }

        if (validatedProgress < 2) validatedProgress = 2;
        if (validatedProgress > 99) validatedProgress = 99;

        const validatedStartTime = this.starttime || "0:00";
        const validatedEndTime = this.endtime || "0:00";

        const validatedColor = await colorFetch(
            this.color,
            Number(this.brightness) || 0,
            this.thumbnail
        );

        // Keep the original behaviour until all themes are migrated.
        if (this.name.length > 15) {
            this.name = `${this.name.slice(0, 13)}...`;
        }

        if (this.author.length > 15) {
            this.author = `${this.author.slice(0, 13)}...`;
        }

        const themeFn = THEMES[this.theme.toLowerCase()];

        if (!themeFn) {
            throw new Error(`Unknown theme: ${this.theme}`);
        }

        return await themeFn({
            options: this,
            validatedColor,
            validatedProgress,
            validatedStartTime,
            validatedEndTime
        });
    }
}

module.exports = { Yukii };