const canvas = require("@napi-rs/canvas");

module.exports = async function ({
    options,
    validatedColor,
    validatedProgress,
    validatedStartTime,
    validatedEndTime
}) {
    const progressBarWidth = (validatedProgress / 100) * 670;
    const circleX = progressBarWidth + 60;

    // Progress Bar
    const progressBarCanvas = canvas.createCanvas(670, 25);
    const progressBarCtx = progressBarCanvas.getContext("2d");

    const cornerRadius = 10;

    progressBarCtx.beginPath();
    progressBarCtx.moveTo(cornerRadius, 0);
    progressBarCtx.lineTo(670 - cornerRadius, 0);
    progressBarCtx.arc(670 - cornerRadius, cornerRadius, cornerRadius, 1.5 * Math.PI, 2 * Math.PI);
    progressBarCtx.lineTo(670, 25 - cornerRadius);
    progressBarCtx.arc(670 - cornerRadius, 25 - cornerRadius, cornerRadius, 0, 0.5 * Math.PI);
    progressBarCtx.lineTo(cornerRadius, 25);
    progressBarCtx.arc(cornerRadius, 25 - cornerRadius, cornerRadius, 0.5 * Math.PI, Math.PI);
    progressBarCtx.lineTo(0, cornerRadius);
    progressBarCtx.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, 1.5 * Math.PI);
    progressBarCtx.closePath();
    progressBarCtx.fillStyle = "#ababab";
    progressBarCtx.fill();

    progressBarCtx.beginPath();
    progressBarCtx.moveTo(cornerRadius, 0);
    progressBarCtx.lineTo(progressBarWidth - cornerRadius, 0);
    progressBarCtx.arc(progressBarWidth - cornerRadius, cornerRadius, cornerRadius, 1.5 * Math.PI, 2 * Math.PI);
    progressBarCtx.lineTo(progressBarWidth, 25);
    progressBarCtx.lineTo(cornerRadius, 25);
    progressBarCtx.arc(cornerRadius, 25 - cornerRadius, cornerRadius, 0.5 * Math.PI, Math.PI);
    progressBarCtx.lineTo(0, cornerRadius);
    progressBarCtx.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, 1.5 * Math.PI);
    progressBarCtx.closePath();
    progressBarCtx.fillStyle = `#${validatedColor}`;
    progressBarCtx.fill();

    // Progress Circle
    const circleCanvas = canvas.createCanvas(1000, 1000);
    const circleCtx = circleCanvas.getContext("2d");

    circleCtx.beginPath();
    circleCtx.arc(circleX, 97, 20, 0, Math.PI * 2);
    circleCtx.fillStyle = `#${validatedColor}`;
    circleCtx.fill();

    // Background
    const background = await canvas.loadImage(
        "https://ik.imagekit.io/MrCrazyBoyYT/Images/Muzicard/yukii_space.png"
    );

    // Thumbnail
    const thumbnailCanvas = canvas.createCanvas(650, 650);
    const thumbnailCtx = thumbnailCanvas.getContext("2d");

    let thumbnailImage;

    try {
        thumbnailImage = await canvas.loadImage(options.thumbnail, {
            requestOptions: {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
                },
            },
        });
    } catch (error) {
        throw new Error(
            `Failed to load Thumbnail Image\nThe Image URL is invalid or the image is not accessible\n${error}`
        );
    }

    const thumbnailSize = Math.min(
        thumbnailImage.width,
        thumbnailImage.height
    );

    const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
    const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;

    const radius = 45;

    thumbnailCtx.beginPath();
    thumbnailCtx.moveTo(radius, 0);
    thumbnailCtx.arcTo(
        thumbnailCanvas.width,
        0,
        thumbnailCanvas.width,
        thumbnailCanvas.height,
        radius
    );
    thumbnailCtx.arcTo(
        thumbnailCanvas.width,
        thumbnailCanvas.height,
        0,
        thumbnailCanvas.height,
        radius
    );
    thumbnailCtx.arcTo(
        0,
        thumbnailCanvas.height,
        0,
        0,
        radius
    );
    thumbnailCtx.arcTo(
        0,
        0,
        thumbnailCanvas.width,
        0,
        radius
    );
    thumbnailCtx.closePath();
    thumbnailCtx.clip();

    thumbnailCtx.drawImage(
        thumbnailImage,
        thumbnailX,
        thumbnailY,
        thumbnailSize,
        thumbnailSize,
        0,
        0,
        thumbnailCanvas.width,
        thumbnailCanvas.height
    );

    // Main Canvas
    const image = canvas.createCanvas(1280, 450);
    const ctx = image.getContext("2d");

    ctx.drawImage(background, 0, 0, 1280, 450);

    const gradient = ctx.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(0, "rgba(0,0,0,0.5)");
    gradient.addColorStop(0.5, "rgba(0,0,0,0.5)");
    gradient.addColorStop(1, "rgba(0,0,0,0.5)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1280, 450);

    ctx.fillStyle = `#${validatedColor}`;
    ctx.font = "80px ariana, noto-emoji";
    ctx.fillText(options.name, 490, 200);

    ctx.fillStyle = "#b8b8b8";
    ctx.font = "40px ariana, noto-emoji";
    ctx.fillText(options.author, 510, 260);

    ctx.fillStyle = "#ffffff";
    ctx.font = "30px ariana";
    ctx.fillText(validatedStartTime, 470, 370);

    ctx.fillText(validatedEndTime, 1020, 370);

    ctx.drawImage(thumbnailCanvas, 70, 100, 290, 290);
    ctx.drawImage(progressBarCanvas, 500, 320, 550, 20);
    ctx.drawImage(circleCanvas, 370, 230, 1000, 1000);

    return image.toBuffer("image/png");
};