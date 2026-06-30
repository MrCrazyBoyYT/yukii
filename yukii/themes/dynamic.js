const canvas = require("@napi-rs/canvas");

module.exports = async function ({
    options,
    validatedColor,
    validatedProgress,
    validatedStartTime,
    validatedEndTime
}) {
    const frame = canvas.createCanvas(3264, 765);
    const ctx = frame.getContext("2d");

    const background = await canvas.loadImage("https://ik.imagekit.io/MrCrazyBoyYT/Images/Muzicard/dynamic.png");
    ctx.drawImage(background, 0, 0, frame.width, frame.height);

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

    ctx.save();
    ctx.beginPath();
    ctx.arc(400, 382.5, 300, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(thumbnailCanvas, 75, 60, 650, 650);

    ctx.restore();

    ctx.font =
        "bold 150px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr";
    ctx.fillStyle = `#${validatedColor}`;
    ctx.fillText(options.name, 800, 350);

    ctx.font =
        "bold 100px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr";
    ctx.fillStyle = "#787878";
    ctx.fillText(options.author, 800, 500);

    ctx.beginPath();
    ctx.arc(2890, 382.5, 200, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.lineWidth = 40;
    ctx.strokeStyle = "#242323";
    ctx.stroke();

    const progress = validatedProgress;
    const angle = (progress / 100) * Math.PI * 2;

    ctx.beginPath();
    ctx.arc(
        2890,
        382.5,
        200,
        -Math.PI / 2,
        -Math.PI / 2 + angle,
        false
    );

    ctx.lineWidth = 40;
    ctx.strokeStyle = `#${validatedColor}`;
    ctx.stroke();

    return frame.toBuffer("image/png");
};