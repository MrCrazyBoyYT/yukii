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

    const circleCanvas = canvas.createCanvas(1000, 1000);
    const circleCtx = circleCanvas.getContext("2d");

    const circleRadius = 20;
    const circleY = 97;

    circleCtx.beginPath();
    circleCtx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    circleCtx.fillStyle = `#${validatedColor}`;
    circleCtx.fill();

    const background = await canvas.loadImage("https://ik.imagekit.io/MrCrazyBoyYT/Images/Muzicard/classic.png");

    const thumbnailCanvas = canvas.createCanvas(564, 564);
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

    const thumbnailSize = Math.min(thumbnailImage.width, thumbnailImage.height);
    const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
    const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;

    const cornerRadius2 = 45;

    thumbnailCtx.beginPath();
    thumbnailCtx.moveTo(cornerRadius2, 0);
    thumbnailCtx.arcTo(
        thumbnailCanvas.width,
        0,
        thumbnailCanvas.width,
        thumbnailCanvas.height,
        cornerRadius2
    );
    thumbnailCtx.arcTo(
        thumbnailCanvas.width,
        thumbnailCanvas.height,
        0,
        thumbnailCanvas.height,
        cornerRadius2
    );
    thumbnailCtx.arcTo(
        0,
        thumbnailCanvas.height,
        0,
        0,
        cornerRadius2
    );
    thumbnailCtx.arcTo(
        0,
        0,
        thumbnailCanvas.width,
        0,
        cornerRadius2
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

    const image = canvas.createCanvas(1280, 450);
    const ctx = image.getContext("2d");

    ctx.drawImage(background, 0, 0, 1280, 450);

    ctx.fillStyle = `#${validatedColor}`;
    ctx.font = "75px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr";
    ctx.fillText(options.name, 70, 120);

    ctx.fillStyle = "#b8b8b8";
    ctx.font = "50px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr";
    ctx.fillText(options.author, 75, 190);

    ctx.fillStyle = "#fff";
    ctx.font = "30px circular-std";
    ctx.fillText(validatedStartTime, 70, 410);

    ctx.fillStyle = "#fff";
    ctx.font = "30px circular-std";
    ctx.fillText(validatedEndTime, 680, 410);

    ctx.drawImage(thumbnailCanvas, 837, 8, 435, 435);
    ctx.drawImage(progressBarCanvas, 70, 340, 670, 25);
    ctx.drawImage(circleCanvas, 10, 255, 1000, 1000);

    return image.toBuffer("image/png");
};