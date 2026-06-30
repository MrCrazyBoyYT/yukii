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

    const image = canvas.createCanvas(1280, 450);
    const ctx = image.getContext("2d");

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

    circleCtx.beginPath();
    circleCtx.arc(circleX, 97, 20, 0, 2 * Math.PI);
    circleCtx.fillStyle = `#${validatedColor}`;
    circleCtx.fill();

    // Replace with your own asset later
    const background = await canvas.loadImage(
        "https://ik.imagekit.io/MrCrazyBoyYT/Images/Muzicard/yukii_anime.png"
    );

    const overlay = await canvas.loadImage(
        "https://ik.imagekit.io/MrCrazyBoyYT/Images/Muzicard/yukii_anime.png"
    );

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
    thumbnailCtx.arcTo(0, thumbnailCanvas.height, 0, 0, radius);
    thumbnailCtx.arcTo(0, 0, thumbnailCanvas.width, 0, radius);
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

    ctx.drawImage(background, 0, 0, 1280, 450);
    ctx.drawImage(overlay, 0, 0, 1280, 450);

    const gradient = ctx.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(0, "rgba(0,0,0,0.1)");
    gradient.addColorStop(0.5, "rgba(0,0,0,0.1)");
    gradient.addColorStop(1, "rgba(0,0,0,0.1)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1280, 450);

    ctx.fillStyle = `#${validatedColor}`;
    ctx.font = "90px chewy, noto-emoji";
    ctx.fillText(options.name, 450, 200);

    ctx.fillStyle = "#b8b8b8";
    ctx.font = "40px chewy, noto-emoji";
    ctx.fillText(options.author, 460, 260);

    ctx.fillStyle = "#fff";
    ctx.font = "30px chewy";
    ctx.fillText(validatedStartTime, 450, 380);

    ctx.fillText(validatedEndTime, 1050, 380);

    // Circular thumbnail
    const maskCanvas = canvas.createCanvas(
        thumbnailCanvas.width,
        thumbnailCanvas.height
    );
    const maskCtx = maskCanvas.getContext("2d");
    const maskRadius = thumbnailCanvas.width / 2;

    maskCtx.beginPath();
    maskCtx.arc(maskRadius, maskRadius, maskRadius, 0, 2 * Math.PI);
    maskCtx.closePath();
    maskCtx.fill();

    thumbnailCtx.globalCompositeOperation = "destination-in";
    thumbnailCtx.drawImage(maskCanvas, 0, 0);
    thumbnailCtx.globalCompositeOperation = "source-over";

    ctx.drawImage(thumbnailCanvas, 57, 105, 288, 288);

    ctx.drawImage(progressBarCanvas, 450, 310, 670, 25);
    ctx.drawImage(circleCanvas, 400, 225, 1000, 1000);

    return image.toBuffer("image/png");
};